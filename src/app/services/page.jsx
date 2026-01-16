'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');

  useEffect(() => {
    fetchServices();
  }, [category]);

  const fetchServices = async () => {
    try {
      const url = category === 'all' 
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/services`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/services?category=${category}`;
        
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success) {
        setServices(data.data);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { value: 'all', label: 'ALL' },
    { value: 'development', label: 'DEVELOPMENT' },
    { value: 'design', label: 'DESIGN' },
    { value: 'security', label: 'SECURITY' },
    { value: 'optimization', label: 'OPTIMIZATION' },
    { value: 'maintenance', label: 'MAINTENANCE' }
  ];

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Background grid effect */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      
      <div className="relative z-10">
        <Header />

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-16 sm:py-20 md:py-24">
          <div className="mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 tracking-wider break-words">
              {'>'} ALL SERVICES
            </h1>
            <p className="text-zinc-500 text-base sm:text-lg">
              Professional web solutions for modern businesses
            </p>
          </div>

          {/* Category Filter */}
          <div className="mb-6 sm:mb-8 flex flex-wrap gap-2 sm:gap-3">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`px-4 sm:px-6 py-1 sm:py-2 border font-bold text-xs sm:text-sm tracking-wider transition-colors ${
                  category === cat.value
                    ? 'bg-white text-black border-white'
                    : 'bg-transparent text-white border-zinc-800 hover:border-white'
                }`}
              >
                [{cat.label}]
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="border border-white/40 bg-black/50 p-5 sm:p-6 animate-pulse"
                >
                  {/* Category skeleton */}
                  <div className="h-3 w-20 sm:w-24 bg-zinc-300 dark:bg-zinc-700 mb-2 sm:mb-3"></div>
                  
                  {/* Title skeleton */}
                  <div className="h-5 sm:h-6 w-3/4 bg-zinc-400 dark:bg-zinc-600 mb-2 sm:mb-3"></div>
                  
                  {/* Description skeleton */}
                  <div className="space-y-2 mb-3 sm:mb-4">
                    <div className="h-3 w-full bg-zinc-300 dark:bg-zinc-700"></div>
                    <div className="h-3 w-full bg-zinc-300 dark:bg-zinc-700"></div>
                    <div className="h-3 w-2/3 bg-zinc-300 dark:bg-zinc-700"></div>
                  </div>
                  
                  {/* Divider */}
                  <div className="border-t border-zinc-800 pt-3 sm:pt-4 mt-3 sm:mt-4 flex items-center justify-between">
                    {/* Price skeleton */}
                    <div className="h-6 sm:h-8 w-16 sm:w-20 bg-zinc-400 dark:bg-zinc-600"></div>
                    {/* CTA skeleton */}
                    <div className="h-3 w-20 sm:w-24 bg-zinc-300 dark:bg-zinc-700"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {services.map((service) => (
                <Link
                  key={service._id}
                  href={`/services/${service.slug}`}
                  className="border border-white/40 bg-black/50 p-5 sm:p-6 hover:bg-white hover:text-black hover:border-black hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div className="mb-3 sm:mb-4">
                    <div className="text-xs sm:text-sm text-zinc-500 group-hover:text-zinc-700 mb-2 tracking-wider transition-colors">
                      {service.category.toUpperCase()}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-black transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-zinc-500 group-hover:text-zinc-700 text-xs sm:text-sm line-clamp-3 leading-relaxed transition-colors">
                      {service.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-zinc-800 group-hover:border-zinc-700 transition-colors">
                    <span className="text-xl sm:text-2xl font-bold group-hover:text-black transition-colors">
                      ${service.price.toLocaleString()}
                    </span>
                    <span className="text-zinc-500 group-hover:text-zinc-700 text-xs sm:text-sm transition-all group-hover:translate-x-1">
                      {'>'} VIEW_DETAILS
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!loading && services.length === 0 && (
            <div className="text-center py-12 sm:py-20 border border-zinc-800 bg-black/50">
              <p className="text-zinc-500 text-base sm:text-lg">
                No services found in this category.
              </p>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default ServicesPage;
