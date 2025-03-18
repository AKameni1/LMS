'use client';

import Image from 'next/image';
import { Button } from './ui/button';
import { useRouter } from '@/i18n/navigation';

export default function EmptyList() {
  const router = useRouter();

  const path = () => {
    router.push('/library');
  };

  return (
    <div className="mt-10 flow-root">
      <div id="not-found" className="mt-10">
        <Image
          src={'/images/no-books.png'}
          alt="No books found"
          width={300}
          height={300}
        />

        <h4>No Results Found</h4>
        <p>
          You don&apos;t have any books in your favorites. <br /> Go and find your
          next great read.
        </p>
        <Button className="not-found-btn" onClick={path}>
          Search Library
        </Button>
      </div>
    </div>
  );
}
