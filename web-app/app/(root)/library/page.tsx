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
import { books } from '@/db/schema';
import { fetchBooksPages } from '@/lib/data';
import { truncateText } from '@/lib/utils';

export default async function Page(
  props: Readonly<{
    searchParams?: Promise<{
      query?: string;
      page?: string;
      filter?: string;
    }>;
  }>,
) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query ?? '';
  const filter = searchParams?.filter ?? 'all';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchBooksPages(
    query.trim(),
    books,
    filter.trim() as Filter,
  );

  return (
    <main className="library">
      <p className="library-subtitle">DISCOVER YOUR NEXT GREAT READ:</p>
      <h1 className="library-title">
        Explore and Search for <span className="text-light-200">Any Book</span>{' '}
        In Our Library
      </h1>

      <Search placeholder="Search for books" />

      <div className="mb-4 mt-12 flex items-center justify-between">
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
                    <span className="max-w-2 text-light-200">
                      {truncateText(query, 20)}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm font-medium text-dark-200">{query}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </h2>
          )}
        </div>

        <FilterSelect />
      </div>

      {totalPages === 0 ? (
        <NoResults />
      ) : (
        <>
          <FilterBookList
            query={query.trim()}
            currentPage={currentPage}
            filter={filter as Filter}
            type="Library"
          />

          <Separator className="mt-10 h-1 rounded-full bg-dark-200/40" />

          <Pagination totalPages={totalPages} />
        </>
      )}
    </main>
  );
}
