'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();
  
  const isActive = (path) => pathname === path;
  
  return (
    <nav className="hidden md:flex items-center gap-8">
      <Link 
        href="/" 
        className={`cursor-pointer text-sm tracking-wider transition-all ${
          isActive('/') 
            ? 'underline underline-offset-4' 
            : 'opacity-60 hover:opacity-100'
        }`}
      >
        HOME
      </Link>
      <Link 
        href="/services" 
        className={`cursor-pointer text-sm tracking-wider transition-all ${
          isActive('/services') 
            ? 'underline underline-offset-4' 
            : 'opacity-60 hover:opacity-100'
        }`}
      >
        SERVICES
      </Link>
      <Link 
        href="/about" 
        className={`cursor-pointer text-sm tracking-wider transition-all ${
          isActive('/about') 
            ? 'underline underline-offset-4' 
            : 'opacity-60 hover:opacity-100'
        }`}
      >
        ABOUT
      </Link>
      <Link 
        href="/contact" 
        className={`cursor-pointer text-sm tracking-wider transition-all ${
          isActive('/contact') 
            ? 'underline underline-offset-4' 
            : 'opacity-60 hover:opacity-100'
        }`}
      >
        CONTACT
      </Link>
      <Link 
        href="/dashboard" 
        className={`cursor-pointer text-sm tracking-widest transition-all ${
          pathname.startsWith('/dashboard') 
            ? 'text-white bg-white/10 px-4 py-2' 
            : 'text-white hover:bg-white/5 py-2'
        }`}
      >
        [DASHBOARD]
      </Link>
    </nav>
  );
};

export default Navbar;
