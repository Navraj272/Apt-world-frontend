import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import GlobalSearch from '@/components/GlobalSearch';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFranchiseDropdownOpen, setIsFranchiseDropdownOpen] = useState(false);
  const [isMobileFranchiseOpen, setIsMobileFranchiseOpen] = useState(false);
  const router = useRouter();
  const franchiseDropdownRef = useRef(null);

  const isProducts = router.pathname.startsWith('/products') || router.pathname.startsWith('/categories');
  const isAboutUs = router.pathname === '/about-us';
  const isContact = router.pathname === '/contact';
  const isFranchise = router.pathname.startsWith('/franchise');
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

  useEffect(() => {
    const handleOutside = (e) => {
      if (franchiseDropdownRef.current && !franchiseDropdownRef.current.contains(e.target)) {
        setIsFranchiseDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { name: 'Products', href: '/products', active: isProducts },
    { name: 'Rental', href: '/rental', active: isRental },
    { name: 'Contact Us', href: '/contact', active: isContact },
    { name: 'About', href: '/about-us', active: isAboutUs },
  ];

  const franchiseOptions = [
    { name: 'Become a Franchise', href: '/franchise' },
    { name: 'Franchise Locator', href: '/franchise/locator' },
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
            <Link
              href="/products"
              className={`font-montserrat text-xs font-semibold tracking-wider relative py-2 transition-colors duration-300 ${
                isProducts ? 'text-[var(--apt-red)]' : 'text-[#404040] hover:text-[var(--apt-navy)]'
              }`}
            >
              PRODUCTS
              {isProducts && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--apt-red)] rounded-full" />}
            </Link>
            <Link
              href="/rental"
              className={`font-montserrat text-xs font-semibold tracking-wider relative py-2 transition-colors duration-300 ${
                isRental ? 'text-[var(--apt-red)]' : 'text-[#404040] hover:text-[var(--apt-navy)]'
              }`}
            >
              RENTAL
              {isRental && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--apt-red)] rounded-full" />}
            </Link>

            {/* Franchise Dropdown */}
            <div className="relative" ref={franchiseDropdownRef}>
              <button
                onClick={() => setIsFranchiseDropdownOpen((prev) => !prev)}
                className={`flex items-center gap-1 font-montserrat text-xs font-semibold tracking-wider relative py-2 transition-colors duration-300 ${
                  isFranchise ? 'text-[var(--apt-red)]' : 'text-[#404040] hover:text-[var(--apt-navy)]'
                }`}
              >
                FRANCHISE
                <svg
                  className={`w-3 h-3 transition-transform duration-200 ${isFranchiseDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
                {isFranchise && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--apt-red)] rounded-full" />}
              </button>

              {isFranchiseDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden py-2 z-50">
                  {franchiseOptions.map((opt) => (
                    <Link
                      key={opt.href}
                      href={opt.href}
                      onClick={() => setIsFranchiseDropdownOpen(false)}
                      className={`block px-4 py-2.5 font-montserrat text-xs font-semibold tracking-wide transition-colors ${
                        router.pathname === opt.href
                          ? 'text-[var(--apt-red)] bg-red-50/30'
                          : 'text-[#404040] hover:bg-gray-50 hover:text-[var(--apt-navy)]'
                      }`}
                    >
                      {opt.name.toUpperCase()}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/contact"
              className={`font-montserrat text-xs font-semibold tracking-wider relative py-2 transition-colors duration-300 ${
                isContact ? 'text-[var(--apt-red)]' : 'text-[#404040] hover:text-[var(--apt-navy)]'
              }`}
            >
              CONTACT US
              {isContact && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--apt-red)] rounded-full" />}
            </Link>
            <Link
              href="/about-us"
              className={`font-montserrat text-xs font-semibold tracking-wider relative py-2 transition-colors duration-300 ${
                isAboutUs ? 'text-[var(--apt-red)]' : 'text-[#404040] hover:text-[var(--apt-navy)]'
              }`}
            >
              ABOUT
              {isAboutUs && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--apt-red)] rounded-full" />}
            </Link>
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

            {navLinks.slice(0, 2).map((link) => (
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

            {/* Mobile Franchise accordion */}
            <button
              onClick={() => setIsMobileFranchiseOpen((prev) => !prev)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-montserrat text-sm font-medium tracking-wider transition-colors ${
                isFranchise ? 'bg-[var(--apt-red)]/10 text-[var(--apt-red)]' : 'text-[#404040] hover:bg-gray-50 hover:text-[var(--apt-navy)]'
              }`}
            >
              FRANCHISE
              <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${isMobileFranchiseOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isMobileFranchiseOpen && (
              <div className="pl-4 space-y-1">
                {franchiseOptions.map((opt) => (
                  <Link
                    key={opt.href}
                    href={opt.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2 rounded-xl font-montserrat text-xs font-medium tracking-wider transition-colors ${
                      router.pathname === opt.href
                        ? 'text-[var(--apt-red)]'
                        : 'text-[#697486] hover:bg-gray-50 hover:text-[var(--apt-navy)]'
                    }`}
                  >
                    {opt.name.toUpperCase()}
                  </Link>
                ))}
              </div>
            )}

            {navLinks.slice(2).map((link) => (
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
