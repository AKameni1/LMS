'use client';

import { renewBorrowRequest } from '@/lib/actions/admin/borrow-requests';
import React, { useTransition } from 'react';
import { Button } from './ui/button';
import Image from 'next/image';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function RenewBook({
  bookId,
  userId,
}: Readonly<{ bookId: string; userId: string }>) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleRenewBook = () => {
    startTransition(async () => {
      try {
        const result = await renewBorrowRequest({ bookId, userId });

        if (result.success) {
          toast.success('Success', {
            description: 'Book renewed successfully',
          });

          router.push('/my-profile');
        } else {
          toast.info('Info', {
            description: 'You cannot renew this book',
          });
        }
      } catch (error) {
        console.error('Error renewing book:', error);
        toast.error('Error', {
          description: `An error occurred while borrowing the book. ${error}`,
        });
      }
    });
  };
  return (
    <Button
      className="book-overview_btn"
      onClick={handleRenewBook}
      disabled={isPending}
    >
      <Image
        src={'/icons/book.svg'}
        width={20}
        height={20}
        alt="book-renew-icon"
      />
      <p className="font-bebas-neue text-xl text-dark-100">
        {isPending ? 'Renewing...' : 'Renew Book'}
      </p>
    </Button>
  );
}
