'use server';

import { db } from '@/db/drizzle';
import { books, borrowRecords } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';
import dayjs from 'dayjs';
import { revalidatePath } from 'next/cache';

export const borrowBook = async (params: BorrowBookParams) => {
  const { bookId, userId } = params;

  try {
    // Check if the book is available for borrowing
    const [book] = await db
      .select({ availableCopies: books.availableCopies })
      .from(books)
      .where(eq(books.id, bookId))
      .limit(1);

    if (!book || book.availableCopies <= 0) {
      return {
        success: false,
        message: 'Book is not available for borrowing',
      };
    }

    // Check if the book is already borrowed by the user
    const existingBorrow = await db
      .select()
      .from(borrowRecords)
      .where(
        sql`${borrowRecords.userId} = ${userId} AND ${borrowRecords.bookId} = ${bookId} AND ${borrowRecords.status} = 'BORROWED'`,
      )
      .limit(1);

    if (existingBorrow.length > 0) {
      return {
        success: false,
        message: 'You have already borrowed this book.',
      };
    }

    const dueDate = dayjs().add(7, 'days').toDate().toISOString();

    const record = await db.insert(borrowRecords).values({
      userId,
      bookId,
      dueDate,
      status: 'BORROWED',
    });

    await db
      .update(books)
      .set({ availableCopies: sql`${book.availableCopies} - 1` })
      .where(eq(books.id, bookId))
      .returning({ id: books.id });

    revalidatePath('/my-profile');

    return {
      success: true,
      message: 'Book borrowed successfully',
      data: JSON.parse(JSON.stringify(record)),
    };
  } catch (error) {
    console.log('Error borrowing book:', error);
    return {
      success: false,
      message: 'Error borrowing book',
    };
  }
};
