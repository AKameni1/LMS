import React from 'react';
import {
  getDashboardStats,
  getDashboardStatsLastWeek,
} from '@/lib/actions/admin/users';
import { notFound } from 'next/navigation';
import DashboardStatsClient from './dashboard-stats-client';

export default async function DashboardStats() {
  const { success, ...initialDataCurrent } = await getDashboardStats();
  const { success: successLastWeek, ...initialDataLastWeek } =
    await getDashboardStatsLastWeek();

  if (!success || !successLastWeek) {
    return notFound();
  }

  if (!initialDataCurrent || !initialDataLastWeek) {
    return notFound();
  }

  const initialData = {
    totalBooks: initialDataCurrent?.totalBooks ?? 0,
    totalUsers: initialDataCurrent?.totalUsers ?? 0,
    totalBorrowedBooks: initialDataCurrent?.totalBorrowedBooks ?? 0,
    totalBooksChange:
      (initialDataCurrent?.totalBooks ?? 0) -
      (initialDataLastWeek?.totalBooksLast ?? 0),
    totalUsersChange:
      (initialDataCurrent?.totalUsers ?? 0) -
      (initialDataLastWeek?.totalUsersLast ?? 0),
    totalBorrowedBooksChange:
      (initialDataCurrent?.totalBorrowedBooks ?? 0) -
      (initialDataLastWeek?.totalBorrowedBooksLast ?? 0),
  };

  return <DashboardStatsClient initialData={initialData} />;
}
