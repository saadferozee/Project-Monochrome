'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import DashboardHeader from '@/components/DashboardHeader';

const PaymentsPage = () => {
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

  const getTotalPaid = () => bookings.filter(b => b.status === 'completed').reduce((sum, b) => sum + (b.servicePrice || 0), 0);
  const getTotalPending = () => bookings.filter(b => ['pending', 'contacted', 'in-progress'].includes(b.status)).reduce((sum, b) => sum + (b.servicePrice || 0), 0);
  const getPaymentStatus = (status) => status === 'completed' ? 'PAID' : status === 'cancelled' ? 'CANCELLED' : 'PENDING';
  const getPaymentStatusColor = (status) => {
    if (status === 'completed') return 'border-green-500 text-green-600 dark:text-green-500 bg-green-500/10';
    if (status === 'cancelled') return 'border-red-500 text-red-600 dark:text-red-500 bg-red-500/10';
    return 'border-yellow-500 text-yellow-600 dark:text-yellow-500 bg-yellow-500/10';
  };

  return (
    <>
      <DashboardHeader 
        title="PAYMENTS" 
        description="View your payment history and invoices"
      />

      <div className="flex-1 overflow-y-auto p-6">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-2xl animate-pulse">[LOADING...]</div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="border border-black/20 dark:border-white/20 bg-white dark:bg-black p-6">
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2 tracking-wider">TOTAL PAID</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-500">${getTotalPaid().toLocaleString()}</p>
              </div>

              <div className="border border-black/20 dark:border-white/20 bg-white dark:bg-black p-6">
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2 tracking-wider">PENDING</p>
                <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-500">${getTotalPending().toLocaleString()}</p>
              </div>

              <div className="border border-black/20 dark:border-white/20 bg-white dark:bg-black p-6">
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2 tracking-wider">TRANSACTIONS</p>
                <p className="text-3xl font-bold">{bookings.length}</p>
              </div>
            </div>

            <div className="border border-black/20 dark:border-white/20 bg-white dark:bg-black p-6">
              <h2 className="text-xl font-bold mb-6 tracking-wider">PAYMENT HISTORY</h2>

              {bookings.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-xl font-bold mb-4">NO PAYMENTS YET</p>
                  <p className="text-zinc-500 dark:text-zinc-400 mb-6">You haven&apos;t made any bookings yet</p>
                  <Link
                    href="/services"
                    className="inline-block bg-black dark:bg-white text-white dark:text-black px-6 py-3 font-bold tracking-wider hover:bg-black/80 dark:hover:bg-white/80 transition-colors"
                  >
                    [BROWSE SERVICES]
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-black/20 dark:border-white/20">
                        <th className="pb-4 pr-4 font-bold">DATE</th>
                        <th className="pb-4 pr-4 font-bold">SERVICE</th>
                        <th className="pb-4 pr-4 font-bold">ORDER ID</th>
                        <th className="pb-4 pr-4 font-bold">STATUS</th>
                        <th className="pb-4 text-right font-bold">AMOUNT</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking) => (
                        <tr key={booking._id} className="border-b border-black/10 dark:border-white/10 last:border-0">
                          <td className="py-4 pr-4 text-zinc-600 dark:text-zinc-400">
                            {new Date(booking.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </td>
                          <td className="py-4 pr-4 font-bold">{booking.serviceName}</td>
                          <td className="py-4 pr-4 text-zinc-600 dark:text-zinc-400 font-mono text-xs">
                            {booking._id.slice(-8).toUpperCase()}
                          </td>
                          <td className="py-4 pr-4">
                            <span className={`inline-block px-2 py-1 text-xs border ${getPaymentStatusColor(booking.status)}`}>
                              {getPaymentStatus(booking.status)}
                            </span>
                          </td>
                          <td className="py-4 text-right font-bold">${booking.servicePrice?.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="border border-black/20 dark:border-white/20 bg-white dark:bg-black p-6">
              <h2 className="text-xl font-bold mb-4 tracking-wider">PAYMENT INFORMATION</h2>
              <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                <p><span className="font-bold text-black dark:text-white">Payment Method:</span> Invoice-based payment</p>
                <p><span className="font-bold text-black dark:text-white">Payment Terms:</span> Net 30 days from invoice date</p>
                <p><span className="font-bold text-black dark:text-white">Currency:</span> USD ($)</p>
                <p className="pt-4 border-t border-black/10 dark:border-white/10">
                  For payment inquiries or to request an invoice, please{' '}
                  <Link href="/contact" className="font-bold text-black dark:text-white hover:underline">
                    contact our billing department
                  </Link>.
                </p>
              </div>
            </div>

            {bookings.filter(b => b.status === 'completed').length > 0 && (
              <div className="border border-black/20 dark:border-white/20 bg-white dark:bg-black p-6">
                <h2 className="text-xl font-bold mb-4 tracking-wider">DOWNLOAD INVOICES</h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">Download invoices for completed orders</p>
                <div className="space-y-3">
                  {bookings.filter(b => b.status === 'completed').map((booking) => (
                    <div key={booking._id} className="flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/10 last:border-0">
                      <div>
                        <p className="font-bold text-sm">{booking.serviceName}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          {new Date(booking.createdAt).toLocaleDateString()} • ${booking.servicePrice?.toLocaleString()}
                        </p>
                      </div>
                      <button className="border border-black dark:border-white text-black dark:text-white px-4 py-2 text-xs font-bold tracking-wider hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
                        [DOWNLOAD PDF]
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default PaymentsPage;
