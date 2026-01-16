'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServiceCard from '@/components/cards/ServiceCard';
import Hero from '@/components/Hero';

const Home = () => {
  const [services, setServices] = useState([]);
  const [stats, setStats] = useState({
    projects: 0,
    clients: 0,
    satisfaction: 0
  });

  useEffect(() => {
    // Fetch services from API
    fetchServices();
    
    // Animate stats
    animateStats();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services`);
      const data = await response.json();
      
      if (data.success) {
        setServices(data.data.slice(0, 6)); // Get first 6 services
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const animateStats = () => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      
      setStats({
        projects: Math.floor(progress * 150),
        clients: Math.floor(progress * 200),
        satisfaction: Math.floor(progress * 100)
      });
      
      if (step >= steps) clearInterval(timer);
    }, interval);
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Background grid effect */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      
      <div className="relative z-10">
        <Header />

        {/* Hero Section - Full Screen Slider */}
        <Hero />

        {/* Section 2: Stats */}
        <section className="py-12 sm:py-16 md:py-20 px-4 border-t border-white/40">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <div className="border border-white/40 p-6 sm:p-8 bg-black/50 backdrop-blur-sm text-center hover:bg-white hover:text-black hover:border-black hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300">
                <div className="text-4xl sm:text-5xl font-bold mb-2">{stats.projects}+</div>
                <div className="text-zinc-500 tracking-wider text-xs sm:text-sm">PROJECTS_COMPLETED</div>
              </div>
              
              <div className="border border-white/40 p-6 sm:p-8 bg-black/50 backdrop-blur-sm text-center hover:bg-white hover:text-black hover:border-black hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300">
                <div className="text-4xl sm:text-5xl font-bold mb-2">{stats.clients}+</div>
                <div className="text-zinc-500 tracking-wider text-xs sm:text-sm">HAPPY_CLIENTS</div>
              </div>
              
              <div className="border border-white/40 p-6 sm:p-8 bg-black/50 backdrop-blur-sm text-center hover:bg-white hover:text-black hover:border-black hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300">
                <div className="text-4xl sm:text-5xl font-bold mb-2">{stats.satisfaction}%</div>
                <div className="text-zinc-500 tracking-wider text-xs sm:text-sm">SATISFACTION_RATE</div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Featured Services */}
        <section id="featured-services" className="py-12 sm:py-16 md:py-20 px-4 border-t border-white/40">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 tracking-wider break-words">
                {'>'} FEATURED SERVICES
              </h2>
              <p className="text-zinc-500 text-base sm:text-lg">
                Our most popular and eye-catching solutions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.slice(0, 3).map((service) => (
                <ServiceCard key={service._id} service={service} featured={true} />
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Frequently Requested Services */}
        <section id="services" className="py-12 sm:py-16 md:py-20 px-4 border-t border-white/40">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 tracking-wider break-words">
                {'>'} FREQUENTLY REQUESTED SERVICES
              </h2>
              <p className="text-zinc-500 text-base sm:text-lg">
                Professional solutions for modern digital challenges
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.slice(3, 6).map((service) => (
                <ServiceCard key={service._id} service={service} />
              ))}
            </div>

            <div className="text-center mt-8 sm:mt-12">
              <Link
                href="/services"
                className="inline-block border border-white text-white px-6 sm:px-8 py-3 sm:py-4 font-bold text-sm sm:text-base tracking-wider hover:bg-white hover:text-black transition-colors"
              >
                [VIEW_ALL_SERVICES]
              </Link>
            </div>
          </div>
        </section>

        {/* Section 5: Why We're Different */}
        <section id="about" className="py-12 sm:py-16 md:py-20 px-4 border-t border-white/40">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 tracking-wider break-words">
                {'>'} WHY WE ARE DIFFERENT
              </h2>
              <p className="text-zinc-500 text-base sm:text-lg">
                What sets us apart from the competition
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="border border-white bg-black/50 p-6 sm:p-8">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">[01]</div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">FUTURISTIC_APPROACH</h3>
                <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                  We don't just follow trends—we create them. Our minimalist, terminal-inspired design philosophy sets us apart in a world of cluttered interfaces.
                </p>
              </div>

              <div className="border border-white bg-black/50 p-6 sm:p-8">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">[02]</div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">SECURITY_FIRST</h3>
                <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                  Every line of code is written with security in mind. We conduct thorough audits and penetration testing to ensure your data stays protected.
                </p>
              </div>

              <div className="border border-white bg-black/50 p-6 sm:p-8">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">[03]</div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">PERFORMANCE_OBSESSED</h3>
                <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                  Speed matters. We optimize every pixel and every byte to deliver lightning-fast experiences that keep your users engaged.
                </p>
              </div>

              <div className="border border-white bg-black/50 p-6 sm:p-8">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">[04]</div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">24/7_SUPPORT</h3>
                <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                  We're always here when you need us. Our dedicated support team works around the clock to ensure your success.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Process */}
        <section className="py-12 sm:py-16 md:py-20 px-4 border-t border-white/40">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 sm:mb-12 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 tracking-wider break-words">
                {'>'} OUR PROCESS
              </h2>
              <p className="text-zinc-500 text-base sm:text-lg">
                A systematic approach to delivering excellence
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              <div className="border border-white/40 p-5 sm:p-6 bg-black/50 hover:bg-white hover:text-black hover:border-black hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300 group text-center">
                <div className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-zinc-500">[01]</div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">DISCOVER</h3>
                <p className="text-zinc-500 text-xs sm:text-sm">
                  Understanding your needs and goals
                </p>
              </div>
              
              <div className="border border-white/40 p-5 sm:p-6 bg-black/50 hover:bg-white hover:text-black hover:border-black hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300 group text-center">
                <div className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-zinc-500">[02]</div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">DESIGN</h3>
                <p className="text-zinc-500 text-xs sm:text-sm">
                  Creating the perfect solution
                </p>
              </div>
              
              <div className="border border-white/40 p-5 sm:p-6 bg-black/50 hover:bg-white hover:text-black hover:border-black hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300 group text-center">
                <div className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-zinc-500">[03]</div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">DEVELOP</h3>
                <p className="text-zinc-500 text-xs sm:text-sm">
                  Building with precision and care
                </p>
              </div>
              
              <div className="border border-white/40 p-5 sm:p-6 bg-black/50 hover:bg-white hover:text-black hover:border-black hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300 group text-center">
                <div className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-zinc-500">[04]</div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">DELIVER</h3>
                <p className="text-zinc-500 text-xs sm:text-sm">
                  Launching your success
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Testimonials */}
        <section className="py-12 sm:py-16 md:py-20 px-4 border-t border-white/40">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 sm:mb-12 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 tracking-wider break-words">
                {'>'} CLIENT TESTIMONIALS
              </h2>
              <p className="text-zinc-500 text-base sm:text-lg">
                What our clients say about us
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <div className="border border-white/40 p-5 sm:p-6 bg-black/50 hover:bg-white hover:text-black hover:border-black hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300 group">
                <div className="mb-4">
                  <div className="text-xl sm:text-2xl mb-2">★★★★★</div>
                  <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                    "Exceptional work! The team delivered beyond our expectations. Highly professional and innovative."
                  </p>
                </div>
                <div className="pt-4 border-t border-zinc-800">
                  <p className="font-bold text-sm sm:text-base">Sarah Johnson</p>
                  <p className="text-zinc-500 text-xs sm:text-sm">CEO, TechCorp</p>
                </div>
              </div>

              <div className="border border-white/40 p-5 sm:p-6 bg-black/50 hover:bg-white hover:text-black hover:border-black hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300 group">
                <div className="mb-4">
                  <div className="text-xl sm:text-2xl mb-2">★★★★★</div>
                  <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                    "Outstanding service and support. They transformed our digital presence completely."
                  </p>
                </div>
                <div className="pt-4 border-t border-zinc-800">
                  <p className="font-bold text-sm sm:text-base">Michael Chen</p>
                  <p className="text-zinc-500 text-xs sm:text-sm">Founder, StartupX</p>
                </div>
              </div>

              <div className="border border-white/40 p-5 sm:p-6 bg-black/50 hover:bg-white hover:text-black hover:border-black hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300 group">
                <div className="mb-4">
                  <div className="text-xl sm:text-2xl mb-2">★★★★★</div>
                  <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                    "Best decision we made. Professional, efficient, and results-driven team."
                  </p>
                </div>
                <div className="pt-4 border-t border-zinc-800">
                  <p className="font-bold text-sm sm:text-base">Emily Rodriguez</p>
                  <p className="text-zinc-500 text-xs sm:text-sm">Director, InnovateLab</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 8: Contact/CTA */}
        <section id="contact" className="py-12 sm:py-16 md:py-20 px-4 border-t border-white/40">
          <div className="max-w-7xl mx-auto">
            <div className="border border-white/40 bg-black/50 p-6 sm:p-8 md:p-12 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 tracking-wider break-words">
                {'>'} READY TO START?
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
                Let's build something amazing together. Get in touch with our team and transform your digital presence.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8">
                <Link
                  href="/services"
                  className="inline-block bg-white text-black px-6 sm:px-8 py-3 sm:py-4 font-bold text-sm sm:text-base tracking-wider hover:bg-zinc-200 transition-colors"
                >
                  [VIEW_SERVICES]
                </Link>
                
                <Link
                  href="/login"
                  className="inline-block border border-white text-white px-6 sm:px-8 py-3 sm:py-4 font-bold text-sm sm:text-base tracking-wider hover:bg-white hover:text-black transition-colors"
                >
                  [CLIENT_PORTAL]
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12 text-left">
                <div className="border border-white/40 p-4 sm:p-6">
                  <h4 className="font-bold mb-2 text-zinc-400 text-xs sm:text-sm">EMAIL</h4>
                  <p className="text-white text-sm sm:text-base break-all">contact@monochromeweb.com</p>
                </div>
                <div className="border border-white/40 p-4 sm:p-6">
                  <h4 className="font-bold mb-2 text-zinc-400 text-xs sm:text-sm">PHONE</h4>
                  <p className="text-white text-sm sm:text-base">+880 12345 67890</p>
                </div>
                <div className="border border-white/40 p-4 sm:p-6">
                  <h4 className="font-bold mb-2 text-zinc-400 text-xs sm:text-sm">SUPPORT</h4>
                  <p className="text-white text-sm sm:text-base">24/7 Available</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default Home;
