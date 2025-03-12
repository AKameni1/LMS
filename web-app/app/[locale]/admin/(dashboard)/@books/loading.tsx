import LinkButton from '@/components/admin/link-button';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';

export default function Loading() {
  return (
    <div className="mt-4 flex h-full w-auto flex-1 flex-col space-y-5 rounded-xl bg-white p-5">
      <div className="stat-info">
        <p className="truncate whitespace-nowrap text-lg font-semibold text-dark-400">
          Recently Added Books
        </p>
        <LinkButton href="/admin/books" />
      </div>

      {/* Add Button here */}
      <div className="book-stripe items-center">
        <button className="group flex items-center gap-2 font-medium text-dark-400">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-dark-400 transition-colors duration-300 group-hover:bg-dark-200/10">
            <Image
              src="/icons/admin/plus.svg"
              width={16}
              height={16}
              alt="View Request"
            />
          </div>
          <p className="font-medium text-dark-400 transition-colors duration-300 group-hover:text-dark-600">
            Add New Book
          </p>
        </button>
      </div>

      <div className="relative">
        <div className="hide-scrollbar max-h-[475px] overflow-auto scroll-smooth">
          <div className="space-y-4 divide-y divide-border">
            {[...Array(5)].map((_, index) => (
              <div className="book-stripe" key={index + 1}>
                <Skeleton className="h-20 w-16 bg-gray-200" />
                <div className="flex-1 space-y-1">
                  <Skeleton className="h-4 w-40 bg-gray-200" />
                  <div className="flex items-center space-x-2">
                    <Skeleton className="h-4 w-20 bg-gray-200" />
                    <span className="text-light-500">•</span>
                    <Skeleton className="h-4 w-20 bg-gray-200" />
                  </div>
                  <Skeleton className="h-4 w-20 bg-gray-200" />
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
