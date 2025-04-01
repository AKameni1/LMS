'use client';

import {Image} from "react-native"
import {Form} from 'react-native';
import { Input } from './ui/input';
import { usePathname, useRouter, useSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { useSearchContext } from '@/context/search-books-context';
import { formUrlQuery, removeKeysFromUrlQuery } from '@/lib/url';

export default function Search({
  placeholder,
  route,
}: Readonly<{
  placeholder: string;
  route: string;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const { inputRef } = useSearchContext();

  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'query',
          value: searchQuery,
        });

        router.push(newUrl, { scroll: false });
      } else if (pathname === route) {
        const newUrl = removeKeysFromUrlQuery({
          params: searchParams.toString(),
          keysToRemove: ['query'],
        });

        router.push(newUrl, { scroll: false });
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, router, route, searchParams, pathname]);

  return (
    <Form action={route} className="search">
      <Image
        src={'/icons/search-fill.svg'}
        alt="search-icon"
        className="size-6"
        width={20}
        height={20}
      />
      <Input
        type="search"
        name="query"
        aria-label="Search for books"
        className="search-input bg-transparent"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        ref={inputRef}
      />
    </Form>
  );
}
