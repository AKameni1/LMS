import BorrowRequestsTableClient from '@/components/admin/borrow-requests-table-client';
import { fetchBorrowRequests } from '@/lib/actions/admin/book';

export default async function Page() {
  const { success, error, data } = await fetchBorrowRequests();
  if (!success || error) {
    throw new Error(error ?? 'Failed to fetch borrow requests');
  }

  if (typeof data === 'undefined') {
    throw new Error('No borrow requests found');
  }

  // Convert the string dates to Date objects
  const borrowRequests = data.map((row) => ({
    ...row,
    borrowedDate: new Date(row.borrowedDate!),
    dueDate: new Date(row.dueDate),
    returnDate: row.returnDate ? new Date(row.returnDate) : null,
  }));

  return <BorrowRequestsTableClient borrowRequests={borrowRequests} />;
}
