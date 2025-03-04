'use server';

import { auth } from '@/auth';
import { db } from '@/db/drizzle';
import { books, borrowRecords, users, favoriteBooks } from '@/db/schema';
import { and, asc, desc, eq, not, sql } from 'drizzle-orm';
import { PgTable, TableConfig } from 'drizzle-orm/pg-core';
import { cache } from 'react';

const ITEMS_PER_PAGE = 12;
/**
 * Fetches a list of books based on the provided query and filter, with pagination support.
 * The results are cached for 1 hour to improve performance.
 *
 * @param query - The search query to filter books by title, author, description, or summary.
 * @param currentPage - The current page number for pagination.
 * @param filter - An optional filter to sort the books. Possible values are 'oldest', 'newest', 'highest_rated'.
 * @returns A promise that resolves to an array of books matching the search criteria and filter.
 * @throws An error if the books could not be fetched.
 */
export const fetchFilteredBooks = cache(
  async (
    query: string,
    currentPage: number,
    type: Type,
    filter?: Filter,
  ): Promise<Book[]> => {
    const session = await auth();
    const userId = session?.user?.id;

    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    query = query.trim();

    try {
      if (!userId) {
        throw new Error('User must be authenticated to access favorites.');
      }

      let baseQuery = db
        .select({
          id: books.id,
          title: books.title,
          author: books.author,
          genre: books.genre,
          rating: books.rating,
          totalCopies: books.totalCopies,
          availableCopies: books.availableCopies,
          description: books.description,
          coverColor: books.coverColor,
          coverUrl: books.coverUrl,
          videoUrl: books.videoUrl,
          summary: books.summary,
          createdAt: books.createdAt,
          updatedAt: books.updatedAt,
          searchText: books.searchText,
        })
        .from(books)
        .$dynamic(); // Dynamic mode enabled

      // base query
      if (type === 'Favorites') {
        if (!userId) {
          throw new Error('User must be authenticated to access favorites.');
        }

        baseQuery = baseQuery
          .innerJoin(favoriteBooks, eq(books.id, favoriteBooks.bookId))
          .where(eq(favoriteBooks.userId, userId));
      }

      // Dynamic mode enabled

      const conditions = [];

      // Apply search if necessary
      if (query.length > 0) {
        conditions.push(
          sql`${books.title} ILIKE ${'%' + query + '%'} OR
             ${books.author} ILIKE ${'%' + query + '%'} OR
             ${books.description} ILIKE ${'%' + query + '%'} OR
             ${books.summary} ILIKE ${'%' + query + '%'}`,
        );

        conditions.push(
          sql`${books.searchText} @@ plainto_tsquery('english', ${query})`,
        );
      }

      if (conditions.length > 0) {
        baseQuery = baseQuery.where(sql.join(conditions, sql` OR `));
      }

      // Apply the filter here
      switch (filter) {
        case 'oldest':
          baseQuery = baseQuery.orderBy(asc(books.createdAt));
          break;
        case 'newest':
          baseQuery = baseQuery.orderBy(desc(books.createdAt));
          break;
        case 'highest_rated':
          baseQuery = baseQuery.orderBy(desc(books.rating));
          break;
        // case 'available':
        //   baseQuery = baseQuery.where(sql`${books.availableCopies} > 0`);
        //   break;
        default:
          baseQuery = baseQuery.orderBy(desc(books.createdAt)); // Default to newest
          break;
      }

      // Apply pagination
      const allBooks = await baseQuery.limit(ITEMS_PER_PAGE).offset(offset);

      // add isLoanedBook and dueDate properties to each book if the user has borrowed it by mapping over the allBooks array and check if the book has been borrowed by the user
      const allBooksBorrowed = await Promise.all(
        allBooks.map(async (book) => {
          const isLoanedBook = await checkUserBorrowStatus(userId, book.id);
          // obtain the due date of the borrowed book
          const [dueDate] = await db
            .select({
              dueDate: borrowRecords.dueDate,
            })
            .from(borrowRecords)
            .where(
              and(
                eq(borrowRecords.userId, userId),
                eq(borrowRecords.bookId, book.id),
                eq(borrowRecords.status, 'BORROWED'),
              ),
            )
            .limit(1);
          return { ...book, isLoanedBook, dueDate: dueDate?.dueDate };
        }),
      );
      // order by state loaned book
      // order by due date if the book is borrowed
      allBooksBorrowed.sort((a, b) => {
        if (a.isLoanedBook && b.isLoanedBook) {
          return a.dueDate! > b.dueDate! ? 1 : -1;
        }
        if (a.isLoanedBook) {
          return -1;
        }
        if (b.isLoanedBook) {
          return 1;
        }
        return 0;
      });
      return allBooksBorrowed;
    } catch (error) {
      console.log(error);
      throw new Error(`Failed to fetch books. ${error}`);
    }
  },
);

/**
 * Fetches the total number of pages based on the provided query and filter.
 *
 * @param query - The search query to filter books by title, author, description, or summary.
 * @param filter - An optional filter to sort the books. Possible values are 'oldest', 'newest', 'highest_rated'.
 * @returns A promise that resolves to the total number of pages required to display all books.
 * @throws An error if the total number of pages could not be fetched.
 */
export const fetchBooksPages = cache(
  async (
    query: string,
    type: PgTable<TableConfig>,
    filter?: Filter,
  ): Promise<number> => {
    try {
      let baseQuery = db
        .select({ count: sql<number>`cast(count(*) as integer)`.as('count') })
        .from(type)
        .$dynamic(); // Dynamic mode enabled

      const conditions = [];

      // Apply search if necessary
      if (query.length > 0) {
        conditions.push(
          sql`${books.title} ILIKE ${'%' + query + '%'} OR
             ${books.author} ILIKE ${'%' + query + '%'} OR
             ${books.description} ILIKE ${'%' + query + '%'} OR
             ${books.genre} ILIKE ${'%' + query + '%'} OR
             ${books.summary} ILIKE ${'%' + query + '%'}`,
        );
      }

      // Apply search if necessary
      if (query.length > 0) {
        conditions.push(
          sql`${books.searchText} @@ to_tsquery('english', ${query.replace(/\s+/g, ' & ')})`,
        );
      }

      // Apply the filter here
      if (filter === 'available') {
        conditions.push(sql`${books.availableCopies} > 0`);
      }

      if (conditions.length > 0) {
        baseQuery = baseQuery.where(sql.join(conditions, sql` AND `));
      }

      const res = await baseQuery;

      const totalPages = Math.ceil(Number(res[0].count) / ITEMS_PER_PAGE);
      return totalPages;
    } catch (error) {
      console.log('Failed to fetch total number of books.', error);
      throw new Error('Failed to fetch total number of books.');
    }
  },
);

/**
 * Fetches a single book record by its ID.
 * The result is cached for 1 hour to improve performance.
 *
 * @param bookId - The ID of the book to fetch.
 * @returns A promise that resolves to the book record with the specified ID.
 * @throws An error if the book could not be fetched.
 */
export async function fetchBookById(bookId: string): Promise<Book> {
  try {
    const [book] = await db
      .select()
      .from(books)
      .where(eq(books.id, bookId))
      .limit(1);

    if (!book) {
      throw new Error('Book not found');
    }

    return book;
  } catch (error) {
    console.log('Failed to fetch book by id.', error);
    throw new Error('Failed to fetch book by id.');
  }
}

// Put the result of the fetchUserBorrowedBooks function in a cache

/**
 * Fetches a user's borrowed books and user details.
 * The results are cached for 1 hour to improve performance.
 *
 * @param userId - The ID of the user to fetch borrowed books for.
 * @returns A promise that resolves to an object containing the user details, borrowed books, and a map of borrowed book info.
 * @throws An error if the user or borrowed books could not be fetched.
 */
export async function fetchUserBorrowedBooks(userId: string) {
  if (!userId) throw new Error('User ID is required');

  // Fetch user details
  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1)
    .then((res) => res[0]);

  if (!user) throw new Error('User not found');

  // Fetch borrowed books with their details in a single query
  const borrowedBooks = await db
    .select({
      userId: borrowRecords.userId,
      bookId: borrowRecords.bookId,
      requestId: borrowRecords.id,
      borrowDate: borrowRecords.borrowDate,
      returnDate: borrowRecords.returnDate,
      dueDate: borrowRecords.dueDate,
      status: borrowRecords.status,
      updatedAt: borrowRecords.updatedAt,
      book: books, // Retrieve all book details
    })
    .from(borrowRecords)
    .innerJoin(books, eq(borrowRecords.bookId, books.id))
    .where(
      and(eq(borrowRecords.userId, userId), eq(borrowRecords.bookId, books.id)),
    )
    .orderBy(desc(borrowRecords.borrowDate));

  const borrowItems = borrowedBooks.map(({ book, ...borrowInfo }) => ({
    book: { ...book, isLoanedBook: true },
    borrowInfo,
  }));

  return { user, borrowItems };
}

/**
 * Fetches a list of popular books based on the number of times they have been borrowed.
 * The results are cached for 1 hour to improve performance.
 *
 * @returns A promise that resolves to an array of popular books.
 * @throws An error if the popular books could not be fetched.
 */
export async function fetchPopularBooks(): Promise<Book[]> {
  return await db.select().from(books).orderBy(desc(books.updatedAt)).limit(7);
}

/**
 * Fetches a list of recently added books.
 * The results are cached for 1 hour to improve performance.
 *
 * @returns A promise that resolves to an array of recently added books.
 * @throws An error if the recently added books could not be fetched.
 */
export async function fetchRecentlyAddedBooks(): Promise<Book[]> {
  return await db.select().from(books).orderBy(desc(books.createdAt)).limit(7);
}

/**
 * Fetches a user by their ID.
 * The result is cached for 1 hour to improve performance.
 *
 * @param userId - The ID of the user to fetch.
 * @returns A promise that resolves to the user record with the specified ID.
 * @throws An error if the user could not be fetched.
 */
export async function fetchUserById(userId: string): Promise<User> {
  try {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } catch (error) {
    console.log('Failed to fetch user by id.', error);
    throw new Error('Failed to fetch user by id.');
  }
}

/**
 * Fetches a list of books similar to the current book based on the genre.
 * The results are cached for 1 hour to improve performance.
 *
 * @param currentBookId - The ID of the current book to find similar books for.
 * @param genre - The genre of the current book.
 * @returns A promise that resolves to an array of similar books.
 * @throws An error if the similar books could not be fetched.
 */
export async function fetchSimilarBooks(
  currentBookId: string,
  genre: string,
): Promise<Book[]> {
  const similarBooks = await db
    .select()
    .from(books)
    .where(and(eq(books.genre, genre), not(eq(books.id, currentBookId))))
    .limit(6);

  return similarBooks;
}

/**
 * Checks if a user is an admin.
 *
 * @param userId - The ID of the user to check.
 * @returns A promise that resolves to a boolean indicating whether the user is an admin.
 * @throws An error if the user's admin status could not be checked.
 */
export async function checkIsAdmin(userId: string): Promise<boolean> {
  const isAdmin = await db
    .select({ isAdmin: users.role })
    .from(users)
    .where(eq(users.id, userId))
    .then((res) => res[0]?.isAdmin === 'ADMIN');

  return isAdmin;
}

/**
 * Check if a user has already borrowed a book.
 *
 * @param userId - The ID of the user to check.
 * @param bookId - The ID of the book to check.
 * @returns A promise that resolves to a boolean indicating whether the user has already borrowed the book.
 * @throws An error if the user's borrow status could not be checked.
 */
export async function checkUserBorrowStatus(
  userId: string,
  bookId: string,
): Promise<boolean> {
  const hasBorrowed = await db
    .select()
    .from(borrowRecords)
    .where(
      and(
        eq(borrowRecords.userId, userId),
        eq(borrowRecords.bookId, bookId),
        eq(borrowRecords.status, 'BORROWED'),
      ),
    )
    .then((res) => res.length > 0);

  return hasBorrowed;
}

export async function isBookBorrowed(
  bookId: string,
  userId: string,
): Promise<boolean> {
  const record = await db
    .select({
      requestId: borrowRecords.id,
    })
    .from(borrowRecords)
    .where(
      and(
        eq(borrowRecords.bookId, bookId),
        eq(borrowRecords.userId, userId),
        eq(borrowRecords.status, 'BORROWED'),
      ),
    )
    .then((result) => result[0]);

  return !!record;
}
