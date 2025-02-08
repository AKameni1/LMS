import { auth } from '@/auth';
import BorrowedBookCard from '@/components/borrowed-book-card';
import ProfileCard from '@/components/profile-card';
import { db } from '@/db/drizzle';
import { books, borrowRecords, users } from '@/db/schema';
import { eq, inArray } from 'drizzle-orm';
import React from 'react';

export default async function Page() {
  const session = await auth();

  // Fetch the user of the current session.
  const user = (await db
    .select()
    .from(users)
    .where(eq(users.id, session?.user?.id!))
    .limit(1)
    .then((res) => res[0])) as User;

  // Breakdown of the code:

  // 1. Fetch all the borrowed books from the borrowRecords table where the userId is equal to the current user id.
  const borrowedBooksInfo = await db
    .select({
      bookId: borrowRecords.bookId,
      borrowDate: borrowRecords.borrowDate,
      returnDate: borrowRecords.returnDate,
      dueDate: borrowRecords.dueDate,
      status: borrowRecords.status,
    })
    .from(borrowRecords)
    .where(eq(borrowRecords.userId, session?.user?.id!)) as BorrowedBookInfo[];

  // 2. Fetch all the books from the books table where the id is in the list of bookIds.
  const bookIds = borrowedBooksInfo.map((borrowedBook) => borrowedBook.bookId);
  const userBooks = (await db
    .select()
    .from(books)
    .where(inArray(books.id, bookIds))) as Book[];

  userBooks.forEach((book) => {
    book.isLoanedBook = true;
  });

  console.log(userBooks);

  return (
    <>
      <div className="grid w-full max-w-7xl gap-14 lg:grid-cols-[35%_auto]">
        <div className="max-h-screen lg:sticky lg:top-6 lg:self-start">
          <ProfileCard {...user} />
        </div>

        <div>
          <h2 className="text-3xl font-semibold text-light-100 mb-6">
            Borrowed Books
          </h2>
          <div className="flex flex-wrap gap-4">
            {userBooks.map((book, index) => (
              <BorrowedBookCard key={book.id} book={book} borrowedBookInfo={borrowedBooksInfo[index]} />
            ))}
          </div>
        </div>
      </div>

      {/* 3. Render the BookList component with the title "Borrowed Books" and the list of books fetched in step 2. */}

      {/* <BookList title="Borrowed Books" books={latestBooks} /> */}
    </>
  );
}
