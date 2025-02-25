'use client';

import { DataTable } from '@/components/admin/data-table/data-table';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { columns } from './data-table/borrow-requests-columns';
import { useSearch } from '@/context/search-context';

export default function BorrowRequestsTableClient({
  borrowRequests,
}: Readonly<{ borrowRequests: BorrowRequestsRow[] }>) {
  const [nameSort, setNameSort] = useState<'asc' | 'desc' | null>(null);
  const { searchTerm } = useSearch();

  const sortedBorrowRequests = useMemo(() => {
    const result = borrowRequests.filter(
      (borrowRequest) =>
        borrowRequest.bookTitle
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        borrowRequest.fullName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        borrowRequest.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        borrowRequest.status.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    if (nameSort !== null) {
      result.sort((a, b) => {
        if (nameSort === 'asc') {
          return a.fullName.localeCompare(b.fullName);
        } else {
          return b.fullName.localeCompare(a.fullName);
        }
      });
    }

    return result;
  }, [borrowRequests, nameSort, searchTerm]);

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
