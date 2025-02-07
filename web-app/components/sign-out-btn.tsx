import { signOut } from '@/auth';
import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { LogOutIcon } from 'lucide-react';

export default function SignOutButton() {
  return (
    <form
      action={async () => {
        'use server';

        await signOut();
      }}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="rounded-full p-2 transition-all duration-300 hover:bg-red-600/50 hover:backdrop-blur-md">
              <LogOutIcon size={24} color="red" />
            </button>
          </TooltipTrigger>
          <TooltipContent className="bg-red-600">
            <p className="font-semibold text-light-100">Sign Out</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </form>
  );
}
