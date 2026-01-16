'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Get user from cookie - moved outside to avoid cascading renders
    const cookies = document.cookie.split(';');
    const userCookie = cookies.find(c => c.trim().startsWith('user='));
    if (userCookie) {
      try {
        const userData = JSON.parse(decodeURIComponent(userCookie.split('=')[1]));
        // Use setTimeout to defer state update
        setTimeout(() => setUser(userData), 0);
      } catch (e) {
        console.error('Error parsing user cookie:', e);
      }
    }

    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    document.cookie = 'token=; path=/; max-age=0';
    document.cookie = 'user=; path=/; max-age=0';
    window.location.href = '/';
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/10 dark:bg-black/10 backdrop-blur-2xl border-b border-black/40 dark:border-white/40 shadow-2xl' 
          : 'bg-white/5 dark:bg-black/5 backdrop-blur-xl border-b border-black/20 dark:border-white/20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-base sm:text-lg md:text-xl font-bold tracking-wider hover:text-zinc-300 transition-colors">
            <span className="text-white">&lt;</span>
            <span className="text-white">monochrome</span>
            <span className="text-white">/&gt;</span>
          </Link>

          <Navbar />

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <ThemeToggle />
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="border border-white px-3 md:px-4 py-2 text-sm font-bold tracking-wider hover:bg-white hover:text-black transition-colors"
                  >
                    {user.name}
                  </button>
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 border border-white bg-black/90 backdrop-blur-xl shadow-2xl z-50">
                      <Link href="/dashboard" className="block px-4 py-3 text-sm hover:bg-white hover:text-black transition-colors border-b border-zinc-800" onClick={() => setShowProfileMenu(false)}>
                        DASHBOARD
                      </Link>
                      <Link href="/profile" className="block px-4 py-3 text-sm hover:bg-white hover:text-black transition-colors border-b border-zinc-800" onClick={() => setShowProfileMenu(false)}>
                        PROFILE
                      </Link>
                      <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-sm hover:bg-red-900 hover:text-white transition-colors border-t border-red-900 text-red-500">
                        LOGOUT
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <ThemeToggle />
                <Link href="/login" className="border border-white text-white px-4 md:px-6 py-2 text-sm font-bold tracking-wider hover:bg-white hover:text-black transition-colors">
                  [LOGIN]
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="border border-white px-2 py-2 hover:bg-white hover:text-black transition-colors">
              {showMobileMenu ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {showMobileMenu && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/20 space-y-2">
            <Link href="/" className="block text-zinc-400 hover:text-white transition-colors text-sm tracking-wider py-2" onClick={() => setShowMobileMenu(false)}>HOME</Link>
            <Link href="/services" className="block text-zinc-400 hover:text-white transition-colors text-sm tracking-wider py-2" onClick={() => setShowMobileMenu(false)}>SERVICES</Link>
            <Link href="/dashboard" className="block text-zinc-400 hover:text-white transition-colors text-sm tracking-wider py-2" onClick={() => setShowMobileMenu(false)}>DASHBOARD</Link>
            <Link href="/about" className="block text-zinc-400 hover:text-white transition-colors text-sm tracking-wider py-2" onClick={() => setShowMobileMenu(false)}>ABOUT</Link>
            <Link href="/contact" className="block text-zinc-400 hover:text-white transition-colors text-sm tracking-wider py-2" onClick={() => setShowMobileMenu(false)}>CONTACT</Link>
            {user ? (
              <>
                <Link href="/profile" className="block border border-white text-white px-4 py-2 text-sm font-bold tracking-wider hover:bg-white hover:text-black transition-colors text-center mt-3" onClick={() => setShowMobileMenu(false)}>{user.name}</Link>
                <button onClick={() => { handleLogout(); setShowMobileMenu(false); }} className="w-full border border-red-500 text-red-500 px-4 py-2 text-sm font-bold tracking-wider hover:bg-red-900 hover:text-white transition-colors">LOGOUT</button>
              </>
            ) : (
              <Link href="/login" className="block border border-white text-white px-4 py-2 text-sm font-bold tracking-wider hover:bg-white hover:text-black transition-colors text-center mt-3" onClick={() => setShowMobileMenu(false)}>[LOGIN]</Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
