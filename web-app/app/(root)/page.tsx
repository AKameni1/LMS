import BookList from '@/components/book-list';
import BookOverview from '@/components/book-overview';
import { verifySession } from '@/lib/dal';
import { fetchPopularBooks } from '@/lib/data';
import React from 'react';

/**
 * Home Page Component
 * 
 * This is the main landing page of the application that displays popular books.
 * It shows a featured book at the top using BookOverview component,
 * followed by a list of other popular books.
 */
export default async function Home() {
  // Verify user session and get userId
  const { userId } = await verifySession();

  // Fetch the list of popular books from the database
  const latestBooks = await fetchPopularBooks();

  // Display a message if no books are available
  if (latestBooks.length === 0) {
    return (
      <p className="text-center text-xl font-semibold">
        No books available yet.
      </p>
    );
  }

  return (
    <>
      {/* Display the first book as a featured overview */}
      <BookOverview {...latestBooks[0]} userId={userId} />

      {/* Display remaining books in a grid layout */}
      <BookList
        title="Popular Books"
        books={latestBooks.slice(1)}
        containerClassName="mt-28"
      />
    </>
  );
}
