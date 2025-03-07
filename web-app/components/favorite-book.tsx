'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import Image from 'next/image';
import { useTransition } from 'react';
import { toast } from 'sonner';
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
  addFavoriteEligibility: { isEligible },
}: Readonly<FavoriteBookProps>) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleFavoriteBook = async () => {
    startTransition(async () => {
      try {
        const result = await favoriteBook({ bookId, userId });

        if (result.success) {
            toast.success('Success', {
                description: result.message,
              });

          router.push('/my-favorites');
        } else {
            toast.info('Info', {
                description: result.message,
              });
        }
      } catch (error) {
        toast.error('Error', {
            description: `An error occurred while adding the book to favorites. ${error}`,
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
      {isEligible ? 
      <p className="font-bebas-neue text-xl text-dark-100">
      {isPending ? 'Adding...' : 'Add to favorites'}
    </p>
       :
    <p className="font-bebas-neue text-xl text-dark-100">
    {isPending ? 'Removing...' : 'Remove from favorites'}
  </p>
      }
      
    </Button>
  );
}
