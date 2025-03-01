'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { filterOptions } from '@/constants';
import { useRouter } from 'next/navigation';

export default function FilterSelect({
  initialFilter,
}: Readonly<{ initialFilter: string }>) {
  const router = useRouter();
  let filter = initialFilter ?? 'all';
  if (!filterOptions.some((option) => option.value === filter)) {
    filter = 'all';
  }

  const handleValueChange = (value: string) => {
    router.push(`?filter=${value}`, { scroll: false });
  };

  return (
    <Select defaultValue={filter} onValueChange={handleValueChange}>
      <SelectTrigger className="select-trigger">
        <SelectValue>
          {filterOptions.find((opt) => opt.value === filter)?.label ??
            'Sort By'}
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
