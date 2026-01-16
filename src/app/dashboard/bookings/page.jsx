'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import DashboardHeader from '@/components/DashboardHeader';

const BookingsPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (user?.role !== 'admin') {
      router.push('/dashboard');
      return;
    }
    fetchBookings();
  }, [user, router]);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings`, {
        headers: {
          'Authorization': `Bearer ${token}`
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

  const updateBookingStatus = async (bookingId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${bookingId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (response.ok) {
        fetchBookings();
      }
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  const deleteBooking = async (bookingId) => {
    if (!confirm('Are you sure you want to delete this booking?')) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${bookingId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        fetchBookings();
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
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

  if (user?.role !== 'admin') {
    return null;
  }

  return (
    <>
      <DashboardHeader 
        title="BOOKINGS MANAGEMENT" 
        description="View and manage all service bookings"
      >
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setFilter('all')} className={`px-3 py-1 text-xs font-bold tracking-wider transition-colors ${filter === 'all' ? 'bg-black dark:bg-white text-white dark:text-black' : 'border border-black/20 dark:border-white/20 hover:bg-black/10 dark:hover:bg-white/10'}`}>
            ALL ({bookings.length})
          </button>
          <button onClick={() => setFilter('pending')} className={`px-3 py-1 text-xs font-bold tracking-wider transition-colors ${filter === 'pending' ? 'bg-black dark:bg-white text-white dark:text-black' : 'border border-black/20 dark:border-white/20 hover:bg-black/10 dark:hover:bg-white/10'}`}>
            PENDING ({bookings.filter(b => b.status === 'pending').length})
          </button>
          <button onClick={() => setFilter('in-progress')} className={`px-3 py-1 text-xs font-bold tracking-wider transition-colors ${filter === 'in-progress' ? 'bg-black dark:bg-white text-white dark:text-black' : 'border border-black/20 dark:border-white/20 hover:bg-black/10 dark:hover:bg-white/10'}`}>
            IN PROGRESS ({bookings.filter(b => b.status === 'in-progress').length})
          </button>
          <button onClick={() => setFilter('completed')} className={`px-3 py-1 text-xs font-bold tracking-wider transition-colors ${filter === 'completed' ? 'bg-black dark:bg-white text-white dark:text-black' : 'border border-black/20 dark:border-white/20 hover:bg-black/10 dark:hover:bg-white/10'}`}>
            COMPLETED ({bookings.filter(b => b.status === 'completed').length})
          </button>
        </div>
      </DashboardHeader>

      <div className="flex-1 overflow-y-auto p-6">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-2xl animate-pulse">[LOADING...]</div>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-xl font-bold">NO BOOKINGS FOUND</p>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto space-y-4">
            {filteredBookings.map((booking) => (
              <div key={booking._id} className="border border-black/20 dark:border-white/20 bg-white dark:bg-black p-6">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-bold">{booking.serviceName}</h3>
                      <span className={`px-3 py-1 text-xs border ${getStatusColor(booking.status)}`}>
                        {booking.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <p className="text-zinc-500 dark:text-zinc-400">Customer</p>
                        <p className="font-bold">{booking.name}</p>
                        <p className="text-xs">{booking.email}</p>
                        <p className="text-xs">{booking.phone}</p>
                      </div>
                      <div>
                        <p className="text-zinc-500 dark:text-zinc-400">Details</p>
                        <p className="text-xs">Budget: {booking.budget}</p>
                        <p className="text-xs">Timeline: {booking.timeline}</p>
                        <p className="text-xs">Date: {new Date(booking.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>

                    {booking.projectDescription && (
                      <div className="mb-4">
                        <p className="text-sm font-bold mb-1">PROJECT:</p>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">{booking.projectDescription}</p>
                      </div>
                    )}
                  </div>

                  <div className="lg:text-right space-y-4">
                    <div>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">PRICE</p>
                      <p className="text-2xl font-bold">${booking.servicePrice?.toLocaleString()}</p>
                    </div>

                    <div className="space-y-2">
                      <select
                        value={booking.status}
                        onChange={(e) => updateBookingStatus(booking._id, e.target.value)}
                        className="w-full border border-black dark:border-white bg-transparent px-3 py-2 text-xs font-bold"
                      >
                        <option value="pending">PENDING</option>
                        <option value="contacted">CONTACTED</option>
                        <option value="in-progress">IN PROGRESS</option>
                        <option value="completed">COMPLETED</option>
                        <option value="cancelled">CANCELLED</option>
                      </select>

                      <button
                        onClick={() => deleteBooking(booking._id)}
                        className="w-full border border-red-500 text-red-500 px-3 py-2 text-xs font-bold hover:bg-red-500 hover:text-white transition-colors"
                      >
                        [DELETE]
                      </button>
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

export default BookingsPage;
