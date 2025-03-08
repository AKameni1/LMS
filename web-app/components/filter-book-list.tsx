import { fetchFilteredBooks } from '@/lib/data';
import React from 'react';
import BookList from './book-list';
import BookCard from './book-card';
import { verifySession } from '@/lib/dal';

export default async function FilterBookList({
  query,
  currentPage,
  filter,
  type,
}: Readonly<{
  query: string;
  currentPage: number;
  filter?: Filter;
  type: Type;
}>) {
  const { userId } = await verifySession();
  const books = await fetchFilteredBooks(
    query,
    currentPage,
    type,
    filter,
    userId,
  );

  return (
    <section>
      {books.length === 1 ? (
        <ul className="book-list">
          <BookCard {...books[0]} />
        </ul>
      ) : (
        <BookList containerClassName="mt-10" books={books} />
      )}
    </section>
  );
}
