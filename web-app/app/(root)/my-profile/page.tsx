import { auth } from '@/auth';
import BorrowedBookCard from '@/components/borrowed-book-card';
import ProfileCard from '@/components/profile-card';
import { fetchUserBorrowedBooks } from '@/lib/data';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function Page() {
  const session = await auth();

  const userId = session?.user?.id;

  if (!userId) {
    redirect('sign-in');
  }

  // Fetch user data and borrowed books
  const { user, userBooks, borrowedBooksMap } =
    await fetchUserBorrowedBooks(userId);

  console.log(userBooks);

  return (
    <>
      {/* 3. Render the BookList component with the title "Borrowed Books" and the list of books fetched in step 2. */}

      <div
        className={`grid w-full max-w-7xl gap-14 ${userBooks.length <= 2 ? 'lg:grid-cols-[40%_auto]' : 'lg:grid-cols-[35%_auto]'}`}
      >
        <div className="max-h-screen lg:sticky lg:top-6 lg:self-start">
          <ProfileCard {...user} />
        </div>

        <section>
          <h2 className="mb-6 text-3xl font-semibold text-light-100">
            Borrowed Books
          </h2>
          <div className="flex flex-1 flex-wrap gap-4">
            {userBooks.map((book) => {
              const borrowedBookInfo = borrowedBooksMap.get(book.id);
              if (!borrowedBookInfo) return null;

              return (
                <BorrowedBookCard
                  key={book.id}
                  borrowedBookInfo={borrowedBookInfo}
                />
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
