import { auth, signOut } from '@/auth';
import BookList from '@/components/book-list';
import { Button } from '@/components/ui/button';
import { db } from '@/db/drizzle';
import { books, borrowRecords } from '@/db/schema';
import { desc, eq, inArray } from 'drizzle-orm';
import React from 'react';

export default async function Page() {
  const session = await auth();

  const latestBooks = (await db
    .select()
    .from(books)
    .limit(10)
    .orderBy(desc(books.createdAt))) as Book[];

  // Breakdown of the code:

  // 1. Fetch all the borrowed books from the borrowRecords table where the userId is equal to the current user id.
  const borrowedBooks = await db
    .select()
    .from(borrowRecords)
    .where(eq(borrowRecords.userId, session?.user?.id!));

  // 2. Fetch all the books from the books table where the id is in the list of bookIds.
  const bookIds = borrowedBooks.map((borrowedBook) => borrowedBook.bookId);
  const userBooks = await db
    .select()
    .from(books)
    .where(inArray(books.id, bookIds));

  console.log(userBooks);

  return (
    <>
      <form
        action={async () => {
          'use server';

          await signOut();
        }}
        className="mb-10"
      >
        <Button>Logout</Button>
      </form>

      {/* 3. Render the BookList component with the title "Borrowed Books" and the list of books fetched in step 2. */}

      <BookList title="Borrowed Books" books={latestBooks} />
    </>
  );
}
