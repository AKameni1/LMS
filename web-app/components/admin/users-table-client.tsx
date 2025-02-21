'use client';

import { columns } from '@/components/admin/data-table/columns';
import { DataTable } from '@/components/admin/data-table/data-table';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useMemo, useState } from 'react';

export default function UsersTableClient({
  users,
}: Readonly<{ users: UserRow[] }>) {
  const [nameSort, setNameSort] = useState<'asc' | 'desc' | null>(null);

  const sortedUsers = useMemo(() => {
    if (nameSort === null) return users;
    return [...users].sort((a, b) => {
      if (nameSort === 'asc') {
        return a.fullName.localeCompare(b.fullName);
      } else {
        return b.fullName.localeCompare(a.fullName);
      }
    });
  }, [users, nameSort]);

  const handleNameSort = () => {
    setNameSort((current) => {
      if (current === null || current === 'desc') return 'asc';
      return 'desc';
    });
  };

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All Users</h2>
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
          data={sortedUsers}
          initialSorting={
            nameSort ? [{ id: 'fullName', desc: nameSort === 'desc' }] : []
          }
        />
      </div>
    </section>
  );
}
