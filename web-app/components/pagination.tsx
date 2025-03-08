'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { generatePagination } from '@/lib/utils';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { formUrlQuery } from '@/lib/url';

export default function Pagination({
  totalPages,
}: Readonly<{ totalPages: number }>) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = Number(searchParams.get('page')) || 1;

  const allPages = generatePagination(currentPage, totalPages);

  const handlePageChange = (page: number | string) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: 'page',
      value: page.toString(),
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <div id="pagination" className="mt-10">
      <Button
        className="pagination-btn_dark"
        disabled={currentPage <= 1}
        onClick={() => handlePageChange(currentPage - 1)}
        aria-label="Previous Page"
      >
        <ChevronLeft
          strokeWidth={2}
          className="size-6 font-semibold text-light-100"
        />
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
            <Button
              key={page}
              onClick={() => handlePageChange(page)}
              aria-label={`Page ${page}`}
              className="pagination-btn_dark inline-flex items-center rounded-md px-4 py-1.5 text-center text-sm font-semibold"
            >
              {page}
            </Button>
          );
        })}
      </div>

      <Button
        className="pagination-btn_dark"
        disabled={currentPage >= totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        aria-label="Next Page"
      >
        <ChevronRight
          strokeWidth={2}
          className="size-6 font-semibold text-light-100"
        />
      </Button>
    </div>
  );
}
