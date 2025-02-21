import DashboardStats from '@/components/admin/dashboard-stats';
import DashboardStatsSkeleton from '@/components/admin/dashboard-stats-skeleton';
import { Suspense } from 'react';

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardStatsSkeleton />}>
      <DashboardStats />
    </Suspense>
  );
}
