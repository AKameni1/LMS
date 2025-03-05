import { auth } from '@/auth';
import BookList from '@/components/book-list';
import BookOverview from '@/components/book-overview';
import { fetchPopularBooks } from '@/lib/data';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function Home() {
  const session = await auth();
  const userId = session?.user?.id;

  // check if user is logged in
  if (!session || !userId) {
    redirect('/sign-in');
  }

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
      <BookOverview {...latestBooks[0]} userId={userId} />

      <BookList
        title="Popular Books"
        books={latestBooks.slice(1)}
        containerClassName="mt-28"
      />
    </>
  );
}
