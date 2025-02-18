'use server';

import { db } from '@/db/drizzle';
import redis from '@/db/redis';
import { books } from '@/db/schema';

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
