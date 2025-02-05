'use client';

import Image from 'next/image';
import { Input } from './ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Search({
  placeholder,
}: Readonly<{ placeholder: string }>) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <section className="library">
      <p className="library-subtitle">DISCOVER YOUR NEXT GREAT READ:</p>
      <h1 className="library-title">
        Explore and Search for <span className="text-light-200">Any Book</span>{' '}
        In Our Library
      </h1>

      <div className="search">
        <Image
          src={'/icons/search-fill.svg'}
          alt="search-icon"
          className="size-6"
          width={20}
          height={20}
        />
        <Input
          type="text"
          className="search-input bg-transparent"
          placeholder={placeholder}
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get('query')?.toString()}
        />
      </div>
    </section>
  );
}
