import { fetchFilteredBooks } from '@/lib/data';
import React from 'react'
import BookList from './book-list';

export default async function BookListFilter({
  query, currentPage
}: Readonly<{
  query: string;
  currentPage: number;
}>) {
  const books = (await fetchFilteredBooks(query, currentPage)) as Book[];

  return (
    <div className='flow-root'>
      <BookList containerClassName="mt-10" books={books} />
    </div>
  )
}
