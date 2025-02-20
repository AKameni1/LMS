'use client';

import { cn } from '@/lib/utils';
import React from 'react';
import BookCoverSvg from './book-cover-svg';
import { IKImage } from 'imagekitio-next';
import config from '@/lib/config';

type BookCoverVariant = 'extraSmall' | 'small' | 'medium' | 'regular' | 'wide';

const variantStyles: Record<BookCoverVariant, string> = {
  extraSmall: 'book-cover_extra_small',
  small: 'book-cover_small',
  medium: 'book-cover_medium',
  regular: 'book-cover_regular',
  wide: 'book-cover_wide',
};

type BookCoverProps = {
  className?: string;
  coverColor: string;
  coverImage: string;
  variant?: BookCoverVariant;
  bookTitle: string;
};

export default function BookCover({
  className,
  coverColor,
  coverImage,
  variant = 'regular',
  bookTitle,
}: Readonly<BookCoverProps>) {
  return (
    <div
      className={cn(
        'relative transition-all duration-300',
        variantStyles[variant],
        className,
      )}
    >
      <BookCoverSvg coverColor={coverColor} />

      <div
        className="absolute z-10"
        style={{ left: '12%', width: '87.5%', height: '88%' }}
      >
        <IKImage
          path={coverImage}
          urlEndpoint={config.env.imageKit.urlEndpoint}
          fill
          className={cn('rounded-br-sm rounded-tr-sm', {
            'border-b-2 border-black': variant === 'small',
          })}
          alt={bookTitle}
          loading={'eager'}
          // lqip={{ active: true }}
        />
      </div>
    </div>
  );
}
