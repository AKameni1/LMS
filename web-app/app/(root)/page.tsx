import { auth } from '@/auth';
import BookList from '@/components/book-list';
import BookOverview from '@/components/book-overview';
import { db } from '@/db/drizzle';
import { books } from '@/db/schema';
import { desc } from 'drizzle-orm';

export default async function Home() {
  const session = await auth();

  const latestBooks = (await db
    .select()
    .from(books)
    .limit(7)
    .orderBy(desc(books.createdAt))) as Book[];

  return (
    <>
      <BookOverview {...latestBooks[0]} userId={session?.user?.id as string} />

      <BookList
        title="Latest Books"
        books={latestBooks.slice(1)}
        containerClassName="mt-28"
      />
    </>
  );
}
