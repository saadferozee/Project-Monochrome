'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import AdminSidebar from '@/components/AdminSidebar';
import DashboardSidebar from '@/components/DashboardSidebar';

const DashboardLayout = ({ children }) => {
  const router = useRouter();
  const { user, loading } = useAuth();

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
    return null;
  }

  return (
    <div className="h-screen flex bg-white dark:bg-black text-black dark:text-white font-mono overflow-hidden" suppressHydrationWarning>
      {user.role === 'admin' ? <AdminSidebar /> : <DashboardSidebar />}
      
      <main className="flex-1 flex flex-col overflow-hidden">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
