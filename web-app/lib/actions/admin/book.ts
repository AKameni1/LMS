'use server';

import { db } from '@/db/drizzle';
import redis from '@/db/redis';
import { books } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';

export const createBook = async (params: BookParams) => {
  try {
    const [newId] = await db
      .insert(books)
      .values({
        ...params,
        availableCopies: params.totalCopies,
      })
      .returning({
        id: books.id,
      });

    await redis.del('dashboard_stats');
    return {
      success: true,
      data: newId,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: `Failed to create book. ${error}`,
    };
  }
};

export const updateBook = async (params: Partial<BookParams>, id: string) => {
  try {
    if (!id) {
      return {
        success: false,
        error: 'Book ID is required for update',
      };
    }

    const [existingBook] = await db
      .select()
      .from(books)
      .where(eq(books.id, id));

    const [data] = await db
      .update(books)
      .set({
        ...params,
        availableCopies:
          params.totalCopies !== undefined
            ? Number(params.totalCopies) -
              (existingBook.totalCopies - existingBook.availableCopies)
            : existingBook.availableCopies,
      })
      .where(eq(books.id, id))
      .returning({
        id: books.id,
      });

    await redis.del('dashboard_stats');

    if (!data) {
      return {
        success: false,
        error: 'Book not found',
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: `Failed to update book. ${error}`,
    };
  }
};

export const deleteBook = async (bookId: string) => {
  try {
    const [data] = await db
      .delete(books)
      .where(eq(books.id, bookId))
      .returning({
        id: books.id,
      });

    await redis.del('dashboard_stats');

    if (!data) {
      return {
        success: false,
        error: `Book with id ${bookId} not found.`,
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: `Failed to delete book. ${error}`,
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
      .orderBy(desc(books.updatedAt))
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

export const fetchAllBooks = async () => {
  try {
    const allBooks = await db
      .select({
        id: books.id,
        title: books.title,
        author: books.author,
        genre: books.genre,
        coverColor: books.coverColor,
        coverUrl: books.coverUrl,
        createdAt: books.createdAt,
      })
      .from(books)
      .orderBy(desc(books.createdAt))
      .limit(100);

    return {
      success: true,
      data: allBooks,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: `Failed to fetch all books. ${error}`,
    };
  }
};
