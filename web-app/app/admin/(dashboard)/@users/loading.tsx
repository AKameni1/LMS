import LinkButton from '@/components/admin/link-button';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="mt-4 flex w-auto flex-1 flex-col space-y-5 rounded-xl bg-white p-5">
      <div className="stat-info">
        <p className="truncate whitespace-nowrap text-lg font-semibold text-dark-400">
          Account Requests
        </p>
        <LinkButton href="/admin/account-requests" />
      </div>

      {/* Users List */}
      <div className="relative">
        <div className="hide-scrollbar max-h-[350px] overflow-auto scroll-smooth">
          <div className="flex gap-3">
            {[...Array(3)].map((_, index) => (
              <div key={index + 1} className='user-card gap-3'>
                <Skeleton className="size-16 bg-gray-200 rounded-full" />
                <Skeleton className='w-20 h-3 bg-gray-200' />
                <Skeleton className='w-20 h-3 bg-gray-200' />
              </div>
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
      </div>
    </div>
  );
}
