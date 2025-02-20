import React from 'react';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { getInitials } from '@/lib/utils';

export default function UserList() {
  const users = [
    {
      id: 1,
      name: 'Marc Atenson',
      email: 'marcnine@gmail.com',
    },
    {
      id: 2,
      name: 'Susan Drake',
      email: 'contact@susandrake.com',
    },
    {
      id: 3,
      name: 'Ronald Richards',
      email: 'ronaldrichard@gmail.com',
    },
    // Add more users as needed
  ];
  return (
    <div className="flex flex-wrap gap-4">
      {users.map((user) => (
        <div key={user.id} className="user-card">
          <Avatar className="size-16">
            <AvatarFallback className="bg-amber-100 border-yellow-300 border text-[#998200] text-lg font-medium">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <h3 className="name">{user.name}</h3>
          <p className="email">{user.email}</p>
        </div>
      ))}
    </div>
  );
}
