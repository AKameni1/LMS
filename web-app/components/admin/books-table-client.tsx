'use client';

import { DataTable } from '@/components/admin/data-table/data-table';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { columns } from './data-table/books-columns';
import { useSearch } from '@/context/search-context';

export default function BooksTableClient({
  books,
}: Readonly<{ books: BookRequest[] }>) {
  const [nameSort, setNameSort] = useState<'asc' | 'desc' | null>(null);
  const { searchTerm } = useSearch();

  const sortedBooks = useMemo(() => {
    const result = books.filter(
      (borrowRequest) =>
        borrowRequest.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        borrowRequest.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        borrowRequest.genre.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    if (nameSort !== null) {
      result.sort((a, b) => {
        if (nameSort === 'asc') {
          return a.title.localeCompare(b.title);
        } else {
          return b.title.localeCompare(a.title);
        }
      });
    }

    return result;
  }, [books, nameSort, searchTerm]);

  const handleNameSort = () => {
    setNameSort((current) => {
      if (current === null || current === 'desc') return 'asc';
      return 'desc';
    });
  };

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All Books</h2>
        <div className="flex gap-2">
          <Button
            className="text-dark-200"
            variant="outline"
            onClick={handleNameSort}
          >
            A-Z
            <Image
              src="/icons/admin/arrow-swap.svg"
              alt="arrow-swap"
              width={16}
              height={16}
            />
          </Button>
          <Button
            className="bg-primary-admin text-white transition-all duration-300 hover:bg-primary-admin/90"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/admin/books/new';
            }}
          >
            + Create a New Book
          </Button>
        </div>
      </div>

      <div className="mt-7 w-full overflow-hidden">
        <DataTable
          columns={columns}
          data={sortedBooks}
          initialSorting={
            nameSort ? [{ id: 'booktitle', desc: nameSort === 'desc' }] : []
          }
        />
      </div>
    </section>
  );
}
