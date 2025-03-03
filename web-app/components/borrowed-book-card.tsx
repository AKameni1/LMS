import Image from 'next/image';
import BookCover from './book-cover';
import chroma from 'chroma-js';
import { cn, getDateWithSuffix } from '@/lib/utils';
import { TriangleAlertIcon } from 'lucide-react';
import Link from 'next/link';
import OptionsDropdown from './options-dropdown';

type BorrowedBookCardProps = {
  borrowedBookInfo: BorrowedBookInfo;
  book: Book;
};

export default function BorrowedBookCard({
  borrowedBookInfo,
  book,
}: Readonly<BorrowedBookCardProps>) {
  const { borrowDate, dueDate, returnDate, status, requestId, userId } =
    borrowedBookInfo;
  const { id, title, genre, coverColor, coverUrl } = book;

  const today = new Date();
  const due = dueDate ? new Date(dueDate) : null;
  let diffDays = 0;
  let isOverdue = false;
  let dueMessage: string;

  if (due) {
    const diffTime = due.getTime() - today.getTime();
    diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    isOverdue = diffDays < 0 && status === 'BORROWED';
  }

  if (diffDays === 0) {
    dueMessage = 'Book is due before 4PM';
  } else {
    const daysLabel = diffDays <= 1 ? 'day' : 'days';
    dueMessage = `${diffDays.toString().padStart(2, '0')} ${daysLabel} left to return`;
  }

  const canCancel = canCancelRequest(borrowDate);
  const canReturn = status === 'BORROWED';
  const canRenew = canRenewRequest(dueDate, status);

  const hasValidOptions = canCancel || canReturn || canRenew;

  let messagePending = 'An admin has to approve your request!';
  if (status === 'CANCELLED') {
    messagePending = 'This request has been cancelled';
  }

  const backgroundColor = chroma(coverColor).alpha(0.55).css();

  return (
    <div className="borrowed-book text-light-100">
      {hasValidOptions && (
        <OptionsDropdown
          requestId={requestId}
          bookId={id}
          userId={userId}
          isOverdue={isOverdue}
          canCancel={canCancel}
          canReturn={canReturn}
          canRenew={canRenew}
        />
      )}
      {isOverdue && (
        <Image
          src={'/icons/warning.svg'}
          width={29}
          height={29}
          alt={`warning icon for overdue book - ${title}`}
          className="absolute -right-1 -top-1"
        />
      )}
      {dueDate && !returnDate && diffDays <= 1 && diffDays >= 0 && (
        <TriangleAlertIcon
          size={24}
          className="absolute -right-1 -top-1"
          color="orange"
        />
      )}
      <div className="borrowed-book_cover" style={{ backgroundColor }}>
        <Link href={`/books/${id}`}>
          <BookCover
            bookTitle={title}
            coverColor={coverColor}
            coverImage={coverUrl}
            variant="medium"
            className="drop-shadow-[-30px_4px_30px_rgba(0,0,0,0.4)]"
          />
        </Link>
      </div>

      <div className="mt-4 max-w-28 xs:max-w-40">
        <p className="book-title">{title}</p>
        <p className="book-genre">{genre}</p>
      </div>

      <div className="mt-6">
        <p className="mb-3 flex gap-2 text-sm">
          <Image
            src={'/icons/book-2.svg'}
            width={18}
            height={18}
            alt="book-2 icon"
          />
          Borrowed on{' '}
          {borrowDate.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
          })}
        </p>
        {dueDate ? (
          <div className="flex justify-between">
            {status === 'BORROWED' && (
              <p className="flex items-center gap-2 text-sm">
                {isOverdue ? (
                  <>
                    <Image
                      src={'/icons/warning.svg'}
                      width={18}
                      height={18}
                      alt={`warning icon for overdue book ${title}`}
                    />
                    <span className="text-[#FF6C6F]">Overdue Return</span>
                  </>
                ) : (
                  <>
                    <Image
                      src={'/icons/calendar.svg'}
                      width={18}
                      height={18}
                      alt={`calendar icon for overdue book ${title}`}
                    />
                    {dueMessage}
                  </>
                )}
              </p>
            )}

            {status === 'RETURNED' && returnDate && (
              <p className="flex items-center gap-2 text-xs">
                <Image
                  src={'/icons/tick.svg'}
                  width={18}
                  height={18}
                  alt={`check icon for returned book ${title}`}
                />
                Returned on {getDateWithSuffix(new Date(returnDate).getDate())}{' '}
                {new Date(returnDate).toLocaleString('en-US', {
                  month: 'short',
                  year: '2-digit',
                })}
              </p>
            )}
            <a
              className="cursor-pointer rounded-sm p-1 transition-all duration-100 hover:scale-105 hover:opacity-90"
              style={{ backgroundColor }}
              href="Receipt.pdf"
              download
            >
              <Image src={'/icons/receipt.svg'} width={18} height={18} alt="" />
            </a>
          </div>
        ) : (
          <p
            className={cn(
              'text-xs font-medium tracking-tight text-orange-400',
              status === 'CANCELLED' &&
                'mt-4 flex items-center justify-between text-xs font-semibold tracking-normal text-red-400',
            )}
          >
            {status === 'CANCELLED' && (
              <Image
                src={'/icons/warning.svg'}
                width={18}
                height={18}
                alt={`cancel icon for cancelled book ${title}`}
              />
            )}
            {messagePending}
          </p>
        )}
      </div>
    </div>
  );
}

function canCancelRequest(borrowDate: string | Date): boolean {
  const borrowTime = new Date(borrowDate).getTime();
  const currentTime = new Date().getTime();
  const hoursSinceBorrowed = (currentTime - borrowTime) / (1000 * 60 * 60);

  return hoursSinceBorrowed <= 24;
}

export function canRenewRequest(
  dueDate: string | Date | null,
  status: BorrowRequestStatus,
): boolean {
  const dueTime = dueDate ? new Date(dueDate).getTime() : null;
  const currentTime = new Date().getTime();
  const daysBeforeDue = dueTime
    ? (dueTime - currentTime) / (1000 * 60 * 60 * 24)
    : 0;
  return status === 'BORROWED' && daysBeforeDue <= 3 && daysBeforeDue > 0;
}
