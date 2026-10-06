import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer id="contact" className="bg-[var(--apt-navy)] text-white pt-16 sm:pt-20 pb-8 border-t border-white/5 relative z-20">
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-16 pb-12 sm:pb-16 border-b border-white/5">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 space-y-6">
            <span className="font-khand text-2xl font-extrabold tracking-wider text-white">
              APT <span className="text-[var(--apt-red)]">WORLD</span>
            </span>
            <p className="font-montserrat text-xs sm:text-sm text-gray-400 font-medium leading-relaxed max-w-[320px]">
              Leading provider of industrial tools and equipment across India. Engineered for power, designed for precision, and trusted by professionals.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-[var(--apt-red)] hover:border-[var(--apt-red)] text-gray-300 hover:text-white transition-all duration-300"
                aria-label="Website"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-[var(--apt-red)] hover:border-[var(--apt-red)] text-gray-300 hover:text-white transition-all duration-300"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>
              <a
                href="tel:+919999999999"
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-[var(--apt-red)] hover:border-[var(--apt-red)] text-gray-300 hover:text-white transition-all duration-300"
                aria-label="Phone Support"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Products Links */}
          <div className="lg:col-span-2 space-y-5">
            <h3 className="font-khand text-sm sm:text-base font-extrabold tracking-widest text-white uppercase">
              PRODUCTS
            </h3>
              <ul className="space-y-3 font-montserrat text-xs sm:text-sm text-gray-400 font-semibold">
                <li>
                  <Link href="/products" className="hover:text-[var(--apt-red)] transition-colors duration-200">All Products</Link>
                </li>
                <li>
                  <Link href="/rental" className="hover:text-[var(--apt-red)] transition-colors duration-200">Rental Equipment</Link>
                </li>
                <li>
                  <Link href="/categories/power-tools" className="hover:text-[var(--apt-red)] transition-colors duration-200">Power Tools</Link>
                </li>
                <li>
                  <Link href="/categories/welding-machines" className="hover:text-[var(--apt-red)] transition-colors duration-200">Welding Machines</Link>
                </li>
                <li>
                  <Link href="/categories/cleaning-solutions" className="hover:text-[var(--apt-red)] transition-colors duration-200">Cleaning Solutions</Link>
                </li>
                <li>
                  <Link href="/categories/agriculture-machines" className="hover:text-[var(--apt-red)] transition-colors duration-200">Agri Machinery</Link>
                </li>
              </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="lg:col-span-2 space-y-5">
            <h3 className="font-khand text-sm sm:text-base font-extrabold tracking-widest text-white uppercase">
              QUICK LINKS
            </h3>
            <ul className="space-y-3 font-montserrat text-xs sm:text-sm text-gray-400 font-semibold">
              <li>
                <Link href="/rental" className="hover:text-[var(--apt-red)] transition-colors duration-200">Rental Equipment</Link>
              </li>
              <li>
                <Link href="/franchise" className="hover:text-[var(--apt-red)] transition-colors duration-200">Franchise Model</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[var(--apt-red)] transition-colors duration-200">Contact Support</Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-[var(--apt-red)] transition-colors duration-200">About Us</Link>
              </li>
              <li>
                <a href="mailto:info.aptworld@gmail.com" className="hover:text-[var(--apt-red)] transition-colors duration-200">info.aptworld@gmail.com</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="lg:col-span-4 space-y-5">
            <h3 className="font-khand text-sm sm:text-base font-extrabold tracking-widest text-white uppercase">
              NEWSLETTER
            </h3>
            <p className="font-montserrat text-xs sm:text-sm text-gray-400 font-medium leading-relaxed">
              For the latest industrial insights, tech releases, and product launches.
            </p>
            {/* Newsletter Input Form */}
            <form onSubmit={(e) => e.preventDefault()} className="relative flex items-center mt-4">
              <input
                type="email"
                placeholder="Email address"
                required
                className="w-full bg-white/5 border border-white/10 rounded-sm py-3.5 pl-4 pr-14 text-white text-xs sm:text-sm font-montserrat focus:outline-none focus:border-[var(--apt-red)]/50 placeholder-gray-500"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 bg-[var(--apt-red)] text-white px-4 rounded-sm flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300"
                aria-label="Subscribe"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          </div>

        </div>

        {/* Bottom copyright and credits */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 font-montserrat text-[10px] sm:text-xs text-gray-500 font-semibold tracking-wider uppercase text-center sm:text-left">
          <div>
            &copy; {new Date().getFullYear()} APT WORLD. All rights reserved. Industrial excellence since 1989.
          </div>
          <div className="flex items-center gap-2">
            <a href="/admin" className="text-gray-500 hover:text-[var(--apt-red)] transition-colors tracking-widest">ADMIN</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
