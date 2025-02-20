import React from 'react';
import BookCover from '../book-cover';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { getInitials } from '@/lib/utils';
import Image from 'next/image';

export default function RequestList() {
  const requests = [
    {
      id: '9084986f-456c-449b-ae6e-59ef1f26b129',
      bookTitle: 'CSS in Depth',
      coverUrl: '/books/covers/CSS_in_Depth_EDRf7KJ0V.jpg',
      coverColor: '#6c6e94',
      author: 'Keith J. Grant',
      genre: 'Web Development',
      userName: 'Darrell Stewards',
      date: '12/01/24',
      status: 'pending',
    },
    // Add more requests as needed
    {
      id: 'b7a1c8d4-6c8b-4d2b-9f8e-1f2e4b6e8a2a',
      bookTitle: 'HTML and CSS: Design and Build Websites',
      coverUrl:
        '/books/covers/HTML_and_CSS__Design_and_Build_Websites_QOjLRAOI1F.jpg',
      coverColor: '#3a2931',
      author: 'Jon Duckett',
      genre: 'Web Development',
      userName: 'Jane Doe',
      date: '15/01/24',
      status: 'pending',
    },
    {
      id: 'c9d4e8f2-7b8c-4d3b-9f9e-2f3e5b7e9b3b',
      bookTitle: 'System Design Interview',
      coverUrl: '/books/covers/System_Design_Interview_jkLx8Pp3C.jpg',
      coverColor: '#363b63',
      genre: 'System Design',
      author: 'Alex Xu',
      userName: 'John Smith',
      date: '18/01/24',
      status: 'pending',
    },
  ];

  return (
    <div className="space-y-4 divide-y divide-border">
      {requests.length === 0 ? (
        <div className="py-6 text-center text-muted-foreground">
          There are no borrow book requests awaiting your review at this time.
        </div>
      ) : (
        requests.map((request) => (
          <div className="book-stripe" key={request.id}>
            <BookCover
              variant="small"
              coverImage={request.coverUrl}
              coverColor={request.coverColor}
              bookTitle={request.bookTitle}
            />

            <div className="flex-1 space-y-1">
              <h3 className="title">{request.bookTitle}</h3>
              <div className="author">
                <p>By {request.author}</p>
                <span className='text-light-500'>•</span>
                <p>{request.genre}</p>
              </div>
              <div className="user">
                <div className="avatar">
                  <Avatar className="size-6">
                    <AvatarFallback className="bg-amber-100 text-xs font-medium">
                      {getInitials(request.userName ?? 'IN')}
                    </AvatarFallback>
                  </Avatar>
                  <p>{request.userName}</p>
                </div>
                <div className="borrow-date">
                  <Image
                    src="/icons/admin/calendar.svg"
                    width={14}
                    height={14}
                    alt="Calendar"
                  />
                  <p>{request.date}</p>
                </div>
              </div>
            </div>

            <div className="flex h-8 w-8 p-1 drop-shadow-sm items-center justify-center rounded-md bg-white text-dark-400 transition-colors duration-300 group-hover:bg-dark-200/10">
              <Image
                src="/icons/admin/eye.svg"
                width={16}
                height={16}
                alt="View Request"
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
}
