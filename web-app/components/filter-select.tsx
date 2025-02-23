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
    console.log('UseEffect: FilterSelect rendered');
  }, [searchParams, setFilter]);

  const handleFilterChange = (value: string) => {
    setFilter(value);
    console.log('Entering transition');
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      console.log('Start transition');
      params.set('page', '1');
      console.log('Set page to 1');
      if (value !== 'all') {
        console.log('Set filter to value');
        params.set('filter', value);
      } else {
        console.log('Delete filter');
        params.delete('filter'); // Remove the filter query param if 'all' is selected
      }
      console.log('Pushing to router with params');
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
    console.log('Exiting transition');
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
