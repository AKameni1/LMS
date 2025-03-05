import BooksTableClient from '@/components/admin/books-table-client';
import { fetchAllBooks } from '@/lib/actions/admin/books';

export default async function Page() {
  const { success, error, data } = await fetchAllBooks();
  if (!success || error) {
    throw new Error(error ?? 'Failed to fetch books.');
  }

  if (typeof data === 'undefined') {
    throw new Error('No books found.');
  }

  // Convert the string dates to Date objects
  const books = data.map((row) => ({
    ...row,
    createdAt: new Date(row.createdAt!),
  }));
  return <BooksTableClient books={books} />;
}
