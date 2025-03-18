'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn, getInitials, truncateText } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { useState, useTransition } from 'react';
import ConfirmationDialog from '../dialog/confirmation-dialog';
import BookCover from '@/components/book-cover';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { updateBorrowRequest } from '@/lib/actions/admin/borrow-requests';
import { toast } from 'sonner';
import { useRouter } from '@/i18n/navigation';
import { Loader2Icon } from 'lucide-react';

/**
 * Defines the columns for the data table in the admin panel.
 *
 * @type {ColumnDef<BorrowRequestsRow>[]}
 *
 * @property {ColumnDef<BorrowRequestsRow>} book - Column for the book, includes the book cover and title.
 * @property {ColumnDef<BorrowRequestsRow>} userRequested - Column for the user who requested the book, includes the user's avatar and email.
 * @property {ColumnDef<BorrowRequestsRow>} borrowedDate - Column for the date the book was borrowed.
 * @property {ColumnDef<BorrowRequestsRow>} returnDate - Column for the date the book was returned.
 * @property {ColumnDef<BorrowRequestsRow>} dueDate - Column for the due date of the book.
 * @property {ColumnDef<BorrowRequestsRow>} status - Column for the status of the book request, includes a dropdown menu to change the status.
 * @property {ColumnDef<BorrowRequestsRow>} receipt - Column for the receipt of the book request, includes a button to download the receipt.
 *
 * @returns {ColumnDef<BorrowRequestsRow>[]} The columns for the data table in the admin panel.
 */
export const columns: ColumnDef<BorrowRequestsRow>[] = [
  {
    accessorKey: 'bookTitle',
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          className="text-sm text-dark-200"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Book
        </Button>
      );
    },
    cell: ({ row }) => {
      const { coverColor, coverUrl, bookTitle } = row.original;
      return (
        <div className="flex flex-row items-center gap-2 text-left">
          <BookCover
            coverImage={coverUrl}
            bookTitle={bookTitle}
            variant="extraSmall"
            coverColor={coverColor}
          />
          <div className="flex flex-col items-center justify-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="line-clamp-1 font-medium text-dark-400">
                    {truncateText(bookTitle, 30)}
                  </span>
                </TooltipTrigger>
                <TooltipContent className="bg-light-700 text-dark-400">
                  {bookTitle}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'userRequested',
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          className="text-sm text-dark-200"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          User Requested
        </Button>
      );
    },
    cell: ({ row }) => {
      const { fullName, email } = row.original;
      return (
        <div className="flex flex-row items-center gap-2 overflow-auto text-left">
          <Avatar className="size-10">
            <AvatarFallback className="border border-blue-700 bg-blue-400 text-base font-medium text-blue-950">
              {getInitials(fullName)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="line-clamp-1 font-medium text-dark-400">
              {fullName}
            </span>
            {/* <span className="line-clamp-2 text-sm text-light-500">{email}</span> */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-sm text-light-500">
                    {truncateText(email, 25)}
                  </span>
                </TooltipTrigger>
                <TooltipContent className="bg-light-700 text-dark-400">
                  {email}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'borrowedDate',
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          className="text-sm text-dark-200"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Borrowed Date
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.original.borrowedDate).toLocaleDateString(
        'en-US',
        {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        },
      );
      return <span className="text-sm font-medium text-dark-200">{date}</span>;
    },
  },
  {
    accessorKey: 'returnDate',
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          className="text-sm text-dark-200"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Return Date
        </Button>
      );
    },
    cell: ({ row }) => {
      const { returnDate } = row.original;
      const date = returnDate
        ? new Date(returnDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
        : '---';
      return <span className="text-sm font-medium text-dark-200">{date}</span>;
    },
  },
  {
    accessorKey: 'dueDate',
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          className="text-sm text-dark-200"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Due Date
        </Button>
      );
    },
    cell: ({ row }) => {
      const { dueDate } = row.original;
      if (!dueDate)
        return <span className="text-sm font-medium text-dark-200">---</span>;
      const date = new Date(dueDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
      return <span className="text-sm font-medium text-dark-200">{date}</span>;
    },
  },
  // Add a new column for overdue date here
  {
    accessorKey: 'overdueDate',
    header: () => {
      return <span className="text-sm font-medium text-dark-200">Overdue</span>;
    },
    cell: ({ row }) => {
      const { dueDate, returnDate } = row.original;
      if (!dueDate)
        return <span className="text-sm font-medium text-dark-200">---</span>;
      const due = new Date(dueDate);
      const returned = returnDate ? new Date(returnDate) : new Date();
      const overdue = returned > due;
      const days = Math.floor((returned.getTime() - due.getTime()) / 86400000);
      return (
        <span
          className={cn(
            'text-sm font-medium',
            overdue ? 'text-red-500' : 'text-dark-200',
          )}
        >
          {overdue ? `${days} days` : '---'}
        </span>
      );
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          className="text-sm text-dark-200"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Status
        </Button>
      );
    },
    cell: ({ row }) => {
      const { status, requestId, dueDate } = row.original;

      const isOverdue = dueDate
        ? new Date(dueDate) < new Date() && status === 'BORROWED'
        : false;

      return (
        <BorrowedStatusCell
          initialStatus={status}
          requestId={requestId}
          isOverdue={isOverdue}
        />
      );
    },
  },
  {
    accessorKey: 'receipt',
    header: () => {
      return <span className="text-sm font-medium text-dark-200">Receipt</span>;
    },
    cell: ({ row }) => {
      const { status, bookTitle } = row.original;
      return (
        <a
          href={
            status === 'PENDING' || status === 'CANCELLED'
              ? undefined
              : '/Receipt.pdf'
          }
          download={!(status === 'PENDING' || status === 'CANCELLED')}
          aria-label={`Download book receipt for ${bookTitle}`}
          className={cn(
            'inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-light-300 px-3 py-2 text-sm font-medium text-primary-admin shadow transition-all duration-300 hover:bg-light-300/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
            {
              'hover:bg-light-300/20':
                status !== 'PENDING' && status !== 'CANCELLED',
              'cursor-not-allowed opacity-50':
                status === 'PENDING' || status === 'CANCELLED',
            },
          )}
        >
          <Image
            src="/icons/admin/receipt.svg"
            alt=""
            width={16}
            height={16}
            className="size-4"
          />
          {/* Generate */}
        </a>
      );
    },
  },
];

export const BORROWED_STATUS = [
  {
    id: 1,
    status: 'PENDING',
    value: 'Pending',
    color: 'bg-orange-50 text-[#EB5B00]',
  },
  {
    id: 2,
    status: 'BORROWED',
    value: 'Borrowed',
    color: 'bg-purple-50 text-[#6941C6]',
  },
  {
    id: 3,
    status: 'RETURNED',
    value: 'Returned',
    color: 'bg-blue-50 text-[#026AA2]',
  },
  {
    id: 4,
    status: 'CANCELLED',
    value: 'Cancelled',
    color: 'bg-red-50 text-[#C01048]',
  },
] as const;

const getAllowedStatuses = (currentStatus: BorrowRequestStatus) => {
  const rules: Record<BorrowRequestStatus, BorrowRequestStatus[]> = {
    PENDING: ['BORROWED', 'CANCELLED'],
    BORROWED: ['RETURNED'],
    RETURNED: [],
    CANCELLED: [],
  };
  return BORROWED_STATUS.filter(({ status }) =>
    rules[currentStatus]?.includes(status),
  );
};

const statusActions: Record<
  BorrowRequestStatus,
  (requestId: string, isOverdue?: boolean) => Promise<void>
> = {
  PENDING: async () => { },
  BORROWED: async (requestId) => {
    console.log(`Approving request ${requestId}`);
    await updateBorrowRequest({ requestId, status: 'BORROWED' });
  },
  RETURNED: async (requestId, isOverdue) => {
    console.log(`Returning book for request ${requestId}`);
    await updateBorrowRequest({ requestId, status: 'RETURNED', isOverdue });
  },
  CANCELLED: async (requestId) => {
    console.log(`Rejecting request ${requestId}`);
    await updateBorrowRequest({ requestId, status: 'CANCELLED' });
  },
};

export function BorrowedStatusCell({
  initialStatus,
  requestId,
  isOverdue,
}: Readonly<{
  initialStatus: BorrowRequestStatus;
  requestId: string;
  isOverdue: boolean;
}>) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] =
    useState<BorrowRequestStatus | null>(null);

  const [isPending, startTransition] = useTransition();

  const currentStatus =
    BORROWED_STATUS.find((s) => s.status === initialStatus) ??
    BORROWED_STATUS[0];

  const allowedStatuses = getAllowedStatuses(initialStatus);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={'link'}
            className={cn(
              'rounded-md px-2.5 text-sm font-medium !no-underline hover:no-underline',
              currentStatus.color,
            )}
            disabled={allowedStatuses.length === 0}
          >
            {isPending ? (
              <Loader2Icon size={10} className="animate-spin" />
            ) : (
              initialStatus[0] + initialStatus.slice(1).toLowerCase()
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col gap-2 p-3">
          <div>
            <DropdownMenuLabel>Change Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </div>
          {allowedStatuses.map(({ id, status, value, color }) => (
            <DropdownMenuItem
              key={id}
              onClick={() => {
                if (status === initialStatus) return;
                setSelectedStatus(status);
                setOpen(true);
              }}
              className="flex flex-row items-center justify-between"
              disabled={isPending}
            >
              <span
                className={cn(
                  'rounded-md px-2.5 py-0.5 text-sm font-medium',
                  color,
                )}
              >
                {value}
              </span>
              {initialStatus === status && (
                <Image
                  src={'/icons/admin/check.svg'}
                  width={20}
                  height={20}
                  alt={`checkmark ${status}`}
                />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {selectedStatus && (
        <ConfirmationDialog
          open={open}
          onOpenChange={(state) => {
            if (!state) setSelectedStatus(null);
            setOpen(state);
          }}
          onConfirm={() => {
            // Logic to change the status of a borrow request
            if (selectedStatus === null) return;
            startTransition(async () => {
              try {
                await statusActions[selectedStatus](requestId, isOverdue);
                router.refresh();
                toast.success('Status updated successfully', {
                  description: `The borrow request has been marked as ${selectedStatus}.`,
                });
              } catch (error) {
                toast.error('Error updating status', {
                  description:
                    error instanceof Error
                      ? error.message
                      : 'Failed to update borrow request. Please try again.',
                });
              }
            });
          }}
          link="BORROW"
          initialStatus={selectedStatus}
        />
      )}
    </>
  );
}
