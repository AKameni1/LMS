'use client';

import Image from 'next/image';
import { Input } from './ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({
  placeholder,
}: Readonly<{
  placeholder: string;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, 400);

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
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('query')?.toString() ?? ''}
      />
    </div>
  );
}
