'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const AdminSidebar = ({ onClose }) => {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  const navItems = [
    { path: '/dashboard', label: 'OVERVIEW' },
    { path: '/dashboard/bookings', label: 'BOOKINGS' },
    { path: '/dashboard/services', label: 'SERVICES' },
    { path: '/dashboard/users', label: 'USERS' },
    { path: '/dashboard/asks', label: 'CUSTOMER ASKS' },
  ];

  return (
    <aside className="w-64 h-full border-r border-black/20 dark:border-white/20 bg-white dark:bg-black flex flex-col">
      <div className="p-5 border-b border-black/20 dark:border-white/20 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold tracking-wider hover:opacity-70 transition-opacity">
          &lt;monochrome/&gt;
        </Link>
        {onClose && (
          <button onClick={onClose} className="md:hidden p-1 hover:opacity-70 transition-opacity" aria-label="Close menu">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <div className="px-4 py-3 border-b border-black/20 dark:border-white/20">
        <p className="text-xs opacity-60 tracking-widest px-3 py-1">ADMIN PANEL</p>
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 text-sm font-bold tracking-wider hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
        >
          <span>&#8592;</span>
          <span>BACK TO SITE</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            onClick={onClose}
            className={`flex items-center px-4 py-3 text-sm font-bold tracking-wider transition-colors ${
              isActive(item.path)
                ? 'bg-black dark:bg-white text-white dark:text-black'
                : 'hover:bg-black/10 dark:hover:bg-white/10'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-black/20 dark:border-white/20">
        <Link
          href="/dashboard"
          className="block w-full text-center border border-black dark:border-white px-4 py-2 text-xs font-bold tracking-wider hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
        >
          [USER DASHBOARD]
        </Link>
      </div>
    </aside>
  );
};

export default AdminSidebar;
