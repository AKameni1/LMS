'use client';

import React, { useTransition } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { Loader2Icon, LogOutIcon } from 'lucide-react';
import { signOutComplete } from '@/lib/actions/auth';

export default function SignOutButton() {
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
            className="rounded-full p-2 transition-all duration-300 hover:bg-red-600/50 hover:backdrop-blur-md"
          >
            {isPending ? (
              <Loader2Icon className="animate-spin" color="red" size={24} />
            ) : (
              <LogOutIcon size={24} color="red" />
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
