'use server';

import { db } from '@/db/drizzle';
import { books, borrowRecords, users } from '@/db/schema';
import { and, eq, lt, not, or } from 'drizzle-orm';

export const getDashboardStats = async () => {
  try {
    const [totalBooks, totalUsers, totalBorrowedBooks] = await Promise.all([
      db.$count(books),
      db.$count(users),
      db.$count(borrowRecords, eq(borrowRecords.status, 'BORROWED')),
    ]);

    console.log(totalBooks, totalUsers, totalBorrowedBooks);

    return {
      success: true,
      totalBooks: totalBooks || 0,
      totalUsers: totalUsers || 0,
      totalBorrowedBooks: totalBorrowedBooks || 0,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: `Failed to fetch dashboard stats. ${error instanceof Error ? error.message : error}`,
    };
  }
};

export const getDashboardStatsLastWeek = async () => {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const [totalBooksLast, totalUsersLast, totalBorrowedBooksLast] =
      await Promise.all([
        // Recover the number of books present before last week
        db.$count(books, lt(books.createdAt, oneWeekAgo)),
        // Recover the number of users present before last week
        db.$count(users, lt(users.createdAt, oneWeekAgo)),
        // Recover the number of borrowed books before last week
        db.$count(
          borrowRecords,
          and(
            eq(borrowRecords.status, 'BORROWED'),
            lt(borrowRecords.createdAt, oneWeekAgo),
          ),
        ),
      ]);

    // Log the results
    console.log(totalBooksLast, totalUsersLast, totalBorrowedBooksLast);

    return {
      success: true,
      totalBooksLast,
      totalUsersLast,
      totalBorrowedBooksLast,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: `Failed to fetch last week stats. ${error}`,
    };
  }
};

export const getUsersPendingApproval = async () => {
  try {
    const usersPendingApproval = await db
      .select({
        id: users.id,
        name: users.fullName,
        email: users.email,
      })
      .from(users)
      .where(eq(users.status, 'PENDING'));

    return {
      success: true,
      usersPendingApproval,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: `Failed to fetch users pending approval. ${error}`,
    };
  }
};

export const getAllUsers = async () => {
  try {
    const allUsers = (await db
      .select({
        id: users.id,
        fullName: users.fullName,
        email: users.email,
        dateJoined: users.createdAt,
        role: users.role,
        booksBorrowed: db.$count(
          borrowRecords,
          eq(borrowRecords.userId, users.id),
        ),
        universityId: users.universityId,
        universityCard: users.universityCard,
      })
      .from(users)
      .innerJoin(
        borrowRecords,
        or(
          eq(borrowRecords.userId, users.id),
          not(eq(borrowRecords.userId, users.id)),
        ),
      )
      .groupBy(users.id)
      .limit(100)) as UserRow[];

    return {
      success: true,
      allUsers,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: `Failed to fetch all users. ${error}`,
    };
  }
};
