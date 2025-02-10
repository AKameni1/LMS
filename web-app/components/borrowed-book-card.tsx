import Image from 'next/image';
import BookCover from './book-cover';
import chroma from 'chroma-js';
import { getDateWithSuffix } from '@/lib/utils';
import { TriangleAlertIcon } from 'lucide-react';
import Link from 'next/link';

type BorrowedBookCardProps = {
  book: Book;
  borrowedBookInfo: BorrowedBookInfo;
};

export default function BorrowedBookCard({
  book,
  borrowedBookInfo,
}: Readonly<BorrowedBookCardProps>) {
  const { id, title, genre, coverColor, coverUrl } = book;
  const { borrowDate, dueDate, returnDate, status } = borrowedBookInfo;

  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const isOverdue = diffDays < 0;

  const backgroundColor = chroma(coverColor).alpha(0.5).css();

  return (
    <div className="borrowed-book text-light-100">
      {isOverdue && (
        <Image
          src={'/icons/warning.svg'}
          width={29}
          height={29}
          alt={`warning icon for overdue book - ${title}`}
          className="absolute -right-1 -top-1"
        />
      )}
      {diffDays <= 1 && diffDays >= 0 && (
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
          Borrowed on {borrowDate.toLocaleString('en-US', { month: 'short' })}{' '}
          {borrowDate.toLocaleString('en-US', { day: '2-digit' })}
          {', '}
          {borrowDate.toLocaleString('en-US', { year: 'numeric' })}
        </p>

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
                  {diffDays.toString().padStart(2, '0')} day
                  {diffDays <= 1 ? '' : 's'} left to return
                </>
              )}
            </p>
          )}

          {status === 'RETURNED' && (
            <p className="flex items-center gap-2 text-xs">
              <Image
                src={'/icons/tick.svg'}
                width={18}
                height={18}
                alt={`check icon for returned book ${title}`}
              />
              Returned on {getDateWithSuffix(new Date(returnDate).getDate())}{' '}
              {new Date(returnDate).toLocaleString('en-US', { month: 'short' })}
              {', '}
              {new Date(returnDate).toLocaleString('en-US', {
                year: '2-digit',
              })}
            </p>
          )}
          <button
            className="rounded-sm p-1 transition-all duration-100 hover:scale-105 hover:opacity-80"
            style={{ backgroundColor }}
          >
            <Image
              src={'/icons/receipt.svg'}
              width={18}
              height={18}
              alt="receipt icon"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
