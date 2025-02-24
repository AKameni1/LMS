import React from 'react';
import BookCover from '../book-cover';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { getInitials } from '@/lib/utils';
import Image from 'next/image';
import { fetchBookRequests } from '@/lib/actions/admin/book';

export default async function RequestList() {
  const { success, error, ...requests } = await fetchBookRequests();

  if (!success && error) {
    throw new Error(error);
  }

  if (!requests.data?.length || requests.data?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-5">
        <Image
          src="/images/borrow-requests.svg"
          width={200}
          height={200}
          alt="Borrow Requests"
        />

        <p className="text-base font-semibold text-dark-400">
          No Pending Borrow Requests
        </p>
        <p className="text-sm text-dark-700">
          There are no borrow requests awaiting your review at this time
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 divide-y divide-border">
      {requests.data.map(
        ({
          id,
          coverColor,
          coverUrl,
          title,
          author,
          genre,
          date,
          userName,
        }) => (
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
                <p>
                  By {author} • {genre}
                </p>
              </div>
              <div className="user">
                <div className="avatar">
                  <Avatar className="size-6">
                    <AvatarFallback className="bg-blue-600 text-xs font-medium text-light-100">
                      {getInitials(userName ?? 'IN')}
                    </AvatarFallback>
                  </Avatar>
                  <p>{userName}</p>
                </div>
                <div className="borrow-date">
                  <Image
                    src="/icons/admin/calendar.svg"
                    width={14}
                    height={14}
                    alt="Calendar"
                  />
                  <p>
                    {date?.toLocaleString('en-US', {
                      month: 'short',
                    })}{' '}
                    {date?.toLocaleString('en-US', {
                      day: '2-digit',
                    })}
                    {', '}
                    {date?.toLocaleString('en-US', {
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white p-1 text-dark-400 drop-shadow-sm transition-colors duration-300 group-hover:bg-dark-200/10">
              <Image
                src="/icons/admin/eye.svg"
                width={16}
                height={16}
                alt="View Request"
              />
            </div>
          </div>
        ),
      )}
    </div>
  );
}
