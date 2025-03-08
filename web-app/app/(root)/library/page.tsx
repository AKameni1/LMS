import FilterBookList from '@/components/filter-book-list';
import FilterSelect from '@/components/filter-select';
import NoResults from '@/components/no-results';
import Pagination from '@/components/pagination';
import Search from '@/components/search';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { SearchProvider } from '@/context/search-books-context';
import { books } from '@/db/schema';
import { fetchBooksPages } from '@/lib/data';
import { truncateText } from '@/lib/utils';
import { Loader2Icon } from 'lucide-react';
import { Suspense } from 'react';

export default async function Page({ searchParams }: Readonly<SearchParams>) {
  const { query, filter, page } = await searchParams;
  const currentPage = Number(page) || 1;
  const totalPages = await fetchBooksPages(
    query ?? '',
    books,
    (filter ?? 'all') as Filter,
  );

  return (
    <SearchProvider>
      <main className="library">
        <div className="mx-auto max-w-xl max-sm:w-full">
          <p className="library-subtitle">DISCOVER YOUR NEXT GREAT READ:</p>
          <h1 className="library-title">
            Explore and Search for{' '}
            <span className="text-light-200">Any Book</span> In Our Library
          </h1>
          <Search placeholder="Search for books" route="/library" />
        </div>

        <div className="mb-4 mt-12 flex w-full max-w-7xl items-center justify-between">
          <div className={'mr-4'}>
            {!query ? (
              <h2 className="font-bebas-neue text-4xl text-light-100">
                All Library Books
              </h2>
            ) : (
              <h2 className="text-3xl font-semibold text-light-100">
                Search Result for:{' '}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="max-w-2 text-light-200" role="tooltip">
                        {truncateText(query, 20)}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm font-medium text-dark-200">
                        {query}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </h2>
            )}
          </div>

          <FilterSelect initialFilter={filter} />
        </div>

        {totalPages === 0 ? (
          <NoResults />
        ) : (
          <>
            <Suspense
              fallback={
                <Loader2Icon className="m-auto h-1/3 w-1/3 animate-spin text-light-300" />
              }
            >
              <FilterBookList
                query={query ?? ''}
                currentPage={currentPage}
                filter={filter as Filter}
                type="Library"
              />
            </Suspense>

            <Separator className="mt-10 h-1 rounded-full bg-dark-200/40" />

            <Pagination route='/library' totalPages={totalPages} />
          </>
        )}
      </main>
    </SearchProvider>
  );
}
