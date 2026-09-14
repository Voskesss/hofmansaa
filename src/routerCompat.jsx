'use client';

// Compatibiliteitslaag: react-router-dom API's gemapt op Next.js navigatie.
// Via de webpack alias in next.config.mjs vervangt dit bestand 'react-router-dom',
// zodat bestaande componenten ongewijzigd blijven werken.
import React from 'react';
import NextLink from 'next/link';
import {
  useRouter,
  usePathname,
  useSearchParams,
  useParams as useNextParams,
} from 'next/navigation';

export const Link = React.forwardRef(function Link({ to, href, ...props }, ref) {
  return <NextLink ref={ref} href={to ?? href ?? '/'} {...props} />;
});

export { Link as NavLink };

export function useNavigate() {
  const router = useRouter();
  return React.useCallback(
    (to, options) => {
      if (typeof to === 'number') {
        router.back();
        return;
      }
      if (options?.replace) {
        router.replace(to);
      } else {
        router.push(to);
      }
    },
    [router]
  );
}

export function useLocation() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams?.toString();
  return {
    pathname,
    search: search ? `?${search}` : '',
    hash: '',
    state: null,
    key: 'compat',
  };
}

export function useParams() {
  return useNextParams() ?? {};
}

// Niet meer gebruikt onder Next.js, maar aanwezig zodat oude imports niet breken.
export const BrowserRouter = ({ children }) => children;
export const Routes = () => null;
export const Route = () => null;
