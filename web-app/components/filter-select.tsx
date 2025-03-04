'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { filterOptions } from '@/constants';
import { useRouter, useSearchParams } from 'next/navigation';
import { startTransition } from 'react';

export default function FilterSelect({
  initialFilter,
}: Readonly<{ initialFilter: string }>) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlFilter = searchParams.get('filter');

  const filter =
    (filterOptions.some((option) => option.value === urlFilter)
      ? urlFilter
      : initialFilter) ?? 'all';
  const handleValueChange = (value: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);

      if (value === 'all') {
        params.delete('filter');
      } else {
        params.set('filter', value);
      }

      router.push(`?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <Select value={filter} onValueChange={handleValueChange}>
      <SelectTrigger className="select-trigger space-x-1">
        <SelectValue>
          Filter by:{' '}
          <span className="text-base font-semibold text-light-200">
            {filterOptions.find((opt) => opt.value === filter)?.label ??
              'Sort By'}
          </span>
        </SelectValue>
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
