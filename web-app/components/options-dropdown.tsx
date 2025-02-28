'use client';

import { useState, useTransition } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import ConfirmationDialog from './admin/dialog/confirmation-dialog';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { MoreHorizontalIcon } from 'lucide-react';
import { Button } from './ui/button';
import ConfirmationDialogBook from './confirmation-dialog-book';
import {
  renewBorrowRequest,
  updateBorrowRequest,
} from '@/lib/actions/admin/borrow-requests';
import { cn } from '@/lib/utils';

type BorrowActionProps =
  | { type: 'CANCELLED' | 'RETURNED'; requestId: string }
  | { type: 'RENEW'; bookId: string; userId: string; isOverdue: boolean };

const actions = {
  CANCELLED: async (requestId: string) => {
    console.log(`Annulation de l'emprunt ${requestId}`);
    updateBorrowRequest({ requestId, status: 'CANCELLED' });
  },
  RETURNED: async (requestId: string, isOverdue: boolean) => {
    console.log(`Retour du livre pour ${requestId}, retardé : ${isOverdue}`);
    updateBorrowRequest({ requestId, status: 'RETURNED', isOverdue });
  },
  RENEW: async (bookId: string, userId: string) => {
    console.log(`Renouvellement de l'emprunt ${bookId} pour ${userId}`);
    renewBorrowRequest({ bookId, userId });
  },
};

type OptionsDropdownProps = {
  requestId?: string;
  bookId?: string;
  userId?: string;
  isOverdue?: boolean;
  canCancel: boolean;
  canReturn: boolean;
  canRenew: boolean;
};

export default function OptionsDropdown({
  requestId,
  bookId,
  userId,
  isOverdue = false,
  canCancel,
  canReturn,
  canRenew,
}: Readonly<OptionsDropdownProps>) {
  const [open, setOpen] = useState(false);
  const [selectedAction, setSelectedAction] =
    useState<BorrowActionProps | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleActionClick = (action: BorrowActionProps) => {
    setSelectedAction(action);
    setOpen(true);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger disabled={isPending} asChild>
          <Button
            variant="ghost"
            // size="icon"
            disabled={isPending}
            className={cn(
              '-mt-3 mb-2 h-8 w-8 rounded-full hover:bg-slate-700/50',
              'transition-colors duration-200',
              'border border-slate-700/50',
              'text-light-300 hover:text-slate-200',
              { 'cursor-not-allowed opacity-50': isPending },
            )}
            // className="-mt-3 mb-2 bg-slate-800 text-light-300"
          >
            <MoreHorizontalIcon
              size={18}
              className={cn('transition-opacity', {
                'animate-pulse opacity-70': isPending,
              })}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className={cn(
            'w-56 space-y-1',
            'border border-dark-700 bg-dark-800',
            'rounded-lg shadow-lg',
            'animate-in fade-in-0 zoom-in-95',
          )}
        >
          <DropdownMenuLabel className="px-3 py-2 text-sm font-medium text-light-300">
            Borrowing Options
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-dark-700/50" />
          {canCancel && requestId && (
            <DropdownMenuItem
              onClick={() =>
                handleActionClick({ type: 'CANCELLED', requestId })
              }
              disabled={isPending}
              className={cn(
                'cursor-pointer px-3 py-2 text-sm',
                'text-light-400 focus:text-white',
                'focus:bg-dark-700/50',
                'transition-all duration-150',
                'focus:outline-none',
                { 'cursor-not-allowed opacity-50': isPending },
              )}
            >
              ❌ Cancel Borrow Request
            </DropdownMenuItem>
          )}
          {canReturn && requestId && (
            <DropdownMenuItem
              onClick={() => handleActionClick({ type: 'RETURNED', requestId })}
              disabled={isPending}
              className={cn(
                'cursor-pointer px-3 py-2 text-sm',
                'text-light-400 focus:text-white',
                'focus:bg-dark-700/50',
                'transition-all duration-150',
                'focus:outline-none',
                { 'cursor-not-allowed opacity-50': isPending },
              )}
            >
              Return Book
            </DropdownMenuItem>
          )}
          {canRenew && bookId && userId && (
            <DropdownMenuItem
              onClick={() =>
                handleActionClick({ type: 'RENEW', bookId, userId, isOverdue })
              }
              disabled={isPending}
              className={cn(
                'cursor-pointer px-3 py-2 text-sm',
                'text-light-400 focus:text-white',
                'focus:bg-dark-700/50',
                'transition-all duration-150',
                'focus:outline-none',
                { 'cursor-not-allowed opacity-50': isPending },
              )}
            >
              Renew Borrow Request
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {selectedAction &&
        (selectedAction.type === 'CANCELLED' ||
          selectedAction.type === 'RETURNED') && (
          <ConfirmationDialog
            open={open}
            onOpenChange={(state) => {
              if (!state) setSelectedAction(null);
              setOpen(state);
            }}
            onConfirm={() => {
              if (!selectedAction) return;
              startTransition(async () => {
                try {
                  await actions[selectedAction.type](
                    selectedAction.requestId,
                    isOverdue,
                  );
                  router.refresh();
                  toast.success('Status updated successfully', {
                    description: `The borrow request has been marked as ${selectedAction.type}.`,
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
            initialStatus={selectedAction.type}
          />
        )}

      {selectedAction && selectedAction.type === 'RENEW' && (
        <ConfirmationDialogBook
          open={open}
          onOpenChange={(state) => {
            if (!state) setSelectedAction(null);
            setOpen(state);
          }}
          onConfirm={() => {
            startTransition(async () => {
              try {
                await actions[selectedAction.type](
                  selectedAction.bookId,
                  selectedAction.userId,
                );
                router.refresh();
                toast.success('Status updated successfully', {
                  description: `The borrow request has been marked as ${selectedAction.type}.`,
                });
              } catch (error) {
                toast.error('Error renewing book', {
                  description:
                    error instanceof Error
                      ? error.message
                      : 'Failed to renew borrow request. Please try again.',
                });
              }
            });
          }}
          type={selectedAction.type}
        />
      )}
    </>
  );
}
