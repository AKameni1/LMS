import BookListFilter from '@/components/book-list-filter';
import Pagination from '@/components/pagination';
import Search from '@/components/search';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { fetchBooksPages } from '@/lib/data';
import React from 'react';

export default async function Page(
  props: Readonly<{
    searchParams?: Promise<{
      query?: string;
      page?: string;
    }>;
  }>,
) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query ?? '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchBooksPages(query);

  return (
    <>
      <Search placeholder="Search for books" />

      <div className="mt-12 flex items-center justify-between">
        <h2 className="font-bebas-neue text-4xl text-light-100">
          All Library Books
        </h2>

        <Select>
          <SelectTrigger className="select-trigger">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent className="select-content">
            <SelectItem className="select-item" value="all">
              All
            </SelectItem>
            <SelectItem className="select-item" value="oldest">
              Oldest
            </SelectItem>
            <SelectItem className="select-item" value="newest">
              Newest
            </SelectItem>
            <SelectItem className="select-item" value="available">
              Available
            </SelectItem>
            <SelectItem className="select-item" value="highest_rated">
              Highest Rated
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <BookListFilter query={query} currentPage={currentPage} />

      <Separator className="mt-10 h-[3px] rounded-full bg-dark-200/40" />

      <Pagination totalPages={totalPages} />
    </>
  );
}
