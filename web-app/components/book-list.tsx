import React from 'react';
import BookCard from './book-card';

type BookListPropsType = {
  title: string;
  books: Book[];
  containerClassName?: string;
};

export default function BookList({
  books,
  containerClassName,
}: Readonly<BookListPropsType>) {
  if (books.length < 2) {
    return
  }
  return (
    <section className={containerClassName}>
      <h2 className="font-bebas-neue text-4xl text-light-100">Popular Books</h2>

      <ul className="book-list">
        {books.map((book) => (
          <BookCard key={book.id} {...book} />
        ))}
      </ul>
    </section>
  );
}
