import { fetchFilteredBooks } from '@/lib/data';
import React from 'react';
import BookList from './book-list';
import BookCard from './book-card';
import { auth } from '@/auth';

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
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error('User not found.');
  }
  const books = await fetchFilteredBooks(
    query,
    currentPage,
    type,
    filter,
    userId,
  );

  return (
    <div className="flow-root w-11/12 max-w-7xl">
      {books.length === 1 ? (
        <ul className="book-list">
          <BookCard {...books[0]} />
        </ul>
      ) : (
        <BookList containerClassName="mt-10" books={books} />
      )}
      
    </div>
  );
}
