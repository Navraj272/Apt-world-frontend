import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import GlobalSearch from '@/components/GlobalSearch';
import { getAllCategories, getAllSubcategories } from '@/services/getRequests';

const nameOf = (item) => (item?.name && (item.name.en || item.name.EN)) || item?.slug || '';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFranchiseDropdownOpen, setIsFranchiseDropdownOpen] = useState(false);
  const [isMobileFranchiseOpen, setIsMobileFranchiseOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false);
  const [hoveredCategoryId, setHoveredCategoryId] = useState(null);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const [mobileCategoryId, setMobileCategoryId] = useState(null);
  const productsCloseTimer = useRef(null);
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
    setIsProductsMenuOpen(false);
  }, [router.asPath]);

  useEffect(() => {
    getAllCategories().then((res) => {
      if (res?.categories) setCategories(res.categories);
    }).catch(() => {});
    getAllSubcategories({ limit: 500 }).then((res) => {
      if (res?.subcategories) setSubcategories(res.subcategories);
    }).catch(() => {});
    return () => clearTimeout(productsCloseTimer.current);
  }, []);

  const openProductsMenu = () => {
    clearTimeout(productsCloseTimer.current);
    setIsProductsMenuOpen(true);
    setHoveredCategoryId((prev) => prev || categories[0]?.id || null);
  };
  const closeProductsMenu = () => {
    clearTimeout(productsCloseTimer.current);
    productsCloseTimer.current = setTimeout(() => setIsProductsMenuOpen(false), 160);
  };
  const subsOf = (catId) => subcategories.filter((s) => s.categoryId === catId);
  const activeCategory = categories.find((c) => c.id === hoveredCategoryId) || categories[0];
  const activeSubs = activeCategory ? subsOf(activeCategory.id) : [];

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
            {/* Products mega dropdown */}
            <div
              className="relative"
              onMouseEnter={openProductsMenu}
              onMouseLeave={closeProductsMenu}
              onFocus={openProductsMenu}
              onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) closeProductsMenu(); }}
            >
              <Link
                href="/products"
                aria-haspopup="true"
                aria-expanded={isProductsMenuOpen}
                className={`flex items-center gap-1 font-montserrat text-xs font-semibold tracking-wider relative py-2 transition-colors duration-300 ${
                  isProducts || isProductsMenuOpen ? 'text-[var(--apt-red)]' : 'text-[#404040] hover:text-[var(--apt-navy)]'
                }`}
              >
                PRODUCTS
                <svg
                  className={`w-3 h-3 transition-transform duration-200 ${isProductsMenuOpen ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
                {(isProducts || isProductsMenuOpen) && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--apt-red)] rounded-full" />}
              </Link>

              {/* hover bridge + panel */}
              <div
                className={`absolute top-full left-0 pt-4 z-50 transition-all duration-200 ease-out ${
                  isProductsMenuOpen && categories.length > 0
                    ? 'opacity-100 translate-y-0 pointer-events-auto visible'
                    : 'opacity-0 -translate-y-2 pointer-events-none invisible'
                }`}
              >
                <div className="flex w-[820px] min-h-[420px] max-h-[75vh] rounded-2xl border border-white/60 bg-white/75 backdrop-blur-xl shadow-[0_20px_50px_rgba(6,15,30,0.18)] overflow-hidden">
                  {/* Categories */}
                  <ul className="w-[320px] shrink-0 overflow-y-auto py-4 bg-white/40 border-r border-gray-200/60">
                    {categories.map((cat) => {
                      const isHovered = activeCategory?.id === cat.id;
                      return (
                        <li key={cat.id}>
                          <Link
                            href={`/products?category=${cat.slug}`}
                            onMouseEnter={() => setHoveredCategoryId(cat.id)}
                            onFocus={() => setHoveredCategoryId(cat.id)}
                            onClick={() => setIsProductsMenuOpen(false)}
                            className={`group flex items-center justify-between gap-3 mx-3 px-4 py-3 rounded-xl font-montserrat text-[13px] font-semibold tracking-wide transition-all duration-200 ${
                              isHovered
                                ? 'bg-[var(--apt-red)]/10 text-[var(--apt-red)] translate-x-0.5'
                                : 'text-[#404040] hover:text-[var(--apt-navy)]'
                            }`}
                          >
                            <span>{nameOf(cat).toUpperCase()}</span>
                            <svg className={`w-3 h-3 shrink-0 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-30'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>

                  {/* Subcategories */}
                  <div className="flex-1 overflow-y-auto p-7">
                    {activeCategory && (
                      <div key={activeCategory.id} className="animate-[fadeIn_0.2s_ease-out]">
                        <Link
                          href={`/products?category=${activeCategory.slug}`}
                          onClick={() => setIsProductsMenuOpen(false)}
                          className="inline-block font-khand text-2xl font-bold tracking-wider text-[var(--apt-navy)] hover:text-[var(--apt-red)] transition-colors"
                        >
                          {nameOf(activeCategory).toUpperCase()}
                        </Link>
                        <div className="h-[2px] w-10 bg-[var(--apt-red)] rounded-full mt-1.5 mb-4" />
                        {activeSubs.length > 0 ? (
                          <ul className="space-y-0.5">
                            {activeSubs.map((sub) => (
                              <li key={sub.id}>
                                <Link
                                  href={`/products?subcategory=${sub.slug}`}
                                  onClick={() => setIsProductsMenuOpen(false)}
                                  className="block px-4 py-2.5 rounded-lg font-montserrat text-sm font-medium text-[#404040] hover:bg-[var(--apt-red)]/10 hover:text-[var(--apt-red)] hover:translate-x-1 transition-all duration-200"
                                >
                                  {nameOf(sub)}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="font-montserrat text-sm text-gray-400">No subcategories yet.</p>
                        )}
                        <Link
                          href={`/products?category=${activeCategory.slug}`}
                          onClick={() => setIsProductsMenuOpen(false)}
                          className="inline-block mt-5 font-montserrat text-xs font-bold tracking-widest text-[var(--apt-red)] hover:underline"
                        >
                          VIEW ALL →
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
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

            {/* Mobile Products accordion */}
            <button
              onClick={() => setIsMobileProductsOpen((prev) => !prev)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-montserrat text-sm font-medium tracking-wider transition-colors ${
                isProducts ? 'bg-[var(--apt-red)]/10 text-[var(--apt-red)]' : 'text-[#404040] hover:bg-gray-50 hover:text-[var(--apt-navy)]'
              }`}
            >
              PRODUCTS
              <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${isMobileProductsOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isMobileProductsOpen && (
              <div className="pl-4 space-y-1 max-h-[50vh] overflow-y-auto">
                <Link href="/products" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-xl font-montserrat text-xs font-medium tracking-wider text-[#697486] hover:bg-gray-50">
                  ALL PRODUCTS
                </Link>
                {categories.map((cat) => {
                  const subs = subsOf(cat.id);
                  const expanded = mobileCategoryId === cat.id;
                  return (
                    <div key={cat.id}>
                      <div className="flex items-center">
                        <Link href={`/products?category=${cat.slug}`} onClick={() => setIsOpen(false)} className="flex-1 px-3 py-2 rounded-xl font-montserrat text-xs font-semibold tracking-wider text-[#404040] hover:bg-gray-50">
                          {nameOf(cat).toUpperCase()}
                        </Link>
                        {subs.length > 0 && (
                          <button onClick={() => setMobileCategoryId(expanded ? null : cat.id)} aria-label="Toggle subcategories" className="p-2 text-[#404040]">
                            <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        )}
                      </div>
                      {expanded && (
                        <div className="pl-4 space-y-0.5">
                          {subs.map((sub) => (
                            <Link key={sub.id} href={`/products?subcategory=${sub.slug}`} onClick={() => setIsOpen(false)} className="block px-3 py-1.5 rounded-lg font-montserrat text-xs text-[#697486] hover:text-[var(--apt-red)]">
                              {nameOf(sub)}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {navLinks.slice(1, 2).map((link) => (
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
