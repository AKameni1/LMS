import { db } from '@/db/drizzle';
import { books, borrowRecords, users } from '@/db/schema';
import { and, asc, count, desc, eq, not, sql } from 'drizzle-orm';

const ITEMS_PER_PAGE = 10;
export async function fetchFilteredBooks(
  query: string,
  currentPage: number,
  filter?: Filter,
): Promise<Book[]> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    // base query
    let baseQuery = db.select().from(books).$dynamic(); // Dynamic mode enabled

    const conditions = [];

    if (query.length > 0) {
      conditions.push(
        sql`${books.title} ILIKE ${'%' + query + '%'} OR
             ${books.author} ILIKE ${'%' + query + '%'} OR
             ${books.description} ILIKE ${'%' + query + '%'} OR
             ${books.summary} ILIKE ${'%' + query + '%'}`,
      );
    }

    // Apply search if necessary
    if (query.length > 0) {
      conditions.push(
        sql`${books.searchText} @@ to_tsquery('english', ${query.replace(/\s+/g, ' & ')})`,
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

    return allBooks;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch books');
  }
}

export async function fetchBooksPages(
  query: string,
  filter?: Filter,
): Promise<number> {
  try {
    let baseQuery = db
      .select({ count: sql<number>`cast(count(*) as integer)`.as('count') })
      .from(books)
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
}

export async function fetchBookById(id: string): Promise<Book> {
  try {
    const [book] = await db
      .select()
      .from(books)
      .where(eq(books.id, id))
      .limit(1);

    return book;
  } catch (error) {
    console.log('Failed to fetch book by id.', error);
    throw new Error('Failed to fetch book by id.');
  }
}

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
      bookId: borrowRecords.bookId,
      borrowDate: borrowRecords.borrowDate,
      returnDate: borrowRecords.returnDate,
      dueDate: borrowRecords.dueDate,
      status: borrowRecords.status,
      book: books, // Retrieve all book details
    })
    .from(borrowRecords)
    .innerJoin(books, eq(borrowRecords.bookId, books.id))
    .where(eq(borrowRecords.userId, userId));

  // Extract books with loan status
  const userBooks = borrowedBooks.map(({ book }) => ({
    ...book,
    isLoanedBook: true,
  }));

  // Create a Map for quick lookup of borrowed book info
  const borrowedBooksMap = new Map(
    borrowedBooks.map(({ bookId, ...info }) => [bookId, info]),
  );

  return { user, userBooks, borrowedBooksMap };
}

export async function fetchPopularBooks(): Promise<Book[]> {
  const popularBooks = await db
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
      borrowCount: count(borrowRecords.id),
    })
    .from(borrowRecords)
    .innerJoin(books, eq(books.id, borrowRecords.bookId))
    .where(eq(borrowRecords.status, 'BORROWED'))
    .groupBy(books.id)
    .orderBy(desc(count(borrowRecords.id)))
    .limit(7);

  // Si aucun livre emprunté, récupérer les livres les plus récents
  if (popularBooks.length <= 2) {
    return await db
      .select()
      .from(books)
      .orderBy(desc(books.createdAt))
      .limit(7);
  }

  return popularBooks;
}

export async function fetchRecentlyAddedBooks(): Promise<Book[]> {
  return await db.select().from(books).orderBy(desc(books.createdAt)).limit(7);
}

export async function fetchUserById(userId: string): Promise<User> {
  try {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    return user;
  } catch (error) {
    console.log('Failed to fetch user by id.', error);
    throw new Error('Failed to fetch user by id.');
  }
}

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

export async function checkIsAdmin(userId: string): Promise<boolean> {
  const isAdmin = await db
    .select({ isAdmin: users.role })
    .from(users)
    .where(eq(users.id, userId))
    .then((res) => res[0]?.isAdmin === 'ADMIN');

  return isAdmin;
}
