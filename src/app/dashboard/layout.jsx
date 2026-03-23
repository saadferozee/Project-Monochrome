'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import AdminSidebar from '@/components/AdminSidebar';
import DashboardSidebar from '@/components/DashboardSidebar';

const DashboardLayout = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white dark:bg-black text-black dark:text-white font-mono">
        <div className="text-2xl animate-pulse">[LOADING...]</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center bg-white dark:bg-black text-black dark:text-white font-mono">
        <div className="text-2xl animate-pulse">[REDIRECTING...]</div>
      </div>
    );
  }

  const Sidebar = user.role === 'admin' ? AdminSidebar : DashboardSidebar;

  return (
    <div className="h-screen flex bg-white dark:bg-black text-black dark:text-white font-mono overflow-hidden" suppressHydrationWarning>
      
      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <div className={`fixed inset-y-0 left-0 z-50 md:hidden transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Mobile Top Bar */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-black/20 dark:border-white/20 shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 border border-black/20 dark:border-white/20 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            aria-label="Open menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="text-sm font-bold tracking-wider">&lt;monochrome/&gt;</span>
          <div className="w-9" /> {/* spacer */}
        </div>

        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
