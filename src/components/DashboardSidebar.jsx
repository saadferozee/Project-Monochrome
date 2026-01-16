'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const DashboardSidebar = () => {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  const navItems = [
    { path: '/dashboard', label: 'OVERVIEW', icon: '📊' },
    { path: '/dashboard/stats', label: 'STATISTICS', icon: '📈' },
    { path: '/dashboard/orders', label: 'ORDERS', icon: '📦' },
    { path: '/dashboard/payments', label: 'PAYMENTS', icon: '💳' },
  ];

  return (
    <aside className="w-64 border-r border-black/20 dark:border-white/20 bg-white dark:bg-black flex flex-col">
      <div className="p-6 border-b border-black/20 dark:border-white/20">
        <Link href="/" className="text-xl font-bold tracking-wider hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
          &lt;monochrome/&gt;
        </Link>
      </div>

      <div className="p-4 border-b border-black/20 dark:border-white/20">
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-3 text-sm font-bold tracking-wider text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
        >
          <span className="text-lg">←</span>
          <span>BACK TO SITE</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex items-center gap-3 px-4 py-3 text-sm font-bold tracking-wider transition-colors ${
              isActive(item.path)
                ? 'bg-black dark:bg-white text-white dark:text-black'
                : 'text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-black/20 dark:border-white/20">
        <Link
          href="/services"
          className="block w-full text-center border border-black dark:border-white text-black dark:text-white px-4 py-2 text-xs font-bold tracking-wider hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
        >
          [BROWSE SERVICES]
        </Link>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
