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
      icon: "[ ]",
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
      description: "Build powerful APIs and microservices that power your applications with reliability and performance.",
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent animate-pulse" />
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent animate-pulse delay-1000" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent animate-pulse delay-2000" />
      </div>

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
            <div className="max-w-7xl w-full mx-auto text-center">
              {/* Brand Logo - Large */}
              <div className="mb-6 sm:mb-8 animate-fade-in">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wider text-white/90">
                  &lt;monochrome/&gt;
                </h2>
                <div className="h-px w-32 sm:w-48 bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto mt-4" />
              </div>

              {/* Icon */}
              <div className="mb-8 animate-fade-in">
                <div className="inline-block border border-white/40 bg-black/30 backdrop-blur-sm p-8 sm:p-12">
                  <div className="text-6xl sm:text-8xl md:text-9xl font-bold text-white">
                    {slide.icon}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-6 animate-slide-up">
                {/* Subtitle */}
                <p className="text-zinc-500 text-sm sm:text-base tracking-widest uppercase">
                  {'>'} {slide.subtitle}
                </p>

                {/* Title */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-wider">
                  {slide.title}
                </h1>

                {/* Description */}
                <p className="text-lg sm:text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed px-4">
                  {slide.description}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                  <Link
                    href={slide.link}
                    className="inline-block bg-white text-black px-8 py-4 font-bold tracking-wider hover:bg-zinc-200 transition-all hover:scale-105"
                  >
                    [{slide.cta.toUpperCase()}]
                  </Link>
                  
                  <Link
                    href="/contact"
                    className="inline-block border border-white text-white px-8 py-4 font-bold tracking-wider hover:bg-white hover:text-black transition-all hover:scale-105"
                  >
                    [CONTACT_US]
                  </Link>
                </div>
              </div>

              {/* Slide Counter with Branding */}
              <div className="mt-12 flex items-center justify-center gap-4 text-zinc-600 text-sm tracking-wider">
                <span className="hidden sm:inline text-zinc-700">&lt;monochrome/&gt;</span>
                <span className="text-zinc-800">|</span>
                <span>[{String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}]</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-16 sm:h-16 border border-white/40 bg-black/50 backdrop-blur-sm hover:bg-white hover:text-black transition-all hover:scale-110 flex items-center justify-center text-xl sm:text-2xl font-bold"
        aria-label="Previous slide"
      >
        &lt;
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-16 sm:h-16 border border-white/40 bg-black/50 backdrop-blur-sm hover:bg-white hover:text-black transition-all hover:scale-110 flex items-center justify-center text-xl sm:text-2xl font-bold"
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
            {index === currentSlide && (
              <div className="absolute inset-0 bg-white/20 blur-md" />
            )}
          </button>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-8 z-20 hidden lg:flex items-center gap-3 text-zinc-500 text-sm">
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-white/40 animate-bounce" />
        <span className="rotate-90 tracking-wider">SCROLL</span>
      </div>

      {/* Brand Logo - Top Right Corner */}
      <div className="absolute top-24 right-4 sm:right-8 z-20 text-right">
        <div className="text-2xl sm:text-3xl font-bold tracking-wider text-white/80">
          &lt;monochrome/&gt;
        </div>
        <div className="text-xs sm:text-sm text-zinc-500 tracking-widest mt-1">
          WEB SOLUTIONS
        </div>
      </div>
    </section>
  );
};

export default Hero;
