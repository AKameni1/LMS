import { db } from '@/db/drizzle';
import { borrowRecords, users } from '@/db/schema';
import BookBorrowCancelledEmail from '@/emails/book-borrow-cancelled-email';
import BookBorrowedConfirmationEmail from '@/emails/book-borrowed-confirmation-email';
import BookDueReminderEmail from '@/emails/book-due-reminder-email';
import BookOverdueEmail from '@/emails/book-overdue-email';
import { sendEmail } from '@/lib/workflow';
import { render } from '@react-email/render';
import { serve } from '@upstash/workflow/nextjs';
import { eq } from 'drizzle-orm';
import React from 'react';

type BorrowRequestState = 'pending' | 'borrowed' | 'cancelled' | 'overdue';

type InitialData = {
  requestId: string;
  email: string;
  studentName: string;
  bookId: string;
  bookTitle: string;
  borrowDate: string | Date;
  dueDate: string | Date;
};

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;
const SEVEN_DAYS_IN_SECONDS = (7 * ONE_DAY_IN_MS) / 1000;
// a function that returns the remaining time 3 days before the due date
const getRemainingTimeBeforeDueDate = (
  dueDate: string | Date,
  days: number,
): number => {
  const due = new Date(dueDate).getTime();
  const now = Date.now();
  const threeDaysBeforeDue = due - days * ONE_DAY_IN_MS;
  return Math.max(threeDaysBeforeDue - now, 0);
};

const getBorrowState = async (
  requestId: string,
): Promise<BorrowRequestState> => {
  const request = await db
    .select({
      status: borrowRecords.status,
      dueDate: borrowRecords.dueDate,
    })
    .from(borrowRecords)
    .where(eq(borrowRecords.id, requestId))
    .limit(1)
    .then((res) => res[0]);

  if (!request) return 'pending';
  if (request.status === 'BORROWED') return 'borrowed';
  if (!request.dueDate) return 'pending';

  return new Date() > new Date(request.dueDate) ? 'overdue' : 'cancelled';
};

export const { POST } = serve<InitialData>(async (context) => {
  const {
    requestId,
    email,
    studentName,
    bookTitle,
    borrowDate,
    dueDate,
    bookId,
  } = context.requestPayload;

  let borrowState = await getBorrowState(requestId);
  if (borrowState !== 'borrowed') return;

  // Send confirmation email
  await context.run('send-borrowed-email', async () => {
    const message = String(
      await render(
        React.createElement(BookBorrowedConfirmationEmail, {
          studentName,
          borrowDate: new Date(borrowDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          dueDate: new Date(dueDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          bookTitle,
        }),
      ),
    );
    await sendEmail({
      email,
      subject: '📚 Book Borrowed Successfully!',
      message,
    });
  });

  // Wait for 3 days before sending a reminder
  const remainingTime = getRemainingTimeBeforeDueDate(dueDate, 3) / 1000;
  await context.sleep('wait-for-reminder', remainingTime);

  // Send reminder emails
  for (let daysLeft = 3; daysLeft > 0; daysLeft--) {
    borrowState = await getBorrowState(requestId);
    if (borrowState !== 'borrowed') return;

    await context.run(`send-reminder-${daysLeft}`, async () => {
      const message = String(
        await render(
          React.createElement(BookDueReminderEmail, {
            bookId,
            studentName,
            bookTitle,
            dueDate: new Date(dueDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }),
          }),
        ),
      );
      await sendEmail({
        email,
        subject: `📢 Reminder: ${daysLeft} day(s) left to return your book`,
        message,
      });
    });

    // Wait for the next reminder
    await context.sleep(
      `wait-for-next-reminder-${daysLeft}`,
      ONE_DAY_IN_MS / 1000,
    );
  }

  // Send overdue email
  borrowState = await getBorrowState(requestId);
  if (borrowState === 'overdue') {
    const overdueDays = Math.ceil(
      (Date.now() - new Date(dueDate).getTime()) / ONE_DAY_IN_MS,
    );

    await context.run('send-overdue-email', async () => {
      const message = String(
        await render(
          React.createElement(BookOverdueEmail, {
            bookId,
            studentName,
            bookTitle,
            overdueDays,
          }),
        ),
      );
      await sendEmail({
        email,
        subject: '⚠️ Your book is overdue!',
        message,
      });
    });

    // Recheck overdue status after 7 days
    await context.sleep('recheck-overdue-status', SEVEN_DAYS_IN_SECONDS);
  }

  // Cancel the borrow request if it is still overdue
  borrowState = await getBorrowState(requestId);
  if (borrowState === 'overdue') {
    const overdueDays = Math.ceil(
      (Date.now() - new Date(dueDate).getTime()) / ONE_DAY_IN_MS,
    );
    const totalFee = 20 * overdueDays;

    await db
      .update(borrowRecords)
      .set({ status: 'CANCELLED' })
      .where(eq(borrowRecords.id, requestId));

    await db
      .update(users)
      .set({ status: 'PENDING' })
      .where(eq(users.email, email));

    await context.run('final-overdue-email', async () => {
      const message = String(
        await render(
          React.createElement(BookBorrowCancelledEmail, {
            studentName,
            bookTitle,
            overdueDays,
            totalFee,
          }),
        ),
      );
      await sendEmail({
        email,
        subject: '❌ Your borrow request has been cancelled',
        message,
      });
    });
  }
});
