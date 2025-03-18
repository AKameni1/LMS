import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

export const {
  Link,
  redirect: _redirect,
  usePathname,
  useRouter,
  getPathname,
  permanentRedirect,
} = createNavigation(routing);

export const redirect: typeof _redirect = _redirect;
