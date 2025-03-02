'use client';

import Image from 'next/image';
import { Button } from './ui/button';
import { useSearchContext } from '@/context/search-books-context';

export default function NoResults() {
  const { clearSearch } = useSearchContext();
  function handleClearSearch() {
    clearSearch();
  }
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
