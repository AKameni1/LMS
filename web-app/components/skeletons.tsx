import { cn } from '@/lib/utils';

export default function BookCardSkeleton({ isLoanedBook = false }) {
  return (
    <li className={cn('w-max list-none', isLoanedBook && 'w-full xs:w-52')}>
      <div
        className={cn(
          'animate-pulse',
          isLoanedBook && 'flex w-full flex-col items-center',
        )}
      >
        <div className="h-40 w-28 rounded-md bg-gray-300"></div>

        <div className={cn('mt-4', !isLoanedBook && 'max-w-28 xs:max-w-40')}>
          <div className="mb-2 h-4 rounded-md bg-gray-300"></div>
          <div className="h-4 rounded-md bg-gray-300"></div>
        </div>

        {isLoanedBook && (
          <div className="mt-3 w-full">
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 rounded-full bg-gray-300"></div>
              <div className="h-4 flex-1 rounded-md bg-gray-300"></div>
            </div>

            <div className="mt-2 h-8 rounded-md bg-gray-300"></div>
          </div>
        )}
      </div>
    </li>
  );
}
