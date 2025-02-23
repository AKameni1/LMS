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

export default function FilterSelect() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleFilterChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (value !== 'all') {
      params.set('filter', value);
    } else {
      params.delete('filter'); // Remove the filter query param if 'all' is selected
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <Select
      defaultValue={searchParams.get('filter') ?? 'all'}
      onValueChange={handleFilterChange}
    >
      <SelectTrigger className="select-trigger">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent className="select-content">
        {filterOptions.map(({ value, label }) => (
          <SelectItem key={value} className="select-item" value={value}>
            <button onClick={() => router.push(`?filter=${value}`)}>
              {label}
            </button>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
