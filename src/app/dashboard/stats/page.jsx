'use client';

import { useEffect, useState } from 'react';
import DashboardHeader from '@/components/DashboardHeader';

const StatsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      fetchBookings();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchBookings = async () => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      setLoading(false);
      return;
    }

    try {
      const user = JSON.parse(userData);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/my-bookings`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setBookings(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusCount = (status) => bookings.filter(b => b.status === status).length;
  const getTotalSpent = () => bookings.reduce((sum, b) => sum + (b.servicePrice || 0), 0);
  const getAverageOrderValue = () => bookings.length === 0 ? 0 : getTotalSpent() / bookings.length;

  return (
    <>
      <DashboardHeader 
        title="STATISTICS" 
        description="Your booking analytics and insights"
      />

      <div className="flex-1 overflow-y-auto p-6">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-2xl animate-pulse">[LOADING...]</div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="border border-black/20 dark:border-white/20 bg-white dark:bg-black p-6">
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2 tracking-wider">TOTAL BOOKINGS</p>
                <p className="text-3xl font-bold">{bookings.length}</p>
              </div>

              <div className="border border-black/20 dark:border-white/20 bg-white dark:bg-black p-6">
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2 tracking-wider">TOTAL SPENT</p>
                <p className="text-3xl font-bold">${getTotalSpent().toLocaleString()}</p>
              </div>

              <div className="border border-black/20 dark:border-white/20 bg-white dark:bg-black p-6">
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2 tracking-wider">AVG ORDER VALUE</p>
                <p className="text-3xl font-bold">${Math.round(getAverageOrderValue()).toLocaleString()}</p>
              </div>

              <div className="border border-black/20 dark:border-white/20 bg-white dark:bg-black p-6">
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2 tracking-wider">COMPLETED</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-500">{getStatusCount('completed')}</p>
              </div>
            </div>

            <div className="border border-black/20 dark:border-white/20 bg-white dark:bg-black p-6">
              <h2 className="text-xl font-bold mb-6 tracking-wider">STATUS BREAKDOWN</h2>
              <div className="space-y-4">
                {['pending', 'contacted', 'in-progress', 'completed', 'cancelled'].map((status) => (
                  <div key={status}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm uppercase">{status.replace('-', ' ')}</span>
                      <span className="text-sm font-bold">{getStatusCount(status)}</span>
                    </div>
                    <div className="h-2 bg-zinc-200 dark:bg-zinc-800">
                      <div 
                        className={`h-full ${
                          status === 'pending' ? 'bg-yellow-500' :
                          status === 'contacted' ? 'bg-blue-500' :
                          status === 'in-progress' ? 'bg-purple-500' :
                          status === 'completed' ? 'bg-green-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${bookings.length > 0 ? (getStatusCount(status) / bookings.length) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-black/20 dark:border-white/20 bg-white dark:bg-black p-6">
              <h2 className="text-xl font-bold mb-6 tracking-wider">RECENT ACTIVITY</h2>
              {bookings.length === 0 ? (
                <p className="text-zinc-500 dark:text-zinc-400 text-center py-8">No bookings yet</p>
              ) : (
                <div className="space-y-4">
                  {bookings.slice(0, 5).map((booking) => (
                    <div key={booking._id} className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10 last:border-0">
                      <div className="flex-1">
                        <p className="font-bold text-sm">{booking.serviceName}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          {new Date(booking.createdAt).toLocaleDateString()}
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
        )}
      </div>
    </>
  );
};

export default StatsPage;
