import { Session } from 'next-auth';
import React from 'react';

export default function Header({ session }: Readonly<{ session: Session }>) {
  return (
    <header className="admin-header">
      <div className="">
        <h2 className="text-2xl font-semibold text-dark-400">
          Welcome, {session?.user?.name}
        </h2>
        <p className="text-base text-slate-500">
          Monitor all of users and books here
        </p>
      </div>

      {/* <p>Search</p> */}
    </header>
  );
}
