'use client';

import { type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import Image from 'next/image';

export default function ModalForm({
  children,
  className = '',
}: Readonly<{ children: ReactNode; className?: string }>) {
  const router = useRouter();

  function handleOpenChange() {
    router.back();
  }
  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
      <DialogHeader>
        <Button
          variant="ghost"
          className="absolute right-4 top-4 h-4 w-4 p-0 hover:bg-transparent"
          onClick={() => handleOpenChange()}
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
        <DialogTitle className="text-dark-400">Create a new book</DialogTitle>
      </DialogHeader>
      <DialogContent className={className}>{children}</DialogContent>
    </Dialog>
  );
}
