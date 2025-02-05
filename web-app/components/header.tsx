import { getInitials } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Session } from 'next-auth';
import HeaderBrowsing from './header-browsing';
import SignOutButton from './sign-out-btn';

export default function Header({ session }: Readonly<{ session: Session }>) {

  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/icons/logo.svg"
          className="size-auto"
          alt="bookWise-logo"
          width={40}
          height={40}
        />
        <p className="text-2xl font-semibold text-white max-md:hidden">
          BookWise
        </p>
      </Link>

      <nav className="flex flex-row items-center gap-8">
        <HeaderBrowsing />

        <Link href={'/my-profile'} className="group flex items-center gap-2">
          <Avatar>
            <AvatarFallback className="bg-cyan-400 text-lg font-semibold">
              {getInitials(session?.user?.name ?? 'IN')}
            </AvatarFallback>
          </Avatar>
          {/* Add User Name */}
          <p className="font-semibold text-light-100 transition-all duration-300 group-hover:text-light-100/70">
            {session?.user?.name?.split(' ')[0]}
          </p>
        </Link>

        <SignOutButton />
      </nav>
    </header>
  );
}
