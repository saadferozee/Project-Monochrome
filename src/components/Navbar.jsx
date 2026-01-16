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
            ? 'text-white underline underline-offset-4' 
            : 'text-zinc-400 hover:text-white'
        }`}
      >
        HOME
      </Link>
      <Link 
        href="/services" 
        className={`cursor-pointer text-sm tracking-wider transition-all ${
          isActive('/services') 
            ? 'text-white underline underline-offset-4' 
            : 'text-zinc-400 hover:text-white'
        }`}
      >
        SERVICES
      </Link>
      <Link 
        href="/about" 
        className={`cursor-pointer text-sm tracking-wider transition-all ${
          isActive('/about') 
            ? 'text-white underline underline-offset-4' 
            : 'text-zinc-400 hover:text-white'
        }`}
      >
        ABOUT
      </Link>
      <Link 
        href="/contact" 
        className={`cursor-pointer text-sm tracking-wider transition-all ${
          isActive('/contact') 
            ? 'text-white underline underline-offset-4' 
            : 'text-zinc-400 hover:text-white'
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
