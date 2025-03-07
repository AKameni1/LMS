import BookCard from './book-card';
import { fetchSimilarBooks } from '@/lib/data';

type SimilarBooksProps = {
  currentBookId: string;
  genre: string;
};

export default async function SimilarBooks({
  currentBookId,
  genre,
}: Readonly<SimilarBooksProps>) {
  const similarBooks = await fetchSimilarBooks(currentBookId, genre);

  return similarBooks.length < 1 ? null : (
    <div className="flex-1">
      <section className="flex flex-col gap-7">
        <h2>More similar books</h2>
        <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-2">
          {similarBooks.map((book) => (
            <BookCard key={book.id} {...book} />
          ))}
        </ul>
      </section>
    </div>
  );
}
