'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { JSX } from 'react';

export default function SuperAdminDialog({
  open,
  onOpenChange,
  onConfirm,
}: Readonly<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}>): JSX.Element {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-col items-center space-y-4 text-center">
          <Button
            variant="ghost"
            className="absolute right-4 top-4 h-4 w-4 p-0 hover:bg-transparent"
            onClick={() => onOpenChange?.(false)}
            aria-label="Close dialog"
          >
            <Image
              src="/icons/admin/close.svg"
              alt="Close"
              width={24}
              height={24}
              className="size-6"
            />
          </Button>
          <div
            className={cn(
              'flex size-28 items-center justify-center rounded-full',
              'bg-gray-400',
            )}
          >
            <div
              className={cn(
                'flex size-20 items-center justify-center rounded-full',
                'bg-gray-700',
              )}
            >
              <Image
                src={'/icons/admin/info.svg'}
                alt={'INFO'}
                width={32}
                height={32}
                className="size-8"
              />
            </div>
          </div>
          <DialogTitle className="text-dark-400">
            Super Admin Confirmation
          </DialogTitle>
          <DialogDescription className="text-center">
            Only a super admin can perform this action. You are about to perform
            an action that requires super admin privileges. You have to confirm
            that you are a super admin to proceed.
          </DialogDescription>
        </DialogHeader>

        <Button
          className={cn(
            'h-fit w-full bg-gray-700 px-8 py-4 text-base font-bold text-light-800 transition-all duration-300 hover:bg-slate-800',
          )}
          onClick={() => {
            onConfirm?.();
            onOpenChange?.(false);
          }}
        >
          Confirm
        </Button>
      </DialogContent>
    </Dialog>
  );
}
