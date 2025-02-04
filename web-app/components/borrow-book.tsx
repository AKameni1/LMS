'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { borrowBook } from '@/lib/actions/books';

type BorrowBookProps = {
  userId: string;
  bookId: string;
  borrowingEligibility: {
    isEligible: boolean;
    message: string;
  };
};

export default function BorrowBook({
  userId,
  bookId,
  borrowingEligibility: { isEligible, message },
}: Readonly<BorrowBookProps>) {
  const router = useRouter();
  const [borrowing, setBorrowing] = useState(false);

  const handleBorrowBook = async () => {
    if (!isEligible) {
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
      return;
    }

    setBorrowing(true);

    try {
      const result = await borrowBook({ bookId, userId });

      if (result.success) {
        toast({
          title: 'Success',
          description: 'Book borrowed successfully',
        });

        router.push('/');
      } else {
        toast({
          title: 'Error',
          description: result.message,
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: `An error occurred while borrowing the book. ${error}`,
        variant: 'destructive',
      });
    } finally {
      setBorrowing(false);
    }
  };

  return (
    <Button
      className="book-overview_btn"
      onClick={handleBorrowBook}
      disabled={borrowing}
    >
      <Image src={'/icons/book.svg'} width={20} height={20} alt="book-icon" />
      <p className="font-bebas-neue text-xl text-dark-100">
        {borrowing ? 'Borrowing...' : 'Borrow Book Request'}
      </p>
    </Button>
  );
}
