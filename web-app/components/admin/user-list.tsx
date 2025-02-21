import React from 'react';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { getInitials } from '@/lib/utils';
import { getUsersPendingApproval } from '@/lib/actions/admin/users';
import Image from 'next/image';

export default async function UserList() {
  const { success, error, ...users } = await getUsersPendingApproval();
  if (!success && error) {
    return <div className="error">{error}</div>;
  }

  if (
    !users.usersPendingApproval?.length ||
    users.usersPendingApproval?.length === 0
  ) {
    return (
      <div className="flex flex-col items-center justify-center gap-5">
        <Image
          src="/images/account-requests.svg"
          width={200}
          height={200}
          alt="Account Requests"
        />

        <p className="text-base font-semibold text-dark-400">
          No Pending Account Requests
        </p>
        <p className="text-sm text-dark-700">
          There are no account requests awaiting your review at this time
        </p>
      </div>
    );
  }
  return (
    <div className="flex flex-wrap gap-2">
      {users.usersPendingApproval.map((user) => (
        <div key={user.id} className="user-card">
          <Avatar className="size-16">
            <AvatarFallback className="border border-blue-700 bg-blue-400 text-lg font-medium text-light-300">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <h3 className="name">{user.name}</h3>
          <p className="email">{user.email}</p>
        </div>
      ))}
    </div>
  );
}
