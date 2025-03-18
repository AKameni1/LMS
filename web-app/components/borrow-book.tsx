'use client';

import { useRouter } from '@/i18n/navigation';
import { Button } from './ui/button';
import Image from 'next/image';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { borrowBook } from '@/lib/actions/books';
import BookRequestModal from './book-request-modal';

type BorrowBookProps = {
  userId: string;
  bookId: string;
  isBorrowed: boolean;
  borrowingEligibility: {
    isEligible: boolean;
    message: string;
  };
};

export default function BorrowBook({
  userId,
  bookId,
  isBorrowed,
  borrowingEligibility: { isEligible, message },
}: Readonly<BorrowBookProps>) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const text = isBorrowed ? 'View Book' : 'Borrow Book Request';

  const handleBorrowBook = () => {
    if (!isEligible) {
      toast.error('Error while borrowing', {
        description: message,
      });
      return;
    }

    startTransition(async () => {
      try {
        const result = await borrowBook({ bookId, userId });

        if (result.success) {
          toast.success('Success', {
            description: 'Book borrowed successfully',
          });

          router.push('/my-profile');
        } else {
          toast.info('Info', {
            description: result.message,
          });
        }
      } catch (error) {
        toast.error('Error', {
          description: `An error occurred while borrowing the book. ${error}`,
        });
      }
    });
  };

  return (
    <>
      <Button
        className="book-overview_btn"
        onClick={() => {
          if (isBorrowed) {
            router.push(`/books/${bookId}/preview`);
            return;
          }
          setOpen(true);
        }}
        disabled={isPending}
      >
        <Image src={'/icons/book.svg'} width={20} height={20} alt="book-icon" />
        <p className="font-bebas-neue text-xl text-dark-100">
          {isPending ? 'Borrowing...' : text}
        </p>
      </Button>

      <BookRequestModal
        open={open}
        onOpenChange={(state) => {
          setOpen(state);
        }}
        onConfirm={() => {
          handleBorrowBook();
        }}
      />
    </>
  );
}
