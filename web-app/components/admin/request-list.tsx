import BookCover from '../book-cover';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { getInitials } from '@/lib/utils';
import Image from 'next/image';
import { fetchBookRequests } from '@/lib/actions/admin/borrow-requests';
import ViewButton from './view-button';

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
          alt="Borrow Requests Empty State"
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
                      day: '2-digit',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>

            <ViewButton />
          </div>
        ),
      )}
    </div>
  );
}
