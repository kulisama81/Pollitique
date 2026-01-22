'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/politicians', label: 'Politiques' },
  { href: '/articles', label: 'Articles' },
  { href: '/videos', label: 'Vidéos' },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex space-x-8">
      {navLinks.map((link) => {
        const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'text-sm font-medium transition-colors hover:text-blue-600',
              isActive ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700'
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
