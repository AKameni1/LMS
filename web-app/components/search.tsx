'use client';

import Image from 'next/image';
import { Input } from './ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { startTransition, useDeferredValue, useMemo } from 'react';
import { useSearchContext } from '@/context/search-books-context';

export default function Search({
  placeholder,
}: Readonly<{
  placeholder: string;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { inputRef } = useSearchContext();

  const currentQuery = useMemo(
    () => searchParams.get('query') ?? '',
    [searchParams],
  );
  const deferredQuery = useDeferredValue(currentQuery);

  const handleSearch = useDebouncedCallback((term: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      params.set('page', '1');

      if (term) {
        params.set('query', term);
      } else {
        params.delete('query');
      }

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  }, 300);

  return (
    <div className="search">
      <Image
        src={'/icons/search-fill.svg'}
        alt="search-icon"
        className="size-6"
        width={20}
        height={20}
      />
      <Input
        type="search"
        className="search-input bg-transparent"
        placeholder={placeholder}
        defaultValue={deferredQuery}
        onChange={(e) => handleSearch(e.target.value)}
        ref={inputRef}
      />
    </div>
  );
}
