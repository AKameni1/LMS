import { fetchFilteredBooks } from '@/lib/data';
import React from 'react';
import BookList from './book-list';
import BookCard from './book-card';

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
  const books = await fetchFilteredBooks(query, currentPage, type, filter);

  return (
    <div className="flow-root w-screen max-w-7xl">
      {books.length === 1 ? (
        <BookCard {...books[0]} />
      ) : (
        <BookList containerClassName="mt-10" books={books} />
      )}
    </div>
  );
}
