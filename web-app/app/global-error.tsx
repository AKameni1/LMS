'use client';
import { Button } from '@/components/ui/button';

// Error boundaries must be Client Components

export default function GlobalError({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  return (
    // global-error must include html and body tags
    <html lang="en">
      <body className="flex h-screen w-screen flex-col items-center justify-center space-y-4 bg-pattern">
        <h2 className="text-7xl font-light text-dark-100">
          Something went wrong!
        </h2>
        <p className="text-xl font-light text-dark-700">{error.message}</p>
        <Button
          onClick={() => reset()}
          className="bg-primary-admin text-white transition-all duration-200 hover:bg-primary-admin/90"
        >
          Try again
        </Button>
      </body>
    </html>
  );
}
