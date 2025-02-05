import Link from 'next/link';
import React from 'react';
import BookCover from './book-cover';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Button } from './ui/button';

export default function BookCard({
  id,
  title,
  genre,
  coverColor,
  coverUrl,
  isLoanedBook = false,
}: Readonly<Book>) {
  return (
    <li className={cn(isLoanedBook && 'w-full xs:w-52')}>
      <Link
        href={`/books/${id}`}
        className={cn(isLoanedBook && 'flex w-full flex-col items-center')}
      >
        <BookCover
          bookTitle={title}
          coverColor={coverColor}
          coverImage={coverUrl}
        />

        <div className={cn('mt-4', !isLoanedBook && 'max-w-28 xs:max-w-40')}>
          <p className="book-title">{title}</p>
          <p className="book-genre">{genre}</p>
        </div>

        {isLoanedBook && (
          <div className="mt-3 w-full">
            <div className="book-loaned">
              <Image
                src={'/icons/calendar.svg'}
                width={18}
                height={18}
                alt="calendar"
                className="object-contain"
              />
              <p className="text-light-100">11 days left to return</p>
            </div>

            <Button className="book-btn">Download receipt</Button>
          </div>
        )}
      </Link>
    </li>
  );
}
