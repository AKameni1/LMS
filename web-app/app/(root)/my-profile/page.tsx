import BorrowedBookCard from '@/components/borrowed-book-card';
import ProfileCard from '@/components/profile-card';
import { verifySession } from '@/lib/dal';
import { fetchUserBorrowedBooks } from '@/lib/data';

import React from 'react';

export default async function Page() {
  const { userId } = await verifySession();

  // Fetch user data and borrowed books
  const { user, borrowItems } = await fetchUserBorrowedBooks(userId);

  return (
    <>
      {/* 3. Render the BookList component with the title "Borrowed Books" and the list of books fetched in step 2. */}

      <div
        className={`grid w-full max-w-7xl gap-14 ${borrowItems.length <= 2 ? 'lg:grid-cols-[auto_auto]' : 'lg:grid-cols-[35%_auto]'}`}
      >
        <div className="max-h-screen lg:sticky lg:top-6 lg:self-start">
          <ProfileCard {...user} />
        </div>

        <section>
          <h2 className="mb-6 text-3xl font-semibold text-light-100">
            Borrowed Books
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {borrowItems.map(({ book, borrowInfo }) => {
              return (
                <BorrowedBookCard
                  key={borrowInfo.requestId}
                  borrowedBookInfo={borrowInfo}
                  book={book}
                />
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
