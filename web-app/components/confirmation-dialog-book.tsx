import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

type ActionType = 'BORROW' | 'RENEW';

const STYLE_CONFIG: Record<
  ActionType,
  { icon: string; bgColor: string; innerBgColor: string; buttonColor: string }
> = {
  BORROW: {
    icon: '/icons/admin/tick.svg',
    bgColor: 'bg-green-100',
    innerBgColor: 'bg-green-600',
    buttonColor: 'bg-green-600 hover:bg-green-600/90',
  },
  RENEW: {
    icon: '/icons/admin/info.svg',
    bgColor: 'bg-blue-400',
    innerBgColor: 'bg-blue-600',
    buttonColor: 'bg-blue-600 hover:bg-blue-600/90',
  },
};

const TEXT_CONFIG: Record<
  ActionType,
  { title: string; description: string; buttonText: string }
> = {
  BORROW: {
    title: 'Confirm Borrow Request',
    description:
      'You are about to borrow this book. You can cancel your request within 24 hours if needed. After this period, only an administrator can process cancellation requests. If the book is overdue, you can return it, but no renewals are allowed.',
    buttonText: 'Confirm Borrow',
  },
  RENEW: {
    title: 'Confirm Renewal Request',
    description:
      "You're about to renew your borrow request. Note that you can only renew the book if it's due in less than 3 days. If it is overdue, renewal isn't allowed.",
    buttonText: 'Confirm Renewal',
  },
};

type ConfirmationDialogBookProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  type: ActionType;
};

export default function ConfirmationDialogBook({
  open,
  onOpenChange,
  onConfirm,
  type = 'BORROW',
}: Readonly<ConfirmationDialogBookProps>) {
  const { title, description, buttonText } = TEXT_CONFIG[type];

  const actionStyle = STYLE_CONFIG[type];
  const icon = STYLE_CONFIG[type].icon;

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
