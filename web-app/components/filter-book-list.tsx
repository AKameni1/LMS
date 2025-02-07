import { fetchFilteredBooks } from '@/lib/data';
import React from 'react';
import BookList from './book-list';
import BookCard from './book-card';

export default async function FilterBookList({
  query,
  currentPage,
  filter,
}: Readonly<{
  query: string;
  currentPage: number;
  filter?: Filter;
}>) {
  const books = await fetchFilteredBooks(query, currentPage, filter);

  return (
    <div className="flow-root">
      {books.length === 1 ? (
        <BookCard {...books[0]} />
      ) : (
        <BookList containerClassName="mt-10" books={books} />
      )}
    </div>
  );
}
