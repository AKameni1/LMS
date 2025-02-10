import { db } from '@/db/drizzle';
import { books } from '@/db/schema';
import { and, eq, not } from 'drizzle-orm';
import BookCard from './book-card';

type SimilarBooksProps = {
  currentBookId: string;
  genre: string;
};

export default async function SimilarBooks({
  currentBookId,
  genre,
}: Readonly<SimilarBooksProps>) {
  const similarBooks = await db
    .select()
    .from(books)
    .where(and(eq(books.genre, genre), not(eq(books.id, currentBookId))))
    .limit(6);

  return similarBooks.length < 1 ? null : (
    <div className="flex-1">
      <section className="flex flex-col gap-7">
        <h3>More similar books</h3>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-2">
          {similarBooks.map((book) => (
            <BookCard key={book.id} {...book} />
          ))}
        </div>
      </section>
    </div>
  );
}
