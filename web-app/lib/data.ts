import { db } from '@/db/drizzle';
import { books } from '@/db/schema';
import { desc, sql } from 'drizzle-orm';

const ITEMS_PER_PAGE = 10;
export async function fetchFilteredBooks(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const allbooks =
      query.length > 0
        ? await db
            .select()
            .from(books)
            .where(
              sql`${books.searchText} @@ to_tsquery('english', ${query.replace(/\s+/g, ' & ')})`,
            )
            .orderBy(desc(books.createdAt))
            .limit(ITEMS_PER_PAGE)
            .offset(offset)
        : await db
            .select()
            .from(books)
            .orderBy(desc(books.createdAt))
            .limit(ITEMS_PER_PAGE)
            .offset(offset);

    return allbooks;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch books');
  }
}

export async function fetchBooksPages(query: string): Promise<number> {
  try {
    const res =
      query.length > 0
        ? await db
            .select({ count: sql<number>`cast(count(*) as integer)` })
            .from(books)
            .where(
              sql`${books.searchText} @@ to_tsquery('english', ${query.replace(/\s+/g, ' & ')})`,
            )
        : await db
            .select({ count: sql<number>`cast(count(*) as integer)` })
            .from(books);

    const totalPages = Math.ceil(Number(res[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.log('Failed to fetch total number of books.', error);
    throw new Error('Failed to fetch total number of books.');
  }
}
