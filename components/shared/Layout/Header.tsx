import Link from 'next/link';
import { Navigation } from './Navigation';
import { MobileNav } from './MobileNav';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-blue-600">Pollitique</div>
          </Link>

          <Navigation />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
