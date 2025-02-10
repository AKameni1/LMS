import { Loader2 } from 'lucide-react';
import React from 'react';

export default function Loading() {
  return (
    <div className="flex min-h-[50vh] w-full max-w-7xl flex-col items-center justify-center gap-4">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
      <div className="flex flex-col items-center gap-2">
        <h1 className="animate-pulse text-3xl font-semibold text-white">
          Loading your library...
        </h1>
        <p className="text-light-100">Please wait while we fetch the details</p>
      </div>
    </div>
  );
}
