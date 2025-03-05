import Link from 'next/link';
import React from 'react';
import BookCover from './book-cover';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Button } from './ui/button';
import FavoriteBook from './favorite-book';

export default function BookCard({
  id,
  title,
  genre,
  coverColor,
  coverUrl,
  isLoanedBook = false,
  dueDate = '2024-12-31',
}: Readonly<Book>) {
  const today = new Date();
  const due = dueDate ? new Date(dueDate) : null;
  let diffDays = 0;
  let dueMessage: string;

  if (due) {
    const diffTime = due.getTime() - today.getTime();
    diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  if (diffDays === 0) {
    dueMessage = 'Book is due before 4PM';
  } else {
    const daysLabel = diffDays <= 1 ? 'day' : 'days';
    dueMessage = `${diffDays.toString().padStart(2, '0')} ${daysLabel} left to return`;
  }

  return (
    <li className={cn('w-max text-left', isLoanedBook && 'xs:w-52')}>
      <Link href={`/books/${id}`}>
        <BookCover
          bookTitle={title}
          coverColor={coverColor}
          coverImage={coverUrl}
        />

        <div className={cn('mt-4', !isLoanedBook && 'max-w-28 xs:max-w-40')}>
          <p className="book-title">{title}</p>
          <p className="book-genre">{genre}</p>
        </div>
      </Link>
      {isLoanedBook && (
        <div className="mt-3 w-fit">
          <div className="book-loaned">
            <Image
              src={'/icons/calendar.svg'}
              width={18}
              height={18}
              alt="calendar"
              className="object-contain"
            />
            <p className="text-light-100">{dueMessage}</p>
          </div>

          <Button className="book-btn" asChild>
            <a href="/Receipt.pdf" download>
              Download receipt
            </a>
          </Button>
        </div>
      )}
    </li>
  );
}
