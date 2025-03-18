import { Link } from '@/i18n/navigation';

export default function LinkButton({ href }: Readonly<{ href: string }>) {
  return (
    <Link
      href={href}
      className="inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-light-300 px-4 py-2 text-sm font-medium text-primary-admin shadow transition-all duration-300 hover:bg-light-300/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
    >
      View all
    </Link>
  );
}
