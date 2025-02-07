'use client';

import { navigationLinks } from '@/constants/index';
import { usePathname } from 'next/navigation';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import Link from 'next/link';
import { cn } from '@/lib/utils';


export default function HeaderBrowsing() {
  const pathname = usePathname();
  return (
    <>
      {navigationLinks.map(({ href, label, icon: Icon }) => (
        <TooltipProvider key={href}>
          <Tooltip>
            <TooltipTrigger>
              <Link
                href={href}
                className={cn(
                  'cursor-pointer text-base capitalize',
                  pathname === href
                    ? 'text-light-200'
                    : 'text-light-100 hover:text-light-400',
                )}
              >
                <Icon size={24} />
                {/* Home */}
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-semibold">{label}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </>
  );
}
