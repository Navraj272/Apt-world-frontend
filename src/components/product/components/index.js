import React, { useState, useMemo } from 'react';
import { productsData } from './productsData';

function ProductPage() {
  const [selectedCategory, setSelectedCategory] = useState('ALL PRODUCTS');
  const [sortBy, setSortBy] = useState('POPULARITY');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  const categories = [
    'ALL PRODUCTS',
    'POWER TOOLS',
    'WELDING EQUIPMENT',
    'CLEANING SOLUTIONS',
    'AGRI TOOLS',
    'AIR COMPRESSORS',
    'MEASURING INSTRUMENTS'
  ];

  // Reset pagination on filter or search change
  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (sortOption) => {
    setSortBy(sortOption);
    setIsSortDropdownOpen(false);
    setCurrentPage(1);
  };

  // Filter & Sort Logic
  const processedProducts = useMemo(() => {
    let result = [...productsData];

    // Filter by Category
    if (selectedCategory !== 'ALL PRODUCTS') {
      result = result.filter(
        (product) => product.category.toUpperCase() === selectedCategory.toUpperCase()
      );
    }

    // Filter by Search Query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.sku.toLowerCase().includes(query)
      );
    }

    // Apply Sorting
    if (sortBy === 'POPULARITY') {
      result.sort((a, b) => b.popularity - a.popularity);
    } else if (sortBy === 'PRICE_LOW_HIGH') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'PRICE_HIGH_LOW') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  // Pagination Logic
  const itemsPerPage = 8;
  const totalPages = Math.ceil(processedProducts.length / itemsPerPage) || 1;
  
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return processedProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [processedProducts, currentPage]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(price);
  };

  return (
    <div className="w-full min-h-screen bg-[#F8F9FA] text-[#060F1E] pt-24 font-montserrat">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#050D1A] text-white py-16 sm:py-24 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/png/hero_industrial_bg.png"
            alt="Industrial Background"
            className="w-full h-full object-cover object-center opacity-15 grayscale select-none pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050D1A]/95 via-[#050D1A]/85 to-[#050D1A]/95 z-10" />
        </div>

        {/* Content */}
        <div className="relative z-20 max-w-[1350px] w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="font-montserrat text-xs sm:text-sm font-black tracking-[0.25em] text-[#E11922] uppercase block">
            INDUSTRIAL CATALOGUE 2026
          </span>
          <h1 className="font-khand text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-none">
            ENGINEERED FOR <span className="text-[#E11922]">POWER.</span>
          </h1>
          <p className="font-montserrat text-sm sm:text-base text-gray-300 leading-relaxed max-w-[650px] font-medium pt-2">
            Explore our comprehensive range of high-performance industrial tools and machinery designed to exceed global standards of durability and precision.
          </p>
        </div>
      </section>

      {/* 2. FILTER CATEGORIES BAR */}
      <section className="bg-white border-y border-gray-100 sticky top-[69px] z-30 shadow-sm overflow-hidden">
        <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 overflow-x-auto py-4 scrollbar-hide">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`shrink-0 font-montserrat text-[10px] sm:text-xs font-bold tracking-widest px-5 py-3 rounded-sm transition-all duration-300 border ${
                    isActive
                      ? 'bg-[#E11922] text-white border-[#E11922] shadow-md shadow-[#E11922]/15'
                      : 'bg-[#F8F9FA] text-gray-600 border-transparent hover:border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. CURRENT INVENTORY SUB-HEADER */}
      <section className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-gray-200">
          
          {/* Section Header */}
          <div className="relative pb-2">
            <h2 className="font-khand text-2xl sm:text-3xl font-black uppercase tracking-wider text-gray-900">
              CURRENT INVENTORY
            </h2>
            {/* Red Underline Indicator */}
            <div className="absolute bottom-0 left-0 w-24 h-[3px] bg-[#E11922]" />
          </div>

          {/* Search and Sort controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            
            {/* Search Input field */}
            <div className="relative max-w-xs">
              <input
                type="text"
                placeholder="Search inventory..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full bg-white text-gray-900 border border-gray-200 focus:border-gray-400 focus:outline-none rounded-sm px-4 py-2.5 pl-10 text-xs font-medium placeholder-gray-400 transition-colors"
              />
              <svg
                className="w-4 h-4 text-gray-400 absolute left-3 top-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Custom Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                className="flex items-center justify-between gap-4 bg-white border border-gray-200 hover:border-gray-300 px-4 py-2.5 rounded-sm text-xs font-bold tracking-wider text-gray-800 transition-all min-w-[200px]"
              >
                <span>
                  SORT BY:{' '}
                  <span className="text-[#E11922]">
                    {sortBy === 'POPULARITY'
                      ? 'POPULARITY'
                      : sortBy === 'PRICE_LOW_HIGH'
                      ? 'PRICE: LOW - HIGH'
                      : 'PRICE: HIGH - LOW'}
                  </span>
                </span>
                <svg
                  className={`w-3.5 h-3.5 text-gray-500 transform transition-transform duration-300 ${
                    isSortDropdownOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isSortDropdownOpen && (
                <>
                  {/* Backdrop Click Shield */}
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsSortDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-1 w-full bg-white border border-gray-200 rounded-sm shadow-xl z-20 overflow-hidden py-1">
                    <button
                      onClick={() => handleSortChange('POPULARITY')}
                      className={`w-full text-left px-4 py-2.5 text-xs font-semibold hover:bg-gray-50 transition-colors ${
                        sortBy === 'POPULARITY' ? 'text-[#E11922] bg-red-50/20' : 'text-gray-700'
                      }`}
                    >
                      POPULARITY
                    </button>
                    <button
                      onClick={() => handleSortChange('PRICE_LOW_HIGH')}
                      className={`w-full text-left px-4 py-2.5 text-xs font-semibold hover:bg-gray-50 transition-colors ${
                        sortBy === 'PRICE_LOW_HIGH' ? 'text-[#E11922] bg-red-50/20' : 'text-gray-700'
                      }`}
                    >
                      PRICE: LOW - HIGH
                    </button>
                    <button
                      onClick={() => handleSortChange('PRICE_HIGH_LOW')}
                      className={`w-full text-left px-4 py-2.5 text-xs font-semibold hover:bg-gray-50 transition-colors ${
                        sortBy === 'PRICE_HIGH_LOW' ? 'text-[#E11922] bg-red-50/20' : 'text-gray-700'
                      }`}
                    >
                      PRICE: HIGH - LOW
                    </button>
                  </div>
                </>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 4. PRODUCTS GRID */}
      <section className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {paginatedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {paginatedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-100 hover:border-gray-300 rounded-sm shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                {/* Image Area */}
                <div className="relative aspect-[4/3] w-full bg-gray-50 overflow-hidden shrink-0">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Badge overlays */}
                  {product.badge && (
                    <div
                      className={`absolute top-3 ${
                        product.badge === 'IN STOCK' ? 'right-3' : 'left-3'
                      } px-2.5 py-1 rounded-sm text-[8px] sm:text-[9px] font-black tracking-widest text-white shadow-sm`}
                      style={{
                        backgroundColor:
                          product.badgeType === 'success'
                            ? '#10B981' // Green
                            : product.badgeType === 'warning'
                            ? '#F59E0B' // Orange/Yellow
                            : '#E11922' // Red
                      }}
                    >
                      {product.badge}
                    </div>
                  )}
                </div>

                {/* Info Area */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="font-montserrat text-[9px] sm:text-[10px] font-black tracking-widest text-gray-400 uppercase block">
                      {product.subcategory}
                    </span>
                    <h3 className="font-khand text-xl font-bold tracking-wide text-gray-900 group-hover:text-[#E11922] transition-colors duration-300 leading-snug uppercase">
                      {product.title}
                    </h3>
                    <span className="font-mono text-[10px] text-gray-400 block tracking-wider">
                      {product.sku}
                    </span>
                  </div>

                  {/* Pricing and Action */}
                  <div className="flex items-center justify-between pt-6 mt-4 border-t border-gray-100">
                    <div className="space-y-0.5">
                      <span className="font-montserrat text-[9px] font-bold text-gray-400 tracking-wider uppercase block">
                        Price per Unit
                      </span>
                      <span className="font-outfit text-base sm:text-lg font-black text-[#E11922] tracking-tight">
                        {formatPrice(product.price)}
                      </span>
                    </div>

                    <button
                      onClick={() => alert(`Enquiry request sent for ${product.title}`)}
                      className="bg-[#060F1E] text-white font-montserrat text-[9px] sm:text-[10px] font-bold tracking-widest px-4 py-2.5 rounded-sm hover:bg-[#E11922] transition-colors duration-300 shadow-md shadow-[#060F1E]/10 uppercase shrink-0"
                    >
                      ENQUIRE
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-gray-100 rounded-sm">
            <svg
              className="w-12 h-12 text-gray-300 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="font-khand text-2xl font-bold uppercase tracking-wider text-gray-800">
              No Products Found
            </h3>
            <p className="font-montserrat text-xs text-gray-400 mt-2">
              Try adjusting your filters or search keywords.
            </p>
          </div>
        )}
      </section>

      {/* 5. PAGINATION CONTROLS */}
      {totalPages > 1 && (
        <section className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="flex items-center justify-center gap-2">
            
            {/* Prev Page */}
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className={`w-10 h-10 border border-gray-200 flex items-center justify-center rounded-sm hover:border-gray-400 transition-colors ${
                currentPage === 1 ? 'opacity-40 cursor-not-allowed' : ''
              }`}
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }).map((_, idx) => {
              const pageNum = idx + 1;
              const isCurrent = pageNum === currentPage;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-10 h-10 border flex items-center justify-center rounded-sm text-xs font-bold tracking-wide transition-all ${
                    isCurrent
                      ? 'bg-[#E11922] border-[#E11922] text-white shadow-md shadow-[#E11922]/15'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            {/* Next Page */}
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`w-10 h-10 border border-gray-200 flex items-center justify-center rounded-sm hover:border-gray-400 transition-colors ${
                currentPage === totalPages ? 'opacity-40 cursor-not-allowed' : ''
              }`}
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

          </div>
        </section>
      )}

      {/* 6. DIAGONAL CTA BANNER */}
      <section className="bg-white py-16 sm:py-24 border-t border-gray-100">
        <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div
            className="relative text-white p-8 sm:p-12 md:p-16 border border-white/5 shadow-2xl overflow-hidden rounded-sm"
            style={{
              background: 'repeating-linear-gradient(45deg, #050D1A, #050D1A 12px, #0A1425 12px, #0A1425 24px)',
              clipPath: 'polygon(0 0, 100% 0, 100% 90%, 98% 100%, 0 100%)'
            }}
          >
            {/* Technical grid line decoration overlay */}
            <div className="absolute inset-0 opacity-5 pointer-events-none select-none">
              <svg width="100%" height="100%">
                <defs>
                  <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-pattern)" />
              </svg>
            </div>
            
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
              {/* Text */}
              <div className="space-y-4 max-w-[650px]">
                <h2 className="font-khand text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white leading-none">
                  READY TO EQUIP YOUR FACILITY?
                </h2>
                <p className="font-montserrat text-xs sm:text-sm text-gray-400 font-medium leading-relaxed">
                  Contact our industrial consultants today for customized bulk quotations and technical support across our entire product range.
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/assets/pdf/catalogue2026.pdf"
                  download
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Industrial catalogue download initiated.');
                  }}
                  className="text-center font-montserrat text-xs font-bold tracking-widest text-white bg-[#E11922] px-8 py-4.5 rounded-sm hover:bg-transparent hover:border-[#E11922] hover:text-[#E11922] border border-transparent transition-all duration-300 shadow-lg shadow-[#E11922]/15 uppercase"
                >
                  DOWNLOAD CATALOGUE
                </a>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      window.location.href = '/#contact';
                    }
                  }}
                  className="text-center font-montserrat text-xs font-bold tracking-widest text-white border border-white/20 px-8 py-4.5 rounded-sm hover:bg-white hover:text-[#050D1A] hover:border-white transition-all duration-300 uppercase"
                >
                  CONTACT SALES
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}

export default ProductPage;
