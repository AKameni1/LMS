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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import config from '@/lib/config';
import { cn, getInitials } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { IKImage } from 'imagekitio-next';
import Image from 'next/image';
import { useState, useTransition } from 'react';
import ConfirmationDialog from '../dialog/confirmation-dialog';
import { useRouter } from '@/i18n/navigation';
import { toast } from 'sonner';
import { updateUser } from '@/lib/actions/admin/users';
import { Loader2Icon } from 'lucide-react';
import SuperAdminDialog from '../dialog/super-admin-dialog';

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
      const { role: initialRole, id } = row.original;

      return <RoleCell initialRole={initialRole} userId={id} />;
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
    accessorKey: 'action',
    header: () => {
      return <span className="text-sm font-medium text-dark-200">Action</span>;
    },
    cell: ({ row }) => {
      const { fullName } = row.original;
      return <ActionCell fullName={fullName} />;
    },
  },
];

export function ActionCell({ fullName }: Readonly<{ fullName: string }>) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>
        <Image
          src={'/icons/admin/trash.svg'}
          width={20}
          height={20}
          alt={`delete user ${fullName}`}
        />
      </button>

      <SuperAdminDialog
        open={open}
        onOpenChange={setOpen}
        onConfirm={() => {
          console.log(`Deleting user ${fullName}`);
        }}
      />
    </>
  );
}

export const ROLES = [
  {
    id: 1,
    role: 'USER',
    value: 'User',
    color: 'bg-pink-50 text-[#C11574]',
  },
  {
    id: 2,
    role: 'ADMIN',
    value: 'Admin',
    color: 'bg-green-100 text-green',
  },
] as const;

export function RoleCell({
  initialRole,
  userId,
}: Readonly<{ initialRole: UserRole; userId: string }>) {
  const [open, setOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const currentRole =
    ROLES.find((role) => role.role === initialRole) ?? ROLES[0];

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            disabled={isPending}
            variant={'link'}
            className={cn(
              'rounded-md px-2.5 text-sm font-medium !no-underline hover:no-underline',
              currentRole.color,
            )}
          >
            {isPending ? (
              <Loader2Icon size={18} className="animate-spin" />
            ) : (
              initialRole[0] + initialRole.slice(1).toLowerCase()
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col gap-2 p-3">
          <div>
            <DropdownMenuLabel>Change Role</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </div>
          {ROLES.map(({ id, role, value, color }) => (
            <DropdownMenuItem
              key={id}
              onClick={() => {
                if (role === initialRole) return;
                setSelectedRole(role);
                setOpen(true);
              }}
              className="flex flex-row items-center justify-between"
            >
              <span
                className={cn(
                  'rounded-md px-2.5 py-0.5 text-sm font-medium',
                  color,
                )}
              >
                {value}
              </span>
              {initialRole === role && (
                <Image
                  src={'/icons/admin/check.svg'}
                  width={20}
                  height={20}
                  alt={`checkmark ${role}`}
                />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {selectedRole && (
        <ConfirmationDialog
          link="USER"
          type={selectedRole === 'USER' ? 'DENY' : 'APPROVE'}
          open={open}
          onOpenChange={(state) => {
            if (!state) setSelectedRole(null);
            setOpen(state);
          }}
          onConfirm={() => {
            // Logic to change the role of a user
            startTransition(async () => {
              try {
                // Update the user role
                console.log(`Changing role to ${selectedRole}`);
                await updateUser(userId, {
                  role: selectedRole,
                });
                router.refresh();
                toast.success('Role updated successfully', {
                  description: `The user role has been marked as ${selectedRole}.`,
                });
              } catch (error) {
                toast.error('Error updating user role', {
                  description:
                    error instanceof Error
                      ? error.message
                      : 'Failed to update user role. Please try again.',
                });
              }
            });
            console.log(`Changing role to ${selectedRole}`);
          }}
        />
      )}
    </>
  );
}
