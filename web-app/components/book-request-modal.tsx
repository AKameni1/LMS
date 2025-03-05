'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useState, type JSX } from 'react';

//#region Data Types

// 📌 Define the props for the `ConfirmationDialog`
interface BaseProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onConfirm?: () => void;
  link?: 'BORROW' | 'RENEW';
}
//#endregion

/**
 * 🛠 **BookRequestModal** - A reusable and highly configurable confirmation dialog component
 * designed to handle various administrative actions such as approving, denying, or providing
 * information about user roles, borrow requests, and account statuses.
 *
 * This component leverages the power of TypeScript to enforce strict type checking and ensure
 * that the appropriate props are passed based on the context (e.g., `BORROW`, `USER`, `ACCOUNT`).
 * It dynamically adjusts its styles and text content based on the provided `link` and `type` props.
 *
 * @param {boolean} [open] - Indicates whether the dialog is open or closed.
 * @param {(open: boolean) => void} [onOpenChange] - Callback function to handle the change in dialog open state.
 * @param {() => void} [onConfirm] - Callback function to handle the confirmation action.
 * @param {LinkType} link - The context of the action (e.g., 'USER', 'BORROW', 'ACCOUNT').
 *
 * @returns {JSX.Element} The rendered confirmation dialog component.
 */
export default function BookRequestModal({
  open,
  onOpenChange,
  onConfirm,
  link = 'BORROW',
}: Readonly<BaseProps>): JSX.Element {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const { title, description, buttonText } = {
    BORROW: {
      title: 'Borrow Request Pending Approval',
      description:
        'Your request for the book is currently being reviewed by the library staff. You will be notified once the request is approved.',
      buttonText: 'Borrow Book',
    },
    RENEW: {
      title: 'Renew Book',
      description: 'Are you sure you want to renew this book?',
      buttonText: 'Renew Book',
    },
  }[link];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-none bg-dark-500 sm:max-w-md">
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
              'bg-green-50/10',
            )}
          >
            <div
              className={cn(
                'flex size-20 items-center justify-center rounded-full',
                'bg-green-500',
              )}
            >
              <Image
                src={'/icons/user.svg'}
                alt={'user icon'}
                width={32}
                height={32}
                className="size-8"
              />
            </div>
          </div>
          <DialogTitle className="text-light-100">{title}</DialogTitle>
          <DialogDescription className="text-center text-light-300">
            {description}
          </DialogDescription>
        </DialogHeader>
        {/* Add the checkbox for terms acceptance */}
        <div className="flex items-center justify-center space-x-2 py-4">
          <Checkbox
            id="terms"
            checked={termsAccepted}
            onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
            className="h-5 w-5 rounded border-gray-300"
          />
          <label
            htmlFor="terms"
            className="cursor-pointer text-xs text-light-200"
          >
            I confirm that I have read and agree to the terms and conditions
          </label>
        </div>

        <Button
          className={cn(
            'h-fit w-full px-8 py-4 text-base font-bold transition-all duration-300',
            !termsAccepted && 'cursor-not-allowed opacity-50',
          )}
          onClick={() => {
            onConfirm?.();
            onOpenChange?.(false);
          }}
          disabled={!termsAccepted}
        >
          {buttonText}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
