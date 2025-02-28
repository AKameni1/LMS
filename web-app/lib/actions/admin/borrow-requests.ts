'use server';

import { db } from '@/db/drizzle';
import { books, borrowRecords, users } from '@/db/schema';
import dayjs from 'dayjs';
import { and, desc, eq } from 'drizzle-orm';
import { sendEmailReturnConfirmation } from '../send-emails';

export const updateBorrowRequest = async ({
  requestId,
  status,
  isOverdue,
}: Readonly<{
  requestId: string;
  status: Exclude<BorrowRequestStatus, 'PENDING'>;
  isOverdue?: boolean;
}>) => {
  try {
    const [{ studentName, studentEmail, bookTitle }] = await db
      .select({
        studentName: users.fullName,
        studentEmail: users.email,
        bookTitle: books.title,
      })
      .from(borrowRecords)
      .innerJoin(users, eq(borrowRecords.userId, users.id))
      .innerJoin(books, eq(borrowRecords.bookId, books.id))
      .where(eq(borrowRecords.id, requestId));

    const updateData: Partial<typeof borrowRecords.$inferInsert> = { status };

    if (status === 'BORROWED') {
      updateData.dueDate = dayjs().add(7, 'days').toDate().toISOString();
    } else if (status === 'RETURNED') {
      updateData.returnDate = new Date().toISOString();
    }

    await db
      .update(borrowRecords)
      .set(updateData)
      .where(eq(borrowRecords.id, requestId));

    // Send email if status is RETURNED
    if (status === 'RETURNED') {
      await sendEmailReturnConfirmation({
        studentName,
        bookTitle,
        studentEmail,
        isOverdue: isOverdue ?? false,
      });
    }
  } catch (error) {
    console.error('Error updating borrow request:', error);
    return { success: false, error: 'Failed to update borrow request' };
  }
};

export const renewBorrowRequest = async ({
  bookId,
  userId,
}: Readonly<{ bookId: string; userId: string }>) => {
  try {
    await db
      .update(borrowRecords)
      .set({
        status: 'PENDING',
      })
      .where(
        and(eq(borrowRecords.bookId, bookId), eq(borrowRecords.userId, userId)),
      );
    return { success: true };
  } catch (error) {
    console.error('Error renewing borrow request:', error);
    return { success: false, error: 'Failed to renew borrow request' };
  }
};

export const fetchBookRequests = async () => {
  try {
    const bookRequests = await db
      .select({
        id: books.id,
        title: books.title,
        coverUrl: books.coverUrl,
        coverColor: books.coverColor,
        author: books.author,
        genre: books.genre,
        date: borrowRecords.createdAt,
        userName: users.fullName,
      })
      .from(books)
      .innerJoin(borrowRecords, eq(books.id, borrowRecords.bookId))
      .innerJoin(users, eq(borrowRecords.userId, users.id))
      .where(eq(borrowRecords.status, 'PENDING'))
      .orderBy(desc(books.updatedAt))
      .limit(7);

    return {
      success: true,
      data: bookRequests,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: `Failed to fetch book requests. ${error}`,
    };
  }
};

export const fetchBorrowRequests = async () => {
  try {
    const borrowRequests = await db
      .select({
        requestId: borrowRecords.id,
        bookTitle: books.title,
        coverUrl: books.coverUrl,
        fullName: users.fullName,
        coverColor: books.coverColor,
        email: users.email,
        borrowedDate: borrowRecords.createdAt,
        returnDate: borrowRecords.returnDate,
        dueDate: borrowRecords.dueDate,
        status: borrowRecords.status,
      })
      .from(borrowRecords)
      .innerJoin(books, eq(borrowRecords.bookId, books.id))
      .innerJoin(users, eq(borrowRecords.userId, users.id))
      .orderBy(desc(borrowRecords.updatedAt))
      .limit(100);

    return {
      success: true,
      data: borrowRequests,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: `Failed to fetch borrow requests. ${error}`,
    };
  }
};
