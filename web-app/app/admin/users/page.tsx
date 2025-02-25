import UsersTableClient from '@/components/admin/users-table-client';
import { getAllUsers } from '@/lib/actions/admin/users';

export default async function Page() {
  const { success, error, allUsers } = await getAllUsers();

  if (!success || error) {
    throw new Error(error ?? 'Failed to fetch users');
  }

  if (typeof allUsers === 'undefined') {
    throw new Error('No users found');
  }

  return <UsersTableClient users={allUsers} />;
}
