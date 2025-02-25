'use client';

import React, { useTransition } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { Loader2Icon } from 'lucide-react';
import { signOutComplete } from '@/lib/actions/auth';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function SignOutButton({
  className,
}: Readonly<{ className?: string }>) {
  const [isPending, startTransition] = useTransition();

  const handleAction = () => {
    startTransition(async () => {
      await signOutComplete();
    });
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={handleAction}
            disabled={isPending}
            className={cn(className)}
          >
            {isPending ? (
              <Loader2Icon className="animate-spin" color="red" size={24} />
            ) : (
              <Image
                src="/icons/logout.svg"
                alt="Logout"
                width={24}
                height={24}
                onClick={() => {
                  window.location.href = '/api/auth/signout';
                }}
              />
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent className="bg-red-600">
          <p className="font-semibold text-light-100">Sign Out</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
