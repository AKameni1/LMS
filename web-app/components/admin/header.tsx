import { Session } from 'next-auth';
import React from 'react';
import { Input } from '../ui/input';
import Image from 'next/image';

export default function Header({ session }: Readonly<{ session: Session }>) {
  return (
    <header className="admin-header">
      <div>
        <h2 className="text-2xl font-semibold text-dark-400">
          Welcome, {session?.user?.name}
        </h2>
        <p className="text-base text-slate-500">
          Monitor all of users and books here
        </p>
      </div>

      <div className="admin-search">
        <Image
          src={'/icons/admin/search.svg'}
          alt="search-icon"
          className="size-6"
          width={20}
          height={20}
        />
        <Input
          type="search"
          placeholder="Search users, books by title, author, or genre."
          className="admin-search_input"
        />
      </div>
    </header>
  );
}
