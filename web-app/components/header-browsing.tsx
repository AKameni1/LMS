'use client';

import { navigationLinks } from '@/constants/index';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

export default function HeaderBrowsing() {
  const pathname = usePathname();
  return (
    <>
      {navigationLinks.map(({ href, label }) => (
        <TooltipProvider key={href}>
          <Tooltip>
            <TooltipTrigger>
              <Link
                href={href}
                className={cn(
                  'cursor-pointer px-2 text-lg capitalize transition-all duration-200 hover:scale-110',
                  pathname === href
                    ? 'text-light-200'
                    : 'text-light-100 hover:text-light-400',
                )}
              >
                {/* <Icon size={24} /> */}
                {label}
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-medium tracking-wide">{label}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </>
  );
}
