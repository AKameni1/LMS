import BookList from '@/components/book-list';
import Search from '@/components/search';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { db } from '@/db/drizzle';
import { books } from '@/db/schema';
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
  const currentPage = searchParams?.page ?? 1;

  const allBooks = (await db.select().from(books)) as Book[];

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

      <BookList books={allBooks} containerClassName="mt-10" />

      <Separator className="mt-10 h-[3px] rounded-full bg-dark-200/40" />

      <div id="pagination" className="mt-10">
        <Button className="pagination-btn_dark text-light-100">Previous</Button>
        <p className="bg-light-200">1</p>
        <Button className="pagination-btn_dark text-light-100">Next</Button>
        {/* Use pagination-btn_light className for light background when the button is active */}
      </div>
    </>
  );
}
