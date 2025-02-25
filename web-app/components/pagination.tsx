'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { generatePagination } from '@/lib/utils';
import Link from 'next/link';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({
  totalPages,
}: Readonly<{ totalPages: number }>) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <div id="pagination" className="mt-10">
      <Button
        className="pagination-btn_dark"
        disabled={currentPage <= 1}
        asChild={currentPage > 1}
      >
        {currentPage <= 1 ? (
          <div>
            <ChevronLeft
              strokeWidth={2}
              className="h-6 w-6 font-semibold text-light-100"
            />
          </div>
        ) : (
          <Link href={createPageURL(currentPage - 1)}>
            <ChevronLeft
              strokeWidth={2}
              className="h-6 w-6 font-semibold text-light-100"
            />
          </Link>
        )}
      </Button>

      <div className="flex gap-3">
        {allPages.map((page, index) => {
          const isCurrentPage = currentPage === page;

          if (page === '...') {
            return (
              <p key={`${page}-${index}`} className="pagination-btn_dark">
                {page}
              </p>
            );
          }

          return isCurrentPage ? (
            <p key={page} className="pagination-btn_light">
              {page}
            </p>
          ) : (
            <Link
              key={page}
              href={createPageURL(page)}
              className="pagination-btn_dark inline-flex items-center rounded-md px-4 py-1.5 text-center text-sm font-semibold"
            >
              {page}
            </Link>
          );
        })}
      </div>

      <Button
        className="pagination-btn_dark"
        disabled={currentPage >= totalPages}
        asChild={currentPage < totalPages}
      >
        {currentPage >= totalPages ? (
          <div>
            <ChevronRight
              strokeWidth={2}
              className="h-6 w-6 font-semibold text-light-100"
            />
          </div>
        ) : (
          <Link href={createPageURL(currentPage + 1)}>
            <ChevronRight
              strokeWidth={2}
              className="h-6 w-6 font-semibold text-light-100"
            />
          </Link>
        )}
      </Button>
    </div>
  );
}
