'use client';
import { useEffect, useState } from 'react';
import { books } from '@/db/schema';
import { fetchBooksPages } from '@/lib/data';

interface UseFetchBooksPagesResult {
  totalPages: number;
  isLoading: boolean;
  error: string | null;
}

export function useFetchBooksPages(
  query: string,
  filter: Filter,
): UseFetchBooksPagesResult {
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const pages = await fetchBooksPages(
          query.trim(),
          books,
          filter.trim() as Filter,
        );
        setTotalPages(pages);
      } catch (err) {
        setError('Error fetching pages');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query, filter]);

  return { totalPages, isLoading, error };
}
