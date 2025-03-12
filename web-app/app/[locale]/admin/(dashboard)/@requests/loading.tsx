import LinkButton from '@/components/admin/link-button';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="mt-4 flex w-auto flex-1 flex-col space-y-5 rounded-xl bg-white p-5">
      <div className="stat-info">
        <p className="truncate whitespace-nowrap text-lg font-semibold text-dark-400">
          Borrow Requests
        </p>
        <LinkButton href="/admin/book-requests" />
      </div>

      <div className="relative">
        <div className="hide-scrollbar max-h-[475px] overflow-auto scroll-smooth">
          <div className="space-y-4 divide-y divide-border">
            {[...Array(3)].map((_, index) => (
              <div className="book-stripe" key={index + 1}>
                <Skeleton className="h-20 w-16 bg-gray-200" />
                <div className="flex-1 space-y-1">
                  <Skeleton className="h-4 w-40 bg-gray-200" />
                  <div className="flex items-center space-x-2">
                    <Skeleton className="h-4 w-20 bg-gray-200" />
                    <span className="text-light-500">•</span>
                    <Skeleton className="h-4 w-20 bg-gray-200" />
                  </div>
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-7 w-7 bg-gray-200 rounded-full" />
                    <Skeleton className="h-4 w-20 bg-gray-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-50 h-20 bg-gradient-to-t from-background to-transparent" />
      </div>
    </div>
  );
}
