'use client'; // Error boundaries must be Client Components

import { Button } from '@/components/ui/button';
import { CircleAlertIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { startTransition, useEffect } from 'react';

export default function Errors({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  const router = useRouter();
  function handleReset() {
    startTransition(() => {
      reset();
      router.refresh();
    });
  }

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="mt-4 flex h-full w-auto flex-1 items-center justify-center rounded-xl bg-white p-5">
      <div className='flex flex-col items-center space-y-4 bg-red-200 p-4 border border-red rounded-xl'>
        <div>
          <CircleAlertIcon size={48} className='text-red-800' />
        </div>
        <h2 className="text-3xl text-light-600">Something went wrong!</h2>
        <p className="text-lg text-light-500">
          {error.digest ? 'Error ID: ' + error.digest : error.message}
        </p>
        <p className="text-light-600">
          Please try again or contact support if the problem persists.
        </p>
        <p className="text-light-600">
          If you are the developer, check the console for more information.
        </p>
        <Button className='text-white bg-red hover:bg-red-700 transition-all duration-300' onClick={handleReset}>Try again</Button>
      </div>
    </div>
  );
}
