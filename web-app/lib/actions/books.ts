'use server';

import { db } from '@/db/drizzle';
import { books, borrowRecords } from '@/db/schema';
import { eq } from 'drizzle-orm';
import dayjs from 'dayjs';

export const borrowBook = async (params: BorrowBookParams) => {
  const { bookId, userId } = params;

  try {
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

    const dueDate = dayjs().add(7, 'days').toDate().toISOString();

    const record = await db.insert(borrowRecords).values({
      userId,
      bookId,
      dueDate,
      status: 'BORROWED',
    });

    await db
      .update(books)
      .set({ availableCopies: book.availableCopies - 1 })
      .where(eq(books.id, bookId));
    
    return {
      success: true,
      message: 'Book borrowed successfully',
      data: JSON.parse(JSON.stringify(record)),
    }
  } catch (error) {
    console.log('Error borrowing book:', error);
    return {
      success: false,
      message: 'Error borrowing book',
    };
  }
};
