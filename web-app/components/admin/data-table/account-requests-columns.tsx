'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import config from '@/lib/config';
import { cn, getInitials } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { IKImage } from 'imagekitio-next';
import Image from 'next/image';
import ConfirmationDialog from '../dialog/confirmation-dialog';
import { useState } from 'react';

/**
 * Defines the columns for the data table in the admin panel.
 *
 * @type {ColumnDef<UserRow>[]}
 *
 * @property {ColumnDef<UserRow>} fullName - Column for the user's full name, includes an avatar and email.
 * @property {ColumnDef<UserRow>} dateJoined - Column for the date the user joined.
 * @property {ColumnDef<UserRow>} role - Column for the user's role, includes a dropdown menu to change the role.
 * @property {ColumnDef<UserRow>} booksBorrowed - Column for the number of books borrowed by the user.
 * @property {ColumnDef<UserRow>} universityId - Column for the user's university ID number.
 * @property {ColumnDef<UserRow>} universityCard - Column for the user's university ID card, includes a dialog to share the card.
 * @property {ColumnDef<UserRow>} actions - Column for the actions that can be performed on the user.
 */
export const columns: ColumnDef<UserRow>[] = [
  {
    accessorKey: 'fullName',
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          className="text-sm text-dark-200"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
        </Button>
      );
    },
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex flex-row items-center gap-2 overflow-auto text-left">
          <Avatar className="size-10">
            <AvatarFallback className="border border-blue-700 bg-blue-400 text-base font-medium text-blue-950">
              {getInitials(user.fullName)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="truncate font-medium text-dark-400">
              {user.fullName}
            </span>
            <span className="truncate text-sm text-light-500">
              {user.email}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'dateJoined',
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          className="text-sm text-dark-200"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Date Joined
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.original.dateJoined).toLocaleDateString(
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
    accessorKey: 'universityId',
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          className="text-sm text-dark-200"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          University ID No
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="text-sm font-medium text-dark-200">
          {row.original.universityId}
        </span>
      );
    },
  },
  {
    accessorKey: 'universityCard',
    header: () => {
      return (
        <span className="text-sm font-medium text-dark-200">
          University ID Card
        </span>
      );
    },
    cell: ({ row }) => {
      const { universityCard, fullName } = row.original;
      return (
        <Dialog>
          <DialogTrigger asChild>
            <button className="group flex flex-row items-center gap-1.5 text-sm font-medium tracking-tight text-blue-100 transition-all duration-300 hover:brightness-125 hover:filter">
              View ID Card
              <Image
                className="transition-all duration-200 group-hover:-translate-y-[0.125rem] group-hover:translate-x-[0.125rem]"
                src={'/icons/admin/link.svg'}
                width={16}
                height={16}
                alt={`link for university card of ${fullName}`}
              />
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-dark-400">
                University ID Card
              </DialogTitle>
              <DialogDescription>
                Here is the university ID card for {fullName}.
              </DialogDescription>
            </DialogHeader>
            <div className="space-x-2">
              <IKImage
                path={universityCard}
                urlEndpoint={config.env.imageKit.urlEndpoint}
                width={486}
                height={287}
                className="rounded-md"
                alt={'university card'}
                loading={'eager'}
                // lqip={{ active: true }}
              />
            </div>
          </DialogContent>
        </Dialog>
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
      const { status } = row.original;
      return (
        <span className="text-sm font-medium text-dark-200">{status}</span>
      );
    },
  },
  {
    accessorKey: 'actions',
    header: () => {
      return <span className="text-sm font-medium text-dark-200">Actions</span>;
    },
    cell: ({ row }) => {
      const { status } = row.original;
      if (!status) return null;
      return <ActionCell status={status} />;
    },
  },
];

export function ActionCell({
  status,
}: Readonly<{
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}>) {
  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<typeof status | null>(
    null,
  );
  return (
    <>
      <Button
        variant="link"
        className={cn(
          'rounded-md px-2.5 text-sm font-medium !no-underline hover:no-underline',
          {
            'bg-green-100 text-green': status !== 'APPROVED',
            'bg-red-100 text-red':
              status !== 'PENDING' && status !== 'REJECTED',
          },
        )}
        onClick={() => {
          setSelectedStatus(status !== 'APPROVED' ? 'APPROVED' : 'PENDING');
          setOpen(true);
        }}
      >
        {status !== 'APPROVED' ? 'Approve Account' : 'Revoke Account'}
      </Button>

      {selectedStatus && (
        <ConfirmationDialog
          link="ACCOUNT"
          type={selectedStatus !== 'APPROVED' ? 'DENY' : 'APPROVE'}
          open={open}
          onOpenChange={(state) => {
            if (!state) setSelectedStatus(null);
            setOpen(state);
          }}
          onConfirm={() => {
            // Logic to change the status of a user
            console.log(`Changing status to ${selectedStatus}`);
          }}
        />
      )}
    </>
  );
}
