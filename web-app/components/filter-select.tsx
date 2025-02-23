'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { filterOptions } from '@/constants';
import { useEffect, useState, useTransition } from 'react';

export default function FilterSelect({
  initialFilter,
}: Readonly<{ initialFilter: string }>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState(initialFilter);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setFilter(searchParams.get('filter') ?? 'all');
  }, [searchParams]);

  const handleFilterChange = (value: string) => {
    setFilter(value);
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      params.set('page', '1');
      if (value !== 'all') {
        params.set('filter', value);
      } else {
        params.delete('filter'); // Remove the filter query param if 'all' is selected
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <Select
      value={filter}
      onValueChange={handleFilterChange}
      disabled={isPending}
    >
      <SelectTrigger className="select-trigger">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent className="select-content">
        {filterOptions.map(({ value, label }) => (
          <SelectItem key={value} className="select-item" value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
