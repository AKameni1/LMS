'use client';

import Image from 'next/image';
import { Button } from './ui/button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function NoResults() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleClearSearch = () => {
    // Clear the search query
    const params = new URLSearchParams(searchParams);
    params.delete('query');
    router.push(`${pathname}?${params.toString()}`);
    router.refresh();
  };
  return (
    <div className="mt-10 flow-root">
      <div id="not-found" className="mt-10">
        <Image
          src={'/images/no-books.png'}
          alt="No books found"
          width={300}
          height={300}
        />

        <h4>No Results Found</h4>
        <p>
          We couldn&apos;t find any books matching your search. Try using
          different keywords or check for typos.
        </p>

        <Button className="not-found-btn" onClick={handleClearSearch}>
          Clear Search
        </Button>
      </div>
    </div>
  );
}
