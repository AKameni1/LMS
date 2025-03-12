import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="max-w-2xl rounded-lg border bg-card p-6">
      <div className="space-y-8">
        {/* Title field */}
        <div className="flex flex-col gap-1">
          <Skeleton className="mb-1 h-5 w-24 bg-gray-200" />
          <Skeleton className="h-10 w-full bg-gray-200" />
        </div>

        {/* Author field */}
        <div className="flex flex-col gap-1">
          <Skeleton className="mb-1 h-5 w-16 bg-gray-200" />
          <Skeleton className="h-10 w-full bg-gray-200" />
        </div>

        {/* Genre field */}
        <div className="flex flex-col gap-1">
          <Skeleton className="mb-1 h-5 w-14 bg-gray-200" />
          <Skeleton className="h-10 w-full bg-gray-200" />
        </div>

        {/* Rating and Total Copies */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <Skeleton className="mb-1 h-5 w-16 bg-gray-200" />
            <Skeleton className="h-10 w-full bg-gray-200" />
          </div>
          <div className="flex flex-col gap-1">
            <Skeleton className="mb-1 h-5 w-40 bg-gray-200" />
            <Skeleton className="h-10 w-full bg-gray-200" />
          </div>
        </div>

        {/* Book Image */}
        <div className="flex flex-col gap-1">
          <Skeleton className="mb-1 h-5 w-24 bg-gray-200" />
          <Skeleton className="h-32 w-full rounded-md bg-gray-200" />
        </div>

        {/* Book Color */}
        <div className="flex flex-col gap-1">
          <Skeleton className="mb-1 h-5 w-36 bg-gray-200" />
          <Skeleton className="h-10 w-full bg-gray-200" />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <Skeleton className="mb-1 h-5 w-32 bg-gray-200" />
          <Skeleton className="h-32 w-full bg-gray-200" />
        </div>

        {/* Video */}
        <div className="flex flex-col gap-1">
          <Skeleton className="mb-1 h-5 w-28 bg-gray-200" />
          <Skeleton className="h-32 w-full rounded-md bg-gray-200" />
        </div>

        {/* Summary */}
        <div className="flex flex-col gap-1">
          <Skeleton className="mb-1 h-5 w-28 bg-gray-200" />
          <Skeleton className="h-32 w-full bg-gray-200" />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <Skeleton className="h-14 w-full bg-gray-200" />
          <Skeleton className="h-14 w-full bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
