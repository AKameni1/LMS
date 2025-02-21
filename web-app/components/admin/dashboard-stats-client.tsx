'use client';

import { useQuery } from '@tanstack/react-query';
import StatCard from './stat-card';
import config from '@/lib/config';

export default function DashboardStatsClient({
  initialData,
}: Readonly<DashboardStatsClientProps>) {
  const {
    data: stats,
    isLoading,
    error,
  } = useQuery<DashboardStatsProps>({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const res = await fetch(
        `${config.env.apiEndpoint}/api/admin/dashboard-stats`,
      );
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    },
    initialData,
    refetchInterval: 1000 * 60 * 5, // 5 minutes
  });

  if (isLoading) {    
    return <p>Loading...</p>;
  }

  if (error) return <p>Erreur lors du chargement des statistiques.</p>;

  const {
    totalBooks,
    totalUsers,
    totalBorrowedBooks,
    totalBooksChange,
    totalUsersChange,
    totalBorrowedBooksChange,
  } = stats;

  return (
    <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <StatCard
        title="Total Books Borrowed"
        value={totalBorrowedBooks}
        color={totalBorrowedBooksChange <= 0 ? 'red' : 'green'}
        valueChange={totalBorrowedBooksChange}
      />

      <StatCard
        title="Total Users"
        value={totalUsers}
        color={totalUsersChange <= 0 ? 'red' : 'green'}
        valueChange={totalUsersChange}
      />

      <StatCard
        title="Total Books"
        value={totalBooks}
        color={totalBooksChange <= 0 ? 'red' : 'green'}
        valueChange={totalBooksChange}
      />
    </div>
  );
}
