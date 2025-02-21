'use server';

import { db } from '@/db/drizzle';
import redis from '@/db/redis';
import { books, borrowRecords, users } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';

export const createBook = async (params: BookParams) => {
  try {
    const newBook = await db
      .insert(books)
      .values({
        ...params,
        availableCopies: params.totalCopies,
      })
      .returning()
      .then((res) => res[0]);

    await redis.del('filtered_book:*');
    await redis.del('popular_books');
    await redis.del('dashboard_stats');
    await redis.setex(`book:${newBook.id}`, 60 * 60, newBook);

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newBook)),
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: `Failed to create book. ${error}`,
    };
  }
};

export const fetchBooksAdded = async () => {
  try {
    const booksAdded = await db
      .select({
        id: books.id,
        title: books.title,
        coverUrl: books.coverUrl,
        coverColor: books.coverColor,
        author: books.author,
        genre: books.genre,
        createdAt: books.createdAt,
      })
      .from(books)
      .orderBy(desc(books.createdAt))
      .limit(7);

    return {
      success: true,
      data: booksAdded,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: `Failed to fetch books added. ${error}`,
    };
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
      .orderBy(desc(books.createdAt))
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
