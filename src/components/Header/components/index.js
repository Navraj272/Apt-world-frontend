import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { categoriesTree } from '@/common/categoriesData';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [activeLevel1, setActiveLevel1] = useState('Power Tools');
  const [activeLevel2, setActiveLevel2] = useState('Cordless');
  const router = useRouter();

  const isProducts = router.pathname.startsWith('/products');
  const isAboutUs = router.pathname === '/about-us';
  const isContact = router.pathname === '/contact';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on route changes
  useEffect(() => {
    setIsCategoriesOpen(false);
    setIsOpen(false);
  }, [router.asPath]);

  const navLinks = [
    { name: 'Categories', href: '#', isDropdown: true },
    { name: 'Products', href: '/products', active: isProducts },
    {
      name: 'FRANCHISE',
      href: '/franchise',
      active: false,
    },
    { name: 'Contact Us', href: '/contact', active: isContact },
    { name: 'About', href: '/about-us', active: isAboutUs },
  ];

  // Helper to get active subcategories
  const currentSubcategories =
    categoriesTree.find((cat) => cat.name === activeLevel1)?.subcategories ||
    [];

  // Helper to get active level 3 items
  const currentItems =
    currentSubcategories.find((sub) => sub.name === activeLevel2)?.items || [];

  const handleLevel1Hover = (name) => {
    setActiveLevel1(name);
    // Auto-select the first subcategory of the new category
    const subs =
      categoriesTree.find((cat) => cat.name === name)?.subcategories || [];
    if (subs.length > 0) {
      setActiveLevel2(subs[0].name);
    } else {
      setActiveLevel2('');
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#060F1E]/95 backdrop-blur-md border-b border-white/10 shadow-lg py-3'
          : 'bg-[#060F1E]/80 backdrop-blur-sm border-b border-white/5 py-4'
      }`}
    >
      {/* Click-away Backdrop for Dropdown */}
      {isCategoriesOpen && (
        <div
          className="fixed inset-0 z-40 bg-transparent"
          onClick={() => setIsCategoriesOpen(false)}
        />
      )}

      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center relative z-50">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 group">
          <span className="font-khand text-2xl sm:text-3xl font-extrabold tracking-wider text-white">
            APT{' '}
            <span className="text-[#E11922] transition-colors duration-300 group-hover:text-white">
              WORLD
            </span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden xl:flex items-center gap-6">
          {navLinks.map((link) => {
            if (link.isDropdown) {
              return (
                <button
                  key={link.name}
                  onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                  className={`font-montserrat text-xs font-semibold tracking-wider relative py-2 transition-colors duration-300 flex items-center gap-1 focus:outline-none ${
                    isCategoriesOpen
                      ? 'text-[#E11922]'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.name.toUpperCase()}
                  <svg
                    className={`w-3.5 h-3.5 transform transition-transform duration-300 ${
                      isCategoriesOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              );
            }
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`font-montserrat text-xs font-semibold tracking-wider relative py-2 transition-colors duration-300 ${
                  link.active
                    ? 'text-[#E11922]'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.name.toUpperCase()}
                {link.active && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#E11922] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Button & Search */}
        <div className="hidden xl:flex items-center gap-4">
          {/* Search Icon */}
          <button
            onClick={() => alert('Search functionality coming soon')}
            className="text-gray-300 hover:text-white focus:outline-none p-1.5"
            aria-label="Search"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          {/* Cloud login button */}
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert('Cloud Login functionality coming soon');
            }}
            className="font-montserrat text-xs font-semibold tracking-wider text-white border border-gray-300/40 rounded-full px-5 py-2 hover:bg-white hover:text-[#060F1E] hover:border-white transition-all duration-300"
          >
            Cloud login
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="xl:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="text-gray-300 hover:text-white focus:outline-none p-1"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* 3-Panel Cascading Category Dropdown (Desktop Only) */}
      {isCategoriesOpen && (
        <div className="absolute left-0 top-full w-full bg-white border-t border-gray-100 shadow-2xl z-50 text-gray-900 grid grid-cols-1 md:grid-cols-3 max-h-[500px]">
          {/* Panel 1: Level 1 Categories */}
          <div className="bg-[#F8F9FA] border-r border-gray-100 py-4 px-2 overflow-y-auto max-h-[500px] scrollbar-thin">
            <ul className="space-y-1">
              {categoriesTree.map((cat) => {
                const isActive = activeLevel1 === cat.name;
                return (
                  <li key={cat.name}>
                    <button
                      onMouseEnter={() => handleLevel1Hover(cat.name)}
                      onClick={() => handleLevel1Hover(cat.name)}
                      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-sm font-montserrat text-xs sm:text-sm font-bold uppercase transition-colors text-left focus:outline-none ${
                        isActive
                          ? 'text-[#E11922] bg-[#E11922]/5'
                          : 'text-gray-700 hover:text-[#E11922] hover:bg-gray-100/50'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Panel 2: Level 2 Subcategories */}
          <div className="bg-white border-r border-gray-100 py-4 px-2 overflow-y-auto max-h-[500px] scrollbar-thin">
            {currentSubcategories.length > 0 ? (
              <ul className="space-y-1">
                {currentSubcategories.map((sub) => {
                  const isActive = activeLevel2 === sub.name;
                  return (
                    <li key={sub.name}>
                      <button
                        onMouseEnter={() => setActiveLevel2(sub.name)}
                        onClick={() => setActiveLevel2(sub.name)}
                        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-sm font-montserrat text-xs sm:text-sm font-bold uppercase transition-colors text-left focus:outline-none ${
                          isActive
                            ? 'text-[#E11922] bg-[#E11922]/5'
                            : 'text-gray-600 hover:text-[#E11922] hover:bg-gray-50'
                        }`}
                      >
                        <span>{sub.name}</span>
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="text-center py-10 font-montserrat text-xs text-gray-400">
                No Subcategories
              </div>
            )}
          </div>

          {/* Panel 3: Level 3 Items (Redirectable links) */}
          <div className="bg-[#FAFBFB]/50 py-4 px-2 overflow-y-auto max-h-[500px] scrollbar-thin">
            {currentItems.length > 0 ? (
              <ul className="space-y-1">
                {currentItems.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`/categories/${item.slug}/${item.id}`}
                      className="w-full flex items-center px-4 py-2.5 rounded-sm font-montserrat text-xs sm:text-sm font-semibold uppercase text-gray-600 hover:text-[#E11922] hover:bg-gray-50 text-left transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-10 font-montserrat text-xs text-gray-400">
                No items in this category
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Menu Dropdown */}
      <div
        className={`xl:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen border-b border-white/10' : 'max-h-0'
        } bg-[#060F1E]/95 backdrop-blur-lg`}
      >
        <div className="px-4 pt-2 pb-6 space-y-3">
          {/* Categories Accordion Trigger */}
          <div>
            <button
              onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-md font-montserrat text-sm font-medium tracking-wider text-gray-300 hover:bg-white/5 hover:text-white"
            >
              <span>CATEGORIES</span>
              <svg
                className={`w-4 h-4 transform transition-transform duration-300 ${
                  isCategoriesOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isCategoriesOpen && (
              <div className="pl-6 pt-2 space-y-2 border-l border-white/10 mt-1 max-h-[300px] overflow-y-auto">
                {categoriesTree.map((cat) => (
                  <div key={cat.name} className="space-y-1">
                    <span className="block font-montserrat text-[10px] font-bold text-gray-500 uppercase tracking-widest pt-2">
                      {cat.name}
                    </span>
                    {cat.subcategories.map((sub) => (
                      <div key={sub.name} className="pl-2">
                        {sub.items.map((item) => (
                          <Link
                            key={item.id}
                            href={`/categories/${item.slug}/${item.id}`}
                            onClick={() => setIsOpen(false)}
                            className="block py-1 text-xs text-gray-400 hover:text-white"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          {navLinks
            .filter((l) => !l.isDropdown)
            .map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md font-montserrat text-sm font-medium tracking-wider transition-colors ${
                  link.active
                    ? 'bg-[#E11922]/10 text-[#E11922]'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {link.name.toUpperCase()}
              </Link>
            ))}

          <div className="pt-2 px-3 flex flex-col gap-3">
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(false);
                alert('Cloud Login functionality coming soon');
              }}
              className="block text-center font-montserrat text-xs font-bold tracking-widest text-white border border-white/20 py-3 rounded-full hover:bg-white hover:text-[#060F1E]"
            >
              Cloud login
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
