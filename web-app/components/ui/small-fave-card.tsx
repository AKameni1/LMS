'use client';

import { type ReactNode, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface ScrollAreaProps {
  children: ReactNode;
  className?: string;
}

export function ScrollArea({ children, className }: Readonly<ScrollAreaProps>) {
  const [hasScroll, setHasScroll] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkScroll = () => {
      if (contentRef.current) {
        const hasVerticalScroll =
          contentRef.current.scrollHeight > contentRef.current.clientHeight;
        setHasScroll(hasVerticalScroll);
      }
    };

    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  return (
    <div className="relative">
      <div
        ref={contentRef}
        className={cn('hide-scrollbar overflow-auto scroll-smooth', className)}
      >
        {children}
      </div>
      {hasScroll && (
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-50 h-20 bg-gradient-to-t from-background to-transparent" />
      )}
    </div>
  );
}
