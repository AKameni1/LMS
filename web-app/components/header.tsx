'use client';

import { cn, getInitials } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Session } from 'next-auth';


export default function Header({ session }: Readonly<{ session: Session }>) {
  const pathname = usePathname();

  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/" className='flex items-center gap-2'>
        <Image src="/icons/logo.svg" className='size-auto' alt="bookWise-logo" width={40} height={40} />
        <p className='text-2xl font-semibold text-white max-md:hidden'>BookWise</p>
      </Link>

      <ul className="flex flex-row items-center gap-8">
        <li>
          <Link
            href="/library"
            className={cn(
              'cursor-pointer text-base capitalize',
              pathname === '/library' ? 'text-light-200' : 'text-light-100',
            )}
          >
            Library
          </Link>
        </li>

        <li>
          <Link href={"/my-profile"}>
            <Avatar>
              <AvatarFallback className='bg-amber-100 font-semibold text-lg'>{getInitials(session?.user?.name ?? "IN")}</AvatarFallback>
            </Avatar>
          </Link>
        </li>
      </ul>
    </header>
  );
}
