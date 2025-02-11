import { auth } from '@/auth';
import BookList from '@/components/book-list';
import BookOverview from '@/components/book-overview';
import { db } from '@/db/drizzle';
import { books, borrowRecords } from '@/db/schema';
import WelcomeEmail from '@/emails/welcome-email';
import { render } from '@react-email/render';
import { count, desc, eq } from 'drizzle-orm';
import React from 'react';

export default async function Home() {
  const session = await auth();

  const latestBooks = (await db
    .select({
      id: books.id,
      title: books.title,
      author: books.author,
      genre: books.genre,
      rating: books.rating,
      totalCopies: books.totalCopies,
      availableCopies: books.availableCopies,
      description: books.description,
      coverColor: books.coverColor,
      coverUrl: books.coverUrl,
      videoUrl: books.videoUrl,
      summary: books.summary,
      createdAt: books.createdAt,
      borrowCount: count(borrowRecords.id),
    })
    .from(borrowRecords)
    .innerJoin(books, eq(books.id, borrowRecords.bookId))
    .where(eq(borrowRecords.status, 'BORROWED'))
    .groupBy(books.id)
    .orderBy(desc(count(borrowRecords.id)))
    .limit(7)) as Book[];

  console.log(latestBooks[0].borrowCount);

  const message = await render(
    React.createElement(WelcomeEmail, { studentName: 'Arthur' }),
    {
      pretty: true,
      // plainText: true,
    },
  );

  console.log(message);

  console.log(typeof message);

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
