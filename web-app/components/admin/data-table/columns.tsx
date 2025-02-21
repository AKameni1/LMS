'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import config from '@/lib/config';
import { getInitials } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { IKImage } from 'imagekitio-next';
import Image from 'next/image';

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
            <AvatarFallback className="border border-blue-700 bg-blue-400 text-lg font-medium text-light-300">
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
    accessorKey: 'role',
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          className="text-sm text-dark-200"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Role
        </Button>
      );
    },
    cell: ({ row }) => {
      const role = row.original.role;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={'link'}
              className={`rounded-md px-2.5 text-sm font-medium !no-underline hover:no-underline ${role === 'USER' ? 'bg-pink-50 text-[#C11574]' : 'bg-green-100 text-green'}`}
            >
              {role[0] + role.slice(1).toLowerCase()}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col gap-3 space-y-2 p-3">
            <div className="flex flex-row items-center justify-between">
              <button className="rounded-md bg-pink-50 px-2.5 py-0.5 text-sm font-medium text-[#C11574]">
                User
              </button>
              {role === 'USER' && (
                <Image
                  src={'/icons/admin/check.svg'}
                  width={16}
                  height={16}
                  alt={'checkmark'}
                />
              )}
            </div>
            <div className="flex flex-row items-center justify-between">
              <button className="rounded-md bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green">
                Admin
              </button>
              {role === 'ADMIN' && (
                <Image
                  src={'/icons/admin/check.svg'}
                  width={16}
                  height={16}
                  alt={'checkmark'}
                />
              )}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: 'booksBorrowed',
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          className="text-sm text-dark-200"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Books Borrowed
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="text-sm font-medium text-dark-200">
          {row.original.booksBorrowed}
        </span>
      );
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
            <button className="flex flex-row items-center gap-1.5 text-sm font-medium tracking-tight text-blue-100">
              View ID Card
              <Image
                src={'/icons/admin/link.svg'}
                width={16}
                height={16}
                alt={`link for university card of ${fullName}`}
              />
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>University ID Card</DialogTitle>
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
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    },
  },
  {
    accessorKey: 'actions',
    header: () => {
      return <span className="text-sm font-medium text-dark-200">Actions</span>;
    },
    cell: ({ row }) => {
      const { fullName } = row.original;
      return (
        <button>
          <Image
            src={'/icons/admin/trash.svg'}
            width={20}
            height={20}
            alt={`delete user ${fullName}`}
          />
        </button>
      );
    },
  },
];
