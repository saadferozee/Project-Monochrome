'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import DashboardHeader from '@/components/DashboardHeader';

const OrdersPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState('');

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
      console.log('Fetching bookings for user:', user.email);
      console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/my-bookings`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);
      
      if (response.ok) {
        setBookings(data.data || []);
        console.log('Bookings loaded:', data.data?.length || 0);
      } else {
        console.error('Failed to fetch bookings:', data.message);
        setError(data.message || 'Failed to load bookings');
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'border-green-500 text-green-600 dark:text-green-500 bg-green-500/10';
      case 'in-progress': return 'border-purple-500 text-purple-600 dark:text-purple-500 bg-purple-500/10';
      case 'contacted': return 'border-blue-500 text-blue-600 dark:text-blue-500 bg-blue-500/10';
      case 'cancelled': return 'border-red-500 text-red-600 dark:text-red-500 bg-red-500/10';
      default: return 'border-yellow-500 text-yellow-600 dark:text-yellow-500 bg-yellow-500/10';
    }
  };

  const filteredBookings = filter === 'all' ? bookings : bookings.filter(b => b.status === filter);

  return (
    <>
      <DashboardHeader 
        title="ORDERS" 
        description="Manage and track your service bookings"
      >
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 text-xs font-bold tracking-wider transition-colors ${
              filter === 'all'
                ? 'bg-black dark:bg-white text-white dark:text-black'
                : 'border border-black/20 dark:border-white/20 hover:bg-black/10 dark:hover:bg-white/10'
            }`}
          >
            ALL ({bookings.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-3 py-1 text-xs font-bold tracking-wider transition-colors ${
              filter === 'pending'
                ? 'bg-black dark:bg-white text-white dark:text-black'
                : 'border border-black/20 dark:border-white/20 hover:bg-black/10 dark:hover:bg-white/10'
            }`}
          >
            PENDING ({bookings.filter(b => b.status === 'pending').length})
          </button>
          <button
            onClick={() => setFilter('in-progress')}
            className={`px-3 py-1 text-xs font-bold tracking-wider transition-colors ${
              filter === 'in-progress'
                ? 'bg-black dark:bg-white text-white dark:text-black'
                : 'border border-black/20 dark:border-white/20 hover:bg-black/10 dark:hover:bg-white/10'
            }`}
          >
            IN PROGRESS ({bookings.filter(b => b.status === 'in-progress').length})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 py-1 text-xs font-bold tracking-wider transition-colors ${
              filter === 'completed'
                ? 'bg-black dark:bg-white text-white dark:text-black'
                : 'border border-black/20 dark:border-white/20 hover:bg-black/10 dark:hover:bg-white/10'
            }`}
          >
            COMPLETED ({bookings.filter(b => b.status === 'completed').length})
          </button>
        </div>
      </DashboardHeader>

      <div className="flex-1 overflow-y-auto p-6">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-2xl animate-pulse">[LOADING...]</div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-xl font-bold mb-4 text-red-600 dark:text-red-500">[ERROR]</p>
              <p className="text-zinc-500 dark:text-zinc-400 mb-6">{error}</p>
              <button
                onClick={fetchBookings}
                className="inline-block bg-black dark:bg-white text-white dark:text-black px-6 py-3 font-bold tracking-wider hover:bg-black/80 dark:hover:bg-white/80 transition-colors"
              >
                [RETRY]
              </button>
            </div>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-xl font-bold mb-4">NO ORDERS FOUND</p>
              <p className="text-zinc-500 dark:text-zinc-400 mb-6">
                {filter === 'all' ? 'You haven&apos;t made any bookings yet' : `No ${filter} orders`}
              </p>
              <Link
                href="/services"
                className="inline-block bg-black dark:bg-white text-white dark:text-black px-6 py-3 font-bold tracking-wider hover:bg-black/80 dark:hover:bg-white/80 transition-colors"
              >
                [BROWSE SERVICES]
              </Link>
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto space-y-4">
            {filteredBookings.map((booking) => (
              <div
                key={booking._id}
                className="border border-black/20 dark:border-white/20 bg-white dark:bg-black p-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-bold">{booking.serviceName}</h3>
                      <span className={`px-3 py-1 text-xs border ${getStatusColor(booking.status)}`}>
                        {booking.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                      <p><span className="font-bold text-black dark:text-white">Order ID:</span> {booking._id}</p>
                      <p><span className="font-bold text-black dark:text-white">Date:</span> {new Date(booking.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      <p><span className="font-bold text-black dark:text-white">Budget:</span> {booking.budget}</p>
                      <p><span className="font-bold text-black dark:text-white">Timeline:</span> {booking.timeline}</p>
                      {booking.company && <p><span className="font-bold text-black dark:text-white">Company:</span> {booking.company}</p>}
                    </div>

                    {booking.projectDescription && (
                      <div className="mt-4 pt-4 border-t border-black/10 dark:border-white/10">
                        <p className="text-sm font-bold mb-2">PROJECT DESCRIPTION:</p>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">{booking.projectDescription}</p>
                      </div>
                    )}

                    {booking.adminNotes && (
                      <div className="mt-4 pt-4 border-t border-black/10 dark:border-white/10">
                        <p className="text-sm font-bold mb-2">ADMIN NOTES:</p>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">{booking.adminNotes}</p>
                      </div>
                    )}
                  </div>

                  <div className="lg:text-right space-y-4">
                    <div>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">PRICE</p>
                      <p className="text-2xl font-bold">${booking.servicePrice?.toLocaleString()}</p>
                    </div>

                    <div className="flex lg:flex-col gap-2">
                      <Link
                        href={`/services/${booking.serviceId?.slug || ''}`}
                        className="flex-1 lg:flex-none text-center border border-black dark:border-white text-black dark:text-white px-4 py-2 text-xs font-bold tracking-wider hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                      >
                        [VIEW SERVICE]
                      </Link>
                      <Link
                        href="/contact"
                        className="flex-1 lg:flex-none text-center border border-black dark:border-white text-black dark:text-white px-4 py-2 text-xs font-bold tracking-wider hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                      >
                        [CONTACT US]
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default OrdersPage;
