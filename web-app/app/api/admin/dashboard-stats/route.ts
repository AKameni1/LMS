import { auth } from '@/auth';
import redis from '@/db/redis';
import {
  getDashboardStats,
  getDashboardStatsLastWeek,
} from '@/lib/actions/admin/users';
import { NextResponse } from 'next/server';

export const GET = auth(async function GET() {
  try {
    const CACHE_KEY = 'dashboard_stats';
    const cachedData = await redis.get<DashboardStatsProps>(CACHE_KEY);
    if (cachedData) {
      return NextResponse.json(cachedData);
    }

    const { success, ...data } = await getDashboardStats();
    const { success: successLastWeek, ...dataLastWeek } =
      await getDashboardStatsLastWeek();

    if (!success || !successLastWeek) {
      throw new Error('Failed to fetch dashboard stats');
    }

    if (!data || !dataLastWeek) {
      throw new Error('Failed to fetch dashboard stats');
    }

    const finalData = {
      totalBooks: data.totalBooks,
      totalUsers: data.totalUsers,
      totalBorrowedBooks: data.totalBorrowedBooks,
      totalBooksChange: data.totalBooks! - dataLastWeek.totalBooksLast!,
      totalUsersChange: data.totalUsers! - dataLastWeek.totalUsersLast!,
      totalBorrowedBooksChange:
        data.totalBorrowedBooks! - dataLastWeek.totalBorrowedBooksLast!,
    };

    await redis.setex(CACHE_KEY, 60 * 60, finalData); // 1 hour

    return NextResponse.json(finalData);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
});
