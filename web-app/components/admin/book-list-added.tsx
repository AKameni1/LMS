import React from 'react';
import BookCover from '../book-cover';
import Image from 'next/image';
import { fetchBooksAdded } from '@/lib/actions/admin/book';

export default async function BookListAdded() {
  const { success, data } = await fetchBooksAdded();

  if (!success || !data) {
    throw new Error('Failed to fetch books added.');
  }

  return (
    <div className="space-y-4 divide-y divide-border">
      {data.length === 0 ? (
        <div className="py-6 text-center text-muted-foreground">
          There are no borrow book requests awaiting your review at this time.
        </div>
      ) : (
        data.map(
          ({ id, coverUrl, coverColor, title, author, genre, createdAt }) => (
            <div className="book-stripe" key={id}>
              <BookCover
                variant="small"
                coverImage={coverUrl}
                coverColor={coverColor}
                bookTitle={title}
              />

              <div className="flex-1 space-y-1">
                <h3 className="title">{title}</h3>
                <div className="author">
                  <p>By {author}</p>
                  <span className="text-light-500">•</span>
                  <p>{genre}</p>
                </div>
                <div className="user">
                  <div className="borrow-date">
                    <Image
                      src="/icons/admin/calendar.svg"
                      width={14}
                      height={14}
                      alt="Calendar"
                    />
                    <p>
                      {createdAt?.toLocaleString('en-US', { month: 'short' })}{' '}
                      {createdAt?.toLocaleString('en-US', { day: '2-digit' })}
                      {', '}
                      {createdAt?.toLocaleString('en-US', { year: 'numeric' })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ),
        )
      )}
    </div>
  );
}
