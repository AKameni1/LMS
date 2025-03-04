'use server';

import { db } from '@/db/drizzle';
import redis from '@/db/redis';
import { books, borrowRecords, users } from '@/db/schema';
import { getErrorMessage } from '@/lib/utils';
import { and, eq, lt, not, or } from 'drizzle-orm';
import { sendEmailApprovalAccount } from '../send-emails';

export const updateUser = async (
  userId: string,
  params: {
    role?: UserRole;
    status?: 'APPROVED' | 'REJECTED';
  },
) => {
  try {
    // Check if params contains at least one valid key
    if (!Object.keys(params).length) {
      return {
        success: false,
        error: 'No valid fields to update.',
      };
    }

    const [data] = await db
      .update(users)
      .set(params)
      .where(eq(users.id, userId))
      .returning({
        id: users.id,
        fullName: users.fullName,
        email: users.email,
      });

    if (!data) {
      return {
        success: false,
        error: `User with id ${userId} not found.`,
      };
    }

    if (params.status === 'REJECTED') {
      await db
        .update(borrowRecords)
        .set({ status: 'CANCELLED' })
        .where(eq(borrowRecords.userId, userId));
    }

    if (params.status === 'APPROVED') {
      await sendEmailApprovalAccount({
        studentName: data.fullName,
        studentEmail: data.email,
      });
    }

    await redis.del('dashboard_stats');

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: `Failed to update user. ${getErrorMessage(error)}`,
    };
  }
};

export const getDashboardStats = async () => {
  try {
    const [totalBooks, totalUsers, totalBorrowedBooks] = await Promise.all([
      db.$count(books),
      db.$count(users),
      db.$count(borrowRecords, eq(borrowRecords.status, 'BORROWED')),
    ]);

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
        status: users.status,
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

export const changeUserRole = async (userId: string, role: UserRole) => {
  try {
    // check if it is necessary to update the user's role
    const [user] = await db
      .select({
        role: users.role,
      })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    // if the user's role is already the same as the new role, return
    if (user.role === role) {
      return {
        success: true,
      };
    }

    await db.update(users).set({ role }).where(eq(users.id, userId));
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: `Failed to change user role. ${error}`,
    };
  }
};
