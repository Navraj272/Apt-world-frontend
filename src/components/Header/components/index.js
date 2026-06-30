import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import GlobalSearch from '@/components/GlobalSearch';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();

  const isProducts = router.pathname.startsWith('/products') || router.pathname.startsWith('/categories');
  const isAboutUs = router.pathname === '/about-us';
  const isContact = router.pathname === '/contact';
  const isFranchise = router.pathname === '/franchise';
  const isRental = router.pathname.startsWith('/rental');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [router.asPath]);

  useEffect(() => {
    document.body.style.overflow = isSearchOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isSearchOpen]);

  const navLinks = [
    { name: 'Products', href: '/products', active: isProducts },
    { name: 'Rental', href: '/rental', active: isRental },
    { name: 'FRANCHISE', href: '/franchise', active: isFranchise },
    { name: 'Contact Us', href: '/contact', active: isContact },
    { name: 'About', href: '/about-us', active: isAboutUs },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white shadow-md border-b border-gray-200 py-3'
            : 'bg-white/95 backdrop-blur-sm border-b border-gray-200 py-4'
        }`}
      >
        <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center relative z-50">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 group">
            <span className="font-khand text-2xl sm:text-3xl font-extrabold tracking-wider text-[var(--apt-navy)]">
              APT{' '}
              <span className="text-[var(--apt-red)] transition-colors duration-300">
                WORLD
              </span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`font-montserrat text-xs font-semibold tracking-wider relative py-2 transition-colors duration-300 ${
                  link.active
                    ? 'text-[var(--apt-red)]'
                    : 'text-[#404040] hover:text-[var(--apt-navy)]'
                }`}
              >
                {link.name.toUpperCase()}
                {link.active && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--apt-red)] rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right: Search + Mobile menu */}
          <div className="flex items-center gap-3">
            {/* Search button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-[var(--apt-red)]/30 rounded-xl px-3 py-2 transition-all duration-200 group"
              aria-label="Search products"
            >
              <svg
                className="w-4 h-4 text-[#404040] group-hover:text-[var(--apt-red)] transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="hidden sm:block font-montserrat text-[10px] font-semibold tracking-wider text-[#404040] group-hover:text-[var(--apt-navy)] transition-colors">
                SEARCH
              </span>
              <span className="hidden lg:flex items-center gap-1 border border-gray-200 rounded-md px-1.5 py-0.5">
                <span className="font-montserrat text-[9px] text-gray-400">⌘K</span>
              </span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="xl:hidden text-[#404040] hover:text-[var(--apt-navy)] focus:outline-none p-1"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`xl:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-screen border-b border-gray-200' : 'max-h-0'
          } bg-white`}
        >
          <div className="px-4 pt-2 pb-6 space-y-1">
            {/* Mobile Search */}
            <button
              onClick={() => { setIsOpen(false); setIsSearchOpen(true); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-montserrat text-sm font-medium tracking-wider text-[#404040] hover:bg-gray-50 hover:text-[var(--apt-navy)] mb-2"
            >
              <svg className="w-4 h-4 text-[var(--apt-red)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              SEARCH PRODUCTS
            </button>

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2.5 rounded-xl font-montserrat text-sm font-medium tracking-wider transition-colors ${
                  link.active
                    ? 'bg-[var(--apt-red)]/10 text-[var(--apt-red)]'
                    : 'text-[#404040] hover:bg-gray-50 hover:text-[var(--apt-navy)]'
                }`}
              >
                {link.name.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Global Search Overlay */}
      <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}

export default Header;
