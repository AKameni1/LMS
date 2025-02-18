'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import Image from 'next/image';
import { useTransition } from 'react';
import { toast } from '@/hooks/use-toast';
import { favoriteBook } from '@/lib/actions/books';

type FavoriteBookProps = {
  userId: string;
  bookId: string;
  addFavoriteEligibility: {
    isEligible: boolean;
    message: string;
  };
};

export default function FavoriteBook({
  userId,
  bookId,
  addFavoriteEligibility: { isEligible, message },
}: Readonly<FavoriteBookProps>) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleFavoriteBook = async () => {
    if (!isEligible) {
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
      return;
    }

    startTransition(async () => {
      try {
        const result = await favoriteBook({ bookId, userId });

        if (result.success) {
          toast({
            title: 'Success',
            description: 'Book added to favorites successfully',
            variant: 'success',
          });

          router.push('/my-favorites');
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
          description: `An error occurred while adding the book to favorites. ${error}`,
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <Button
      className="book-overview_fbtn"
      onClick={handleFavoriteBook}
      disabled={isPending}
    >
      <Image src={'/icons/heart.svg'} width={30} height={30} alt="heart-icon" />
      <p className="font-bebas-neue text-xl text-dark-100">
        {isPending ? 'Adding...' : 'Add to favorites'}
      </p>
    </Button>
  );
}
