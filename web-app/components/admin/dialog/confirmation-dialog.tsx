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

//#region Data Types
// Define the types used in the `ConfirmationDialog` component
type ActionType = 'APPROVE' | 'DENY' | 'INFO';
type LinkType = 'USER' | 'BORROW' | 'ACCOUNT';

// 🎨 Configure the styles for `BORROW` status
const BORROW_STATUS_STYLES: Record<
  BorrowRequestStatus,
  { bgColor: string; innerBgColor: string; buttonColor: string }
> = {
  PENDING: {
    bgColor: 'bg-orange-50',
    innerBgColor: 'bg-[#EB5B00]',
    buttonColor: 'bg-[#EB5B00] hover:bg-[#EB5B00]/90',
  },
  BORROWED: {
    bgColor: 'bg-purple-50',
    innerBgColor: 'bg-[#6941C6]',
    buttonColor: 'bg-[#6941C6] hover:bg-[#6941C6]/90',
  },
  RETURNED: {
    bgColor: 'bg-blue-50',
    innerBgColor: 'bg-[#026AA2]',
    buttonColor: 'bg-[#026AA2] hover:bg-[#026AA2]/90',
  },
  REJECTED: {
    bgColor: 'bg-red-50',
    innerBgColor: 'bg-[#C01048]',
    buttonColor: 'bg-[#C01048] hover:bg-[#C01048]/90',
  },
};

// 🎨 Configuration of general styles for `USER` and `ACCOUNT`
const STYLE_CONFIG: Record<
  ActionType,
  { icon: string; bgColor: string; innerBgColor: string; buttonColor: string }
> = {
  APPROVE: {
    icon: '/icons/admin/tick.svg',
    bgColor: 'bg-green-100',
    innerBgColor: 'bg-green-600',
    buttonColor: 'bg-green-600 hover:bg-green-600/90',
  },
  DENY: {
    icon: '/icons/admin/info.svg',
    bgColor: 'bg-red-100',
    innerBgColor: 'bg-red-600',
    buttonColor: 'bg-red-600 hover:bg-red-600/90',
  },
  INFO: {
    icon: '/icons/admin/info.svg',
    bgColor: 'bg-blue-300',
    innerBgColor: 'bg-blue-100',
    buttonColor: 'bg-blue-600 hover:bg-blue-600/90',
  },
};

// 📝 Configurations of text based on `link` and `type
const TEXT_CONFIG: Record<
  Exclude<LinkType, 'BORROW'>,
  Record<ActionType, { title: string; description: string; buttonText: string }>
> = {
  USER: {
    APPROVE: {
      title: 'Promote User to Admin',
      description:
        'Grant this user admin privileges, allowing them to manage system settings and user roles effectively.',
      buttonText: 'Confirm Promotion',
    },
    DENY: {
      title: 'Demote Admin to User',
      description:
        "Revoke this user's admin access, limiting their permissions and restricting access to administrative features.",
      buttonText: 'Confirm Demotion',
    },
    INFO: {
      title: 'User Role Change',
      description:
        "Modify this user's role, adjusting their access level and permissions within the system as needed.",
      buttonText: 'Change Role',
    },
  },
  ACCOUNT: {
    APPROVE: {
      title: 'Approve Account Request',
      description:
        'Grant full system access to this user, enabling them to use all available platform features.',
      buttonText: 'Approve & Activate',
    },
    DENY: {
      title: 'Deny Account Request',
      description:
        'Reject this account request and inform the user that they do not meet access requirements.',
      buttonText: 'Deny & Notify',
    },
    INFO: {
      title: 'Account Status Update',
      description:
        "Adjust the user's account status, modifying their access rights based on system policies.",
      buttonText: 'Update Account',
    },
  },
};

// 📝 Configuration of text based on `BORROW` status
const BORROW_TEXT_CONFIG: Record<
  BorrowRequestStatus,
  { title: string; description: string; buttonText: string }
> = {
  PENDING: {
    title: 'Approve Pending Request',
    description:
      'Allow the student to borrow this book by approving their pending request.',
    buttonText: 'Approve Request',
  },
  BORROWED: {
    title: 'Mark as Borrowed',
    description: 'Confirm that this book has been borrowed by the student.',
    buttonText: 'Confirm Borrowing',
  },
  RETURNED: {
    title: 'Confirm Book Return',
    description:
      'Verify that the student has returned the borrowed book in good condition.',
    buttonText: 'Confirm Return',
  },
  REJECTED: {
    title: 'Reject Borrow Request',
    description:
      "Deny the student's borrow request and notify them of the rejection.",
    buttonText: 'Reject Request',
  },
};

// 📌 Define the props for the `ConfirmationDialog`
interface BaseProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onConfirm?: () => void;
}

interface BorrowProps extends BaseProps {
  link: 'BORROW';
  type?: never; // ❌ Impossible when `link === 'BORROW'`
  initialStatus: BorrowRequestStatus; // 🛑 Must be provided when `link === 'BORROW'`
}

interface UserAccountProps extends BaseProps {
  link: 'USER' | 'ACCOUNT';
  type: ActionType; // ✅ Required when `link !== 'BORROW'`
  initialStatus?: never; // ❌ Impossible when `link !== 'BORROW'`
}

// Union of all possible props
type ConfirmationDialogProps = BorrowProps | UserAccountProps;

//#endregion

/**
 * 🛠 **ConfirmationDialog** - A reusable and highly configurable confirmation dialog component
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
 * @param {ActionType} [type='INFO'] - The type of action being confirmed (e.g., 'APPROVE', 'DENY', 'INFO').
 * @param {LinkType} link - The context of the action (e.g., 'USER', 'BORROW', 'ACCOUNT').
 * @param {BorrowRequestStatus} [initialStatus] - The initial status of the borrow request, required when `link` is 'BORROW'.
 *
 * @returns {JSX.Element} The rendered confirmation dialog component.
 */
export default function ConfirmationDialog({
  open,
  onOpenChange,
  onConfirm,
  type = 'INFO',
  link,
  initialStatus,
}: Readonly<ConfirmationDialogProps>): JSX.Element {
  // 📌 Recover the action text based on `link` and `type`
  const { title, description, buttonText } =
    link === 'BORROW'
      ? BORROW_TEXT_CONFIG[initialStatus]
      : TEXT_CONFIG[link][type];

  const actionStyle =
    link === 'BORROW'
      ? BORROW_STATUS_STYLES[initialStatus]
      : STYLE_CONFIG[type];
  const icon =
    link !== 'BORROW' ? STYLE_CONFIG[type].icon : '/icons/admin/info.svg';

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
              actionStyle.bgColor,
            )}
          >
            <div
              className={cn(
                'flex size-20 items-center justify-center rounded-full',
                actionStyle.innerBgColor,
              )}
            >
              <Image
                src={icon}
                alt={type}
                width={32}
                height={32}
                className="size-8"
              />
            </div>
          </div>
          <DialogTitle className="text-dark-400">{title}</DialogTitle>
          <DialogDescription className="text-center">
            {description}
          </DialogDescription>
        </DialogHeader>
        <Button
          className={cn(
            'h-fit w-full px-8 py-4 text-base font-bold text-light-800 transition-all duration-300',
            actionStyle.buttonColor,
          )}
          onClick={() => {
            onConfirm?.();
            onOpenChange?.(false);
          }}
        >
          {buttonText}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
