import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="flex-1 p-8">
      {/* Back button */}
      <Skeleton className="mb-8 h-8 w-24" />

      {/* Book content */}
      <div className="flex gap-8">
        {/* Book cover */}
        <div className="rounded-lg bg-[#fad2bc] bg-opacity-20 p-6">
          <Skeleton className="h-[400px] w-[300px]" />
        </div>

        {/* Book details */}
        <div className="flex-1 space-y-6">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <div className="flex gap-4">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-24" />
          </div>
          <Skeleton className="h-10 w-32" />

          {/* Summary section */}
          <div className="mt-8 space-y-4">
            <Skeleton className="h-6 w-32" />
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i + 1} className="h-4 w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
