'use client';

import { DataTable } from '@/components/admin/data-table/data-table';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { columns } from './data-table/columns-borrow-requests';

export default function BorrowRequestsTableClient({
  borrowRequests,
}: Readonly<{ borrowRequests: BorrowRequestsRow[] }>) {
  const [nameSort, setNameSort] = useState<'asc' | 'desc' | null>(null);

  const sortedBorrowRequests = useMemo(() => {
    if (nameSort === null) return borrowRequests;
    return [...borrowRequests].sort((a, b) => {
      if (nameSort === 'asc') {
        return a.bookTitle.localeCompare(b.bookTitle);
      } else {
        return b.bookTitle.localeCompare(a.bookTitle);
      }
    });
  }, [borrowRequests, nameSort]);

  const handleNameSort = () => {
    setNameSort((current) => {
      if (current === null || current === 'desc') return 'asc';
      return 'desc';
    });
  };

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Borrow Requests</h2>
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
      </div>

      <div className="mt-7 w-full overflow-hidden">
        <DataTable
          columnName="bookTitle"
          placeholder="Filter by title..."
          columns={columns}
          data={sortedBorrowRequests}
          initialSorting={
            nameSort ? [{ id: 'booktitle', desc: nameSort === 'desc' }] : []
          }
        />
      </div>
    </section>
  );
}
