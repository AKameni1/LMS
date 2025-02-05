import Image from 'next/image';
import { Button } from './ui/button';

type NoResultsProps = {
  searchQuery: string;
  onClear: () => void;
};

export default function NoResults({
  searchQuery,
  onClear,
}: Readonly<NoResultsProps>) {
  return (
    <div className="mt-10 flow-root w-full">
      <h2 className="text-2xl font-semibold text-light-100">
        Search Result for: <span className="text-light-200">{searchQuery}</span>
      </h2>

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

        <Button onClick={onClear} className="not-found-btn">
          Clear Search
        </Button>
      </div>
    </div>
  );
}
