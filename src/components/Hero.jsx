'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "WEB DEVELOPMENT",
      subtitle: "Building Scalable Digital Solutions",
      description: "Transform your ideas into powerful web applications with cutting-edge technologies and modern frameworks.",
      icon: "</>",
      cta: "Explore Services",
      link: "/services"
    },
    {
      title: "UI/UX DESIGN",
      subtitle: "Crafting Beautiful Experiences",
      description: "Create intuitive and stunning user interfaces that engage your audience and drive conversions.",
      icon: "[❖]",
      cta: "View Portfolio",
      link: "/services"
    },
    {
      title: "CYBERSECURITY",
      subtitle: "Protecting Your Digital Assets",
      description: "Secure your applications with advanced security measures, penetration testing, and compliance solutions.",
      icon: "[#]",
      cta: "Learn More",
      link: "/services"
    },
    {
      title: "CLOUD SOLUTIONS",
      subtitle: "Scale Without Limits",
      description: "Deploy and manage your infrastructure on the cloud with automated scaling and high availability.",
      icon: "[☁]",
      cta: "Get Started",
      link: "/services"
    },
    {
      title: "API DEVELOPMENT",
      subtitle: "Robust Backend Systems",
      description:"Build powerful APIs and microservices that power your applications with reliability and performance.",
      icon: "{}",
      cta: "Discover More",
      link: "/services"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Slides Container */}
      <div className="relative w-full h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${
              index === currentSlide
                ? 'opacity-100 scale-100 z-10'
                : 'opacity-0 scale-95 z-0'
            }`}
          >
            <div className="max-w-7xl w-full mx-auto">
              {/* Hero Container with Border */}
              <div className="border border-white/40 bg-black/30 backdrop-blur-sm">
                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
                  {/* Left Side - Logo/Symbol */}
                  <div className="flex items-center justify-center p-8 sm:p-12 lg:p-16 border-b lg:border-b-0 lg:border-r border-white/40">
                    <div className="text-center">
                      {/* Brand Logo */}
                      <div className="mb-8 animate-fade-in">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wider flex flex-col items-center">
                          &lt;monochrome/&gt; 
                          <span className='text-gray-400 text-xl sm:text-2xl md:text-4xl'>web solutions</span>
                        </h2>
                        <div className="h-px w-32 sm:w-48 bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto mt-4" />
                      </div>

                      {/* Icon */}
                      <div className="animate-fade-in">
                        <div className="text-8xl sm:text-9xl md:text-[12rem] font-bold text-white">
                          {slide.icon}
                        </div>
                      </div>

                      {/* Slide Counter */}
                      <div className="mt-8 text-black/90 dark:text-white/90 text-sm tracking-wider">
                        [{String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}]
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Content */}
                  <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16 space-y-6">
                    {/* Subtitle */}
                    <p className="text-black/90 dark:text-white/90 text-xs sm:text-sm tracking-widest uppercase animate-slide-up">
                      {'>'} {slide.subtitle}
                    </p>

                    {/* Title */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider animate-slide-up">
                      {slide.title}
                    </h1>

                    {/* Description */}
                    <p className="text-base sm:text-lg md:text-xl text-black/90 dark:text-white/90 leading-relaxed animate-slide-up">
                      {slide.description}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-slide-up">
                      <Link
                        href={slide.link}
                        className="inline-block bg-white text-black px-6 py-3 text-sm font-bold tracking-wider hover:bg-zinc-200 transition-all hover:scale-105 text-center"
                      >
                        [{slide.cta.toUpperCase()}]
                      </Link>
                      
                      <Link
                        href="/contact"
                        className="inline-block border border-white text-white px-6 py-3 text-sm font-bold tracking-wider hover:bg-white hover:text-black transition-all hover:scale-105 text-center"
                      >
                        [CONTACT_US]
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 border border-white/40 bg-black/50 backdrop-blur-sm hover:bg-white hover:text-black transition-all hover:scale-110 flex items-center justify-center text-xl font-bold"
        aria-label="Previous slide"
      >
        &lt;
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 border border-white/40 bg-black/50 backdrop-blur-sm hover:bg-white hover:text-black transition-all hover:scale-110 flex items-center justify-center text-xl font-bold"
        aria-label="Next slide"
      >
        &gt;
      </button>

      {/* Progress Indicators */}
      <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="group relative"
            aria-label={`Go to slide ${index + 1}`}
          >
            <div
              className={`h-1 transition-all duration-500 ${
                index === currentSlide
                  ? 'w-16 bg-white'
                  : 'w-8 bg-zinc-600 group-hover:bg-zinc-400'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-8 z-20 hidden lg:flex items-center gap-3 text-black/90 dark:text-white/90 text-sm">
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-white/40 animate-bounce" />
        <span className="rotate-90 tracking-wider">SCROLL</span>
      </div>
    </section>
  );
};

export default Hero;
