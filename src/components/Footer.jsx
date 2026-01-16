import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-zinc-800 text-white font-mono">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 tracking-wider">
              &lt;monochrome/&gt;
            </h3>
            <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed">
              Building futuristic digital experiences with cutting-edge technology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold mb-3 sm:mb-4 text-zinc-400 tracking-wider">
              {'>'} QUICK_LINKS
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/" className="text-zinc-500 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-zinc-500 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-zinc-500 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-zinc-500 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold mb-3 sm:mb-4 text-zinc-400 tracking-wider">
              {'>'} SERVICES
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li className="text-zinc-500">Web Development</li>
              <li className="text-zinc-500">UI/UX Design</li>
              <li className="text-zinc-500">Cybersecurity</li>
              <li className="text-zinc-500">Cloud Solutions</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold mb-3 sm:mb-4 text-zinc-400 tracking-wider">
              {'>'} CONTACT_INFO
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-500">
              <li className="break-all">contact@monochromeweb.com</li>
              <li>+880 12345 67890</li>
              <li>24/7 Support Available</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 text-xs sm:text-sm text-zinc-500">
          <p className="text-center md:text-left">
            © {currentYear} Monochrome Web Solutions. All rights reserved.
          </p>
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
