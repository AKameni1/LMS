import { db } from '@/db/drizzle';
import { books, favoriteBooks } from '@/db/schema';
import { asc, desc, sql, eq } from 'drizzle-orm';
import { PgTable, TableConfig } from 'drizzle-orm/pg-core';

const ITEMS_PER_PAGE = 10;
export async function fetchFilteredBooks(
  query: string,
  currentPage: number,
  type: Type,
  filter?: Filter,
): Promise<Book[]> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  let baseQuery
  try {
    // base query
    if(type === 'Library'){baseQuery = db.select().from(books).$dynamic();}
    else{baseQuery = db.select().from(books).innerJoin(favoriteBooks, eq(books.id, favoriteBooks.bookId)).$dynamic();}
    
    // Dynamic mode enabled

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

    
    return allBooks as Book[];
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch books');
  }
}

export async function fetchBooksPages(
  query: string,
  type: PgTable<TableConfig>,
  filter?: Filter
): Promise<number> {
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
}
