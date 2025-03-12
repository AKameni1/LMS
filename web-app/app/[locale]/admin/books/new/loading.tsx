import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="space-y-8">
        {/* Title field */}
        <div className="flex flex-col gap-1">
          <Skeleton className="mb-1 h-5 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Author field */}
        <div className="flex flex-col gap-1">
          <Skeleton className="mb-1 h-5 w-16" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Genre field */}
        <div className="flex flex-col gap-1">
          <Skeleton className="mb-1 h-5 w-14" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Rating and Total Copies */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <Skeleton className="mb-1 h-5 w-16" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="flex flex-col gap-1">
            <Skeleton className="mb-1 h-5 w-40" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        {/* Book Image */}
        <div className="flex flex-col gap-1">
          <Skeleton className="mb-1 h-5 w-24" />
          <Skeleton className="h-32 w-full rounded-md" />
        </div>

        {/* Book Color */}
        <div className="flex flex-col gap-1">
          <Skeleton className="mb-1 h-5 w-36" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <Skeleton className="mb-1 h-5 w-32" />
          <Skeleton className="h-32 w-full" />
        </div>

        {/* Video */}
        <div className="flex flex-col gap-1">
          <Skeleton className="mb-1 h-5 w-28" />
          <Skeleton className="h-32 w-full rounded-md" />
        </div>

        {/* Summary */}
        <div className="flex flex-col gap-1">
          <Skeleton className="mb-1 h-5 w-28" />
          <Skeleton className="h-32 w-full" />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-14 w-full" />
        </div>
      </div>
    </div>
  );
}
