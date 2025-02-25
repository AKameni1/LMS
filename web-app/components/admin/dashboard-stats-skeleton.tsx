import { Skeleton } from '../ui/skeleton';

export default function DashboardStatsSkeleton() {
  return (
    <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(3)].map((_, index) => (
        <div className="stat" key={index + 1}>
          <div className="stat-info">
            <Skeleton className="mb-2 h-4 w-20 bg-gray-200" />
            <div className="flex items-center justify-center gap-1">
              <Skeleton className="h-4 w-4 rounded-full bg-gray-200" />
              <Skeleton className="h-4 w-8 bg-gray-200" />
            </div>
          </div>
          <Skeleton className="h-8 w-16 bg-gray-200" />
        </div>
      ))}
    </div>
  );
}
