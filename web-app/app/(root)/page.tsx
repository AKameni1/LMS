import { auth } from '@/auth';
import BookList from '@/components/book-list';
import BookOverview from '@/components/book-overview';
import { fetchPopularBooks } from '@/lib/data';
import React from 'react';

export default async function Home() {
  const session = await auth();

  const latestBooks = await fetchPopularBooks();

  if (latestBooks.length === 0) {
    return (
      <p className="text-center text-xl font-semibold">
        No books available yet.
      </p>
    );
  }

  return (
    <>
      <BookOverview {...latestBooks[0]} userId={session?.user?.id as string} />

      <BookList
        title="Popular Books"
        books={latestBooks.slice(1)}
        containerClassName="mt-28"
      />
    </>
  );
}
