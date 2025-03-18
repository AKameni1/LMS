'use client';

import { useRouter } from '@/i18n/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { filterOptions } from '@/constants';
import { formUrlQuery, removeKeysFromUrlQuery } from '@/lib/url';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function FilterSelect({
  initialFilter,
}: Readonly<{ initialFilter: string }>) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlFilter = searchParams.get('filter');

  const [active, setActive] = useState(urlFilter ?? 'all');

  const filter =
    (filterOptions.some((option) => option.value === urlFilter)
      ? urlFilter
      : initialFilter) ?? 'all';

  const handleValueChange = (value: string) => {
    let newUrl = '';

    if (value === active) {
      setActive('all');

      newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ['filter'],
      });
    } else {
      setActive(value);

      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'filter',
        value,
      });
    }

    router.push(newUrl, { scroll: false });
  };

  return (
    <Select value={filter} onValueChange={handleValueChange}>
      <SelectTrigger
        className="select-trigger space-x-1"
        aria-label="Filter by"
      >
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
