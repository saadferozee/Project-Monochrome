'use client';

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="hidden md:flex items-center gap-8">
      <Link href="/" className="text-zinc-400 hover:text-white transition-colors text-sm tracking-wider">
        HOME
      </Link>
      <Link href="/services" className="text-zinc-400 hover:text-white transition-colors text-sm tracking-wider">
        SERVICES
      </Link>
      <Link href="/dashboard" className="text-zinc-400 hover:text-white transition-colors text-sm tracking-wider">
        DASHBOARD
      </Link>
      <Link href="/about" className="text-zinc-400 hover:text-white transition-colors text-sm tracking-wider">
        ABOUT
      </Link>
      <Link href="/contact" className="text-zinc-400 hover:text-white transition-colors text-sm tracking-wider">
        CONTACT
      </Link>
    </nav>
  );
};

export default Navbar;
