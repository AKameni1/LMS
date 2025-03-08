'use client';

import Form from 'next/form';
import { useSearchParams } from 'next/navigation';
import { generatePagination } from '@/lib/utils';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({
  totalPages,
  route,
}: Readonly<{ totalPages: number; route: string }>) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <div id="pagination" className="mt-10 flex items-center gap-2">
      <Form action={route} scroll={false}>
        {/* Preserve all existing query parameters except page */}
        {Array.from(searchParams.entries()).map(([key, value]) => {
          if (key !== 'page') {
            return <input key={key} type="hidden" name={key} value={value} />;
          }
          return null;
        })}

        {/* Set page to previous page */}
        <input
          type="hidden"
          name="page"
          value={(currentPage > 1 ? currentPage - 1 : 1).toString()}
        />

        <Button
          type="submit"
          className="pagination-btn_dark"
          disabled={currentPage <= 1}
          aria-label="Previous Page"
        >
          <ChevronLeft
            strokeWidth={2}
            className="size-6 font-semibold text-light-100"
          />
        </Button>
      </Form>

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
            <Form
              key={page}
              action={route}
              scroll={false}
              className="inline-flex"
            >
              {/* Preserve all existing query parameters except page */}
              {Array.from(searchParams.entries()).map(([key, value]) => {
                if (key !== 'page') {
                  return (
                    <input key={key} type="hidden" name={key} value={value} />
                  );
                }
                return null;
              })}

              {/* Set page to selected page */}
              <input type="hidden" name="page" value={page.toString()} />

              <Button
                type="submit"
                aria-label={`Page ${page}`}
                className="pagination-btn_dark inline-flex items-center rounded-md px-4 py-1.5 text-center text-sm font-semibold"
              >
                {page}
              </Button>
            </Form>
          );
        })}
      </div>

      <Form action={route} scroll={false}>
        {/* Preserve all existing query parameters except page */}
        {Array.from(searchParams.entries()).map(([key, value]) => {
          if (key !== 'page') {
            return <input key={key} type="hidden" name={key} value={value} />;
          }
          return null;
        })}

        {/* Set page to next page */}
        <input
          type="hidden"
          name="page"
          value={(currentPage < totalPages
            ? currentPage + 1
            : totalPages
          ).toString()}
        />

        <Button
          type="submit"
          className="pagination-btn_dark"
          disabled={currentPage >= totalPages}
          aria-label="Next Page"
        >
          <ChevronRight
            strokeWidth={2}
            className="size-6 font-semibold text-light-100"
          />
        </Button>
      </Form>
    </div>
  );
}
