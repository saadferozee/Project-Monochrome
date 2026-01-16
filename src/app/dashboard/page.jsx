'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import DashboardHeader from '@/components/DashboardHeader';

const DashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    totalSpent: 0,
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
    cancelled: 0,
    recent: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        fetchAdminStats();
      } else {
        fetchUserStats();
      }
    }
  }, [user]);

  const fetchUserStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/my-bookings`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        const bookings = data.data || [];
        
        setStats({
          totalBookings: bookings.length,
          pendingBookings: bookings.filter(b => b.status === 'pending').length,
          completedBookings: bookings.filter(b => b.status === 'completed').length,
          totalSpent: bookings.reduce((sum, b) => sum + (b.servicePrice || 0), 0)
        });
      }
    } catch (error) {
      console.error('Error fetching user stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAdminStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching admin stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <DashboardHeader 
          title="DASHBOARD" 
          description="Loading..."
        />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-2xl animate-pulse">[LOADING...]</div>
        </div>
      </>
    );
  }

  // Admin Dashboard
  if (user?.role === 'admin') {
    return (
      <>
        <DashboardHeader 
          title="ADMIN DASHBOARD" 
          description="Manage bookings, services, and users"
        />

        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="border border-black/20 dark:border-white/20 bg-white dark:bg-black p-6">
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2 tracking-wider">TOTAL</p>
                <p className="text-3xl font-bold">{stats.total}</p>
              </div>

              <div className="border border-black/20 dark:border-white/20 bg-white dark:bg-black p-6">
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2 tracking-wider">PENDING</p>
                <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-500">{stats.pending}</p>
              </div>

              <div className="border border-black/20 dark:border-white/20 bg-white dark:bg-black p-6">
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2 tracking-wider">IN PROGRESS</p>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-500">{stats.inProgress}</p>
              </div>

              <div className="border border-black/20 dark:border-white/20 bg-white dark:bg-black p-6">
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2 tracking-wider">COMPLETED</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-500">{stats.completed}</p>
              </div>

              <div className="border border-black/20 dark:border-white/20 bg-white dark:bg-black p-6">
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2 tracking-wider">CANCELLED</p>
                <p className="text-3xl font-bold text-red-600 dark:text-red-500">{stats.cancelled}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/dashboard/bookings"
                className="group border border-black/20 dark:border-white/20 bg-white dark:bg-black p-8 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all hover:scale-105"
              >
                <div className="text-4xl mb-4">[📦]</div>
                <h2 className="text-xl font-bold mb-2 tracking-wider">BOOKINGS</h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-300 dark:group-hover:text-zinc-600">
                  Manage all service bookings
                </p>
              </Link>

              <Link
                href="/dashboard/services"
                className="group border border-black/20 dark:border-white/20 bg-white dark:bg-black p-8 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all hover:scale-105"
              >
                <div className="text-4xl mb-4">[🛠️]</div>
                <h2 className="text-xl font-bold mb-2 tracking-wider">SERVICES</h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-300 dark:group-hover:text-zinc-600">
                  Add, edit, or remove services
                </p>
              </Link>

              <Link
                href="/dashboard/users"
                className="group border border-black/20 dark:border-white/20 bg-white dark:bg-black p-8 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all hover:scale-105"
              >
                <div className="text-4xl mb-4">[👥]</div>
                <h2 className="text-xl font-bold mb-2 tracking-wider">USERS</h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-300 dark:group-hover:text-zinc-600">
                  View and manage users
                </p>
              </Link>
            </div>

            <div className="border border-black/20 dark:border-white/20 bg-white dark:bg-black p-6">
              <h2 className="text-xl font-bold mb-6 tracking-wider">RECENT BOOKINGS</h2>
              {stats.recent.length === 0 ? (
                <p className="text-zinc-500 dark:text-zinc-400 text-center py-8">No recent bookings</p>
              ) : (
                <div className="space-y-4">
                  {stats.recent.map((booking) => (
                    <div key={booking._id} className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10 last:border-0">
                      <div className="flex-1">
                        <p className="font-bold text-sm">{booking.serviceName}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          {booking.name} • {booking.email}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`text-xs px-3 py-1 border ${
                          booking.status === 'completed' ? 'border-green-500 text-green-600 dark:text-green-500' :
                          booking.status === 'in-progress' ? 'border-purple-500 text-purple-600 dark:text-purple-500' :
                          booking.status === 'contacted' ? 'border-blue-500 text-blue-600 dark:text-blue-500' :
                          booking.status === 'cancelled' ? 'border-red-500 text-red-600 dark:text-red-500' :
                          'border-yellow-500 text-yellow-600 dark:text-yellow-500'
                        }`}>
                          {booking.status.toUpperCase()}
                        </span>
                        <span className="font-bold text-sm">${booking.servicePrice?.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }

  // User Dashboard
  return (
    <>
      <DashboardHeader 
        title="DASHBOARD" 
        description={`Welcome back, ${user?.name}`}
      />

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="border border-black/20 dark:border-white/20 bg-white dark:bg-black p-6">
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2 tracking-wider">TOTAL BOOKINGS</p>
              <p className="text-3xl font-bold">{stats.totalBookings}</p>
            </div>

            <div className="border border-black/20 dark:border-white/20 bg-white dark:bg-black p-6">
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2 tracking-wider">PENDING</p>
              <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-500">{stats.pendingBookings}</p>
            </div>

            <div className="border border-black/20 dark:border-white/20 bg-white dark:bg-black p-6">
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2 tracking-wider">COMPLETED</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-500">{stats.completedBookings}</p>
            </div>

            <div className="border border-black/20 dark:border-white/20 bg-white dark:bg-black p-6">
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2 tracking-wider">TOTAL SPENT</p>
              <p className="text-3xl font-bold">${stats.totalSpent.toLocaleString()}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/dashboard/stats"
              className="group border border-black/20 dark:border-white/20 bg-white dark:bg-black p-8 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all hover:scale-105"
            >
              <div className="text-4xl mb-4">[📊]</div>
              <h2 className="text-xl font-bold mb-2 tracking-wider">STATISTICS</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-300 dark:group-hover:text-zinc-600">
                View detailed analytics and insights
              </p>
            </Link>

            <Link
              href="/dashboard/orders"
              className="group border border-black/20 dark:border-white/20 bg-white dark:bg-black p-8 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all hover:scale-105"
            >
              <div className="text-4xl mb-4">[📦]</div>
              <h2 className="text-xl font-bold mb-2 tracking-wider">ORDERS</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-300 dark:group-hover:text-zinc-600">
                Manage your service bookings
              </p>
            </Link>

            <Link
              href="/dashboard/payments"
              className="group border border-black/20 dark:border-white/20 bg-white dark:bg-black p-8 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all hover:scale-105"
            >
              <div className="text-4xl mb-4">[💳]</div>
              <h2 className="text-xl font-bold mb-2 tracking-wider">PAYMENTS</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-300 dark:group-hover:text-zinc-600">
                View payment history and invoices
              </p>
            </Link>
          </div>

          <div className="border border-black/20 dark:border-white/20 bg-white dark:bg-black p-6">
            <h2 className="text-xl font-bold mb-4 tracking-wider">QUICK ACTIONS</h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/services"
                className="inline-block bg-black dark:bg-white text-white dark:text-black px-6 py-3 font-bold tracking-wider hover:bg-black/80 dark:hover:bg-white/80 transition-colors text-center"
              >
                [BROWSE SERVICES]
              </Link>
              <Link
                href="/contact"
                className="inline-block border border-black dark:border-white text-black dark:text-white px-6 py-3 font-bold tracking-wider hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors text-center"
              >
                [CONTACT SUPPORT]
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
