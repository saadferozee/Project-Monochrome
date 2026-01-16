'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';

const ServiceDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    fetchService();
  }, [params.slug]);

  const fetchService = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/services/slug/${params.slug}`
      );
      const data = await response.json();

      if (data.success) {
        setService(data.data);
      } else {
        setError('Service not found');
      }
    } catch (error) {
      console.error('Error fetching service:', error);
      setError('Failed to load service');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white font-mono flex items-center justify-center">
        <div className="text-2xl animate-pulse">[LOADING...]</div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen bg-black text-white font-mono">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-bold mb-4">[ERROR_404]</h1>
          <p className="text-zinc-500 mb-8">{error || 'Service not found'}</p>
          <Link
            href="/services"
            className="inline-block border border-white text-white px-8 py-4 font-bold tracking-wider hover:bg-white hover:text-black transition-colors"
          >
            [BACK_TO_SERVICES]
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Background grid effect */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      <div className="relative z-10">
        <Header />

        <main className="max-w-7xl mx-auto px-4 py-16 sm:py-20 md:py-24">
          {/* Breadcrumb */}
          <div className="mb-6 sm:mb-8 text-xs sm:text-sm text-zinc-500">
            <Link href="/" className="hover:text-white transition-colors">
              HOME
            </Link>
            {' > '}
            <Link href="/services" className="hover:text-white transition-colors">
              SERVICES
            </Link>
            {' > '}
            <span className="text-white">{service.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Category Badge */}
              <div className="inline-block border border-zinc-800 px-3 sm:px-4 py-1 text-xs sm:text-sm mb-3 sm:mb-4 tracking-wider">
                {service.category.toUpperCase()}
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 tracking-wider break-words">
                {service.name}
              </h1>

              {/* Description */}
              <p className="text-lg sm:text-xl text-zinc-400 mb-6 sm:mb-8 leading-relaxed">
                {service.description}
              </p>

              {/* Full Description */}
              <div className="border border-zinc-800 bg-black/50 p-6 sm:p-8 mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 tracking-wider">
                  {'>'} OVERVIEW
                </h2>
                <p className="text-zinc-400 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {service.fullDescription}
                </p>
              </div>

              {/* Features */}
              {service.features && service.features.length > 0 && (
                <div className="border border-zinc-800 bg-black/50 p-6 sm:p-8 mb-6 sm:mb-8">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 tracking-wider">
                    {'>'} FEATURES_INCLUDED
                  </h2>
                  <ul className="space-y-2 sm:space-y-3">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 sm:gap-3">
                        <span className="text-white text-lg sm:text-xl">[✓]</span>
                        <span className="text-zinc-400 text-sm sm:text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tags */}
              {service.tags && service.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="border border-zinc-800 px-2 sm:px-3 py-1 text-xs sm:text-sm text-zinc-500"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="border border-zinc-800 bg-black/50 p-6 sm:p-8 lg:sticky lg:top-24">
                {/* Price */}
                <div className="mb-4 sm:mb-6">
                  <p className="text-xs sm:text-sm text-zinc-500 mb-2">PRICE</p>
                  <p className="text-3xl sm:text-4xl font-bold">${service.price.toLocaleString()}</p>
                </div>

                {/* Delivery Time */}
                <div className="mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-zinc-800">
                  <p className="text-xs sm:text-sm text-zinc-500 mb-2">DELIVERY_TIME</p>
                  <p className="text-base sm:text-lg text-white">{service.deliveryTime}</p>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-2 sm:space-y-3">
                  <button 
                    onClick={() => setShowBookingModal(true)}
                    className="w-full bg-white text-black py-2 sm:py-3 px-4 sm:px-6 font-bold text-sm sm:text-base tracking-wider hover:bg-zinc-200 transition-colors"
                  >
                    [BOOK NOW]
                  </button>
                  
                  <Link
                    href="/contact"
                    className="block w-full border border-white text-white py-2 sm:py-3 px-4 sm:px-6 font-bold text-sm sm:text-base tracking-wider hover:bg-white hover:text-black transition-colors text-center"
                  >
                    [CONTACT_US]
                  </Link>
                </div>

                {/* Info */}
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-zinc-800 text-xs sm:text-sm text-zinc-500 space-y-2">
                  <p>✓ 24/7 Support</p>
                  <p>✓ Money Back Guarantee</p>
                  <p>✓ Secure Payment</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Booking Modal */}
        {service && (
          <BookingModal 
            isOpen={showBookingModal}
            onClose={() => setShowBookingModal(false)}
            service={service}
          />
        )}

        <Footer />
      </div>
    </div>
  );
};

export default ServiceDetailPage;
