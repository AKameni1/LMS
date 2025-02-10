'use client'; // Error boundaries must be Client Components

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function Errors({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className='flex h-auto w-auto flex-col items-center justify-center space-y-4'>
      <h2 className="text-3xl text-light-100">
        Something went wrong!
      </h2>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  );
}
