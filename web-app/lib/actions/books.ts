'use server';

import { db } from '@/db/drizzle';
import { books, borrowRecords, favoriteBooks } from '@/db/schema';
import { and, eq, isNull, sql } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export const borrowBook = async (params: ButtonBookParams) => {
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
        and(
          eq(borrowRecords.userId, userId),
          eq(borrowRecords.bookId, bookId),
          isNull(borrowRecords.returnDate),
        ),
      );

    console.log('existingBorrow:', existingBorrow);

    if (existingBorrow.length > 0) {
      throw new Error('You must return the book before borrowing it again.');
    }

    const record = await db.insert(borrowRecords).values({
      userId,
      bookId,
      status: 'PENDING',
    });

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

export const favoriteBook = async (params: ButtonBookParams) => {
  const { bookId, userId } = params;

  try {
    // Check if the book is available for borrowing

    // Check if the book is already borrowed by the user
    const [existingFavorite] = await db
      .select()
      .from(favoriteBooks)
      .where(
        sql`${favoriteBooks.userId} = ${userId} AND ${favoriteBooks.bookId} = ${bookId}`
      )
      .limit(1);

    if (existingFavorite) {
      await db.delete(favoriteBooks).where(eq(favoriteBooks.id, existingFavorite.id));

      return {
        success: true,
        message: 'Book removed from favorites',
      };
    }

    const record = await db.insert(favoriteBooks).values({
      userId,
      bookId,
    });

    revalidatePath('/my-favorites');

    return {
      success: true,
      message: 'Book added to favorites successfully',
      data: JSON.parse(JSON.stringify(record)),
    };
  } catch (error) {
    console.log('Error adding book to favorites:', error);
    return {
      success: false,
      message: 'Error adding book to favorites',
    };
  }
};
