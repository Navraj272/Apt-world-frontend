import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllProducts, getAllCategories, getAllSubcategories } from '@/services/getRequests';

const slugify = (text) => {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

const getProductName = (product) => {
  if (!product.name) return '';
  if (typeof product.name === 'string') return product.name;
  return product.name.en || product.name.EN || '';
};

const getProductImage = (product) => {
  if (product.images && product.images.length > 0) {
    return product.images[0];
  }
  if (product.thumbnail) return product.thumbnail;
  return '/assets/png/products/rotary_hammer.png';
};

function ProductPage() {
  const router = useRouter();
  const { subcategory: subcategorySlug, search: urlSearch } = router.query;

  const [allCategories, setAllCategories] = useState([]);
  const [allSubcategories, setAllSubcategories] = useState([]);
  const [subcategoriesForCat, setSubcategoriesForCat] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortBy, setSortBy] = useState('PRICE_LOW_HIGH');
  const [searchQuery, setSearchQuery] = useState(urlSearch || '');
  const [debouncedSearch, setDebouncedSearch] = useState(urlSearch || '');
  const [currentPage, setCurrentPage] = useState(1);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    getAllCategories().then((res) => {
      if (res && res.categories) setAllCategories(res.categories);
    }).catch(() => {});
    getAllSubcategories({ limit: 500 }).then((res) => {
      if (res && res.subcategories) setAllSubcategories(res.subcategories);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    if (subcategorySlug) {
      getAllSubcategories().then((res) => {
        if (res && res.subcategories) {
          const found = res.subcategories.find(
            (s) => s.slug === subcategorySlug
          );
          if (found) {
            setSelectedCategory(found.categoryId);
          }
        }
      }).catch(() => {});
    }
  }, [subcategorySlug]);

  useEffect(() => {
    if (urlSearch) {
      setSearchQuery(urlSearch);
      setDebouncedSearch(urlSearch);
    }
  }, [urlSearch]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        pageNo: currentPage,
        limit: 8,
        isActive: true,
      };
      if (selectedSubcategory) params.subcategoryId = selectedSubcategory;
      else if (selectedCategory) params.categoryId = selectedCategory;
      if (debouncedSearch.trim()) params.search = debouncedSearch.trim();
      if (sortBy === 'PRICE_LOW_HIGH') params.order = 'price_asc';
      if (sortBy === 'PRICE_HIGH_LOW') params.order = 'price_desc';

      const [res] = await Promise.all([
        getAllProducts(params),
        new Promise((resolve) => setTimeout(resolve, 600)), // Minimum 600ms loading for better UX
      ]);
      if (res) {
        setProducts(res.products || []);
        setTotalPages(res.totalPages || 1);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to fetch products:', err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, selectedCategory, selectedSubcategory, debouncedSearch, sortBy]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (selectedCategory) {
      const subs = allSubcategories.filter((s) => s.categoryId === selectedCategory);
      setSubcategoriesForCat(subs);
    } else {
      setSubcategoriesForCat([]);
    }
    setSelectedSubcategory(null);
  }, [selectedCategory, allSubcategories]);

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    setSelectedSubcategory(null);
    setSearchQuery('');
    setDebouncedSearch('');
    setCurrentPage(1);
    router.replace('/products', undefined, { shallow: true });
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

  const categories = [
    { id: null, name: 'ALL PRODUCTS' },
    ...allCategories.map((c) => ({
      id: c.id,
      name: (c.name && (c.name.en || c.name.EN)) || c.slug || '',
    })),
  ];

  const formatPrice = (price) => {
    if (price === null || price === undefined || price === 0) return null;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="w-full min-h-screen bg-[var(--apt-offwhite)] text-[var(--apt-navy)] pt-24 font-montserrat">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-[var(--apt-navy)] text-white py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/png/hero_industrial_bg.png"
            alt="Industrial Background"
            className="w-full h-full object-cover object-center opacity-15 grayscale select-none pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--apt-navy)]/95 via-[var(--apt-navy)]/85 to-[var(--apt-navy)]/95 z-10" />
        </div>

        <div className="relative z-20 max-w-[1350px] w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="font-montserrat text-xs sm:text-sm font-black tracking-[0.25em] text-[var(--apt-red)] uppercase block">
            INDUSTRIAL CATALOGUE 2026
          </span>
          <h1 className="font-khand text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-none">
            ENGINEERED FOR <span className="text-[var(--apt-red)]">POWER.</span>
          </h1>
          <p className="font-montserrat text-sm sm:text-base text-gray-300 leading-relaxed max-w-[650px] font-medium pt-2">
            Explore our comprehensive range of high-performance industrial tools and machinery designed to exceed global standards of durability and precision.
          </p>
        </div>
      </section>

      {/* 2. FILTER CATEGORIES BAR */}
      <section className="bg-white border-b border-gray-100 sticky top-[69px] z-30 shadow-sm overflow-hidden">
        <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 overflow-x-auto py-4 scrollbar-hide">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id || 'all'}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`shrink-0 font-montserrat text-[10px] sm:text-xs font-bold tracking-widest px-5 py-2.5 rounded-full transition-all duration-300 border ${
                    isActive
                      ? 'bg-[var(--apt-red)] text-white border-[var(--apt-red)] shadow-md shadow-[var(--apt-red)]/15'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-[var(--apt-red)]/30 hover:text-[var(--apt-red)]'
                  }`}
                >
                  {cat.name.toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2b. SUBCATEGORY FILTER ROW */}
      {subcategoriesForCat.length > 0 && (
        <section className="bg-[var(--apt-offwhite)] border-b border-gray-200 sticky top-[113px] z-20 overflow-hidden">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide">
              <span className="font-montserrat text-[9px] font-black tracking-widest text-[#404040] uppercase shrink-0">SUBCATEGORY:</span>
              <button
                onClick={() => { setSelectedSubcategory(null); setSearchQuery(''); setDebouncedSearch(''); setCurrentPage(1); router.replace('/products', undefined, { shallow: true }); }}
                className={`shrink-0 font-montserrat text-[10px] font-bold tracking-widest px-4 py-2 rounded-full transition-all duration-200 border ${
                  selectedSubcategory === null
                    ? 'bg-[var(--apt-navy)] text-white border-[var(--apt-navy)]'
                    : 'bg-white text-[#404040] border-gray-200 hover:border-[#404040]'
                }`}
              >
                ALL
              </button>
              {subcategoriesForCat.map((sub) => {
                const subName = (sub.name && (sub.name.en || sub.name.EN)) || sub.slug || '';
                const isActive = selectedSubcategory === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => { setSelectedSubcategory(sub.id); setSearchQuery(''); setDebouncedSearch(''); setCurrentPage(1); router.replace('/products', undefined, { shallow: true }); }}
                    className={`shrink-0 font-montserrat text-[10px] font-bold tracking-widest px-4 py-2 rounded-full transition-all duration-200 border ${
                      isActive
                        ? 'bg-[var(--apt-red)] text-white border-[var(--apt-red)] shadow-sm shadow-[var(--apt-red)]/20'
                        : 'bg-white text-[#404040] border-gray-200 hover:border-[var(--apt-red)]/40 hover:text-[var(--apt-red)]'
                    }`}
                  >
                    {subName.toUpperCase()}
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 3. CURRENT INVENTORY SUB-HEADER */}
      <section className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-gray-200">
          
          <div className="relative pb-2">
            <h2 className="font-khand text-2xl sm:text-3xl font-black uppercase tracking-wider text-[#1a1a1a]">
              CURRENT INVENTORY
            </h2>
            <div className="absolute bottom-0 left-0 w-24 h-[3px] bg-[var(--apt-red)]" />
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            
            <div className="relative max-w-xs">
              <input
                type="text"
                placeholder="Search inventory..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full bg-white text-[#1a1a1a] border border-gray-200 focus:border-[var(--apt-red)]/40 focus:outline-none rounded-xl px-4 py-2.5 pl-10 text-xs font-medium placeholder-gray-400 transition-colors"
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

            <div className="relative">
              <button
                onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                className="flex items-center justify-between gap-4 bg-white border border-gray-200 hover:border-gray-300 px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider text-gray-800 transition-all min-w-[200px]"
              >
                <span>
                  SORT BY:{' '}
                  <span className="text-[var(--apt-red)]">
                    {sortBy === 'PRICE_LOW_HIGH' ? 'PRICE: LOW - HIGH' : 'PRICE: HIGH - LOW'}
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
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsSortDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-1.5 w-full bg-white border border-gray-100 rounded-2xl shadow-xl z-20 overflow-hidden py-2">
                    <button
                      onClick={() => handleSortChange('PRICE_LOW_HIGH')}
                      className={`w-full text-left px-4 py-2.5 text-xs font-semibold hover:bg-gray-50 transition-colors ${
                        sortBy === 'PRICE_LOW_HIGH' ? 'text-[var(--apt-red)] bg-red-50/20' : 'text-gray-700'
                      }`}
                    >
                      PRICE: LOW - HIGH
                    </button>
                    <button
                      onClick={() => handleSortChange('PRICE_HIGH_LOW')}
                      className={`w-full text-left px-4 py-2.5 text-xs font-semibold hover:bg-gray-50 transition-colors ${
                        sortBy === 'PRICE_HIGH_LOW' ? 'text-[var(--apt-red)] bg-red-50/20' : 'text-gray-700'
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
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse shadow-sm">
                <div className="aspect-[4/3] bg-gray-200" />
                <div className="p-6 space-y-3">
                  <div className="h-2.5 bg-gray-200 rounded w-1/3" />
                  <div className="h-5 bg-gray-200 rounded w-3/4" />
                  <div className="h-2.5 bg-gray-200 rounded w-1/4" />
                  <div className="flex items-center justify-between pt-2">
                    <div className="space-y-1.5">
                      <div className="h-2 bg-gray-200 rounded w-16" />
                      <div className="h-4 bg-gray-200 rounded w-20" />
                    </div>
                    <div className="h-9 bg-gray-200 rounded w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {products.length > 0 ? (
              <motion.div
                key={`${selectedCategory}-${selectedSubcategory}-${debouncedSearch}-${currentPage}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
              >
            {products.map((product) => {
              const productName = getProductName(product);
              const imageUrl = getProductImage(product);
              const catName = product.category && (product.category.name?.en || product.category.name?.EN || '');
              const subName = product.subcategory && (product.subcategory.name?.en || product.subcategory.name?.EN || '');
              return (
                <a
                  key={product.id}
                  href={`/products/${slugify(productName || product.baseCode)}/${product.id}`}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group cursor-pointer border border-transparent hover:border-[var(--apt-red)]/10"
                >
                  <div className="relative aspect-[4/3] w-full bg-gray-50 overflow-hidden shrink-0">
                    <img
                      src={imageUrl}
                      alt={productName}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div className="space-y-2">
                      <span className="font-montserrat text-[9px] sm:text-[10px] font-black tracking-widest text-[#404040] uppercase block">
                        {subName || catName}
                      </span>
                      <h3 className="font-khand text-xl font-bold tracking-wide text-[#1a1a1a] group-hover:text-[var(--apt-red)] transition-colors duration-300 leading-snug uppercase">
                        {productName}
                      </h3>
                      <span className="font-mono text-[10px] text-gray-400 block tracking-wider">
                        {product.baseCode}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-6 mt-4 border-t border-gray-100">
                      <div className="space-y-0.5">
                        <span className="font-montserrat text-[9px] font-bold text-gray-400 tracking-wider uppercase block">
                          Price per Unit
                        </span>
                        <span className="font-outfit text-base sm:text-lg font-black text-[var(--apt-red)] tracking-tight">
                          {formatPrice(product.price) || 'CONTACT FOR PRICE'}
                        </span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          router.push(`/products/${slugify(productName || product.baseCode)}/${product.id}`);
                        }}
                        className="bg-[var(--apt-navy)] text-white font-montserrat text-[9px] sm:text-[10px] font-bold tracking-widest px-4 py-2.5 rounded-xl hover:bg-[var(--apt-red)] transition-colors duration-300 uppercase shrink-0"
                      >
                        ENQUIRE
                      </button>
                    </div>
                  </div>
                </a>
              );
            })}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-white rounded-2xl border border-gray-100"
            >
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
            </motion.div>
          )}
        </AnimatePresence>
      )}
      </section>

      {/* 5. PAGINATION CONTROLS */}
      {totalPages > 1 && (
        <section className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="flex items-center justify-center gap-2">
            
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className={`w-10 h-10 border border-gray-200 bg-white flex items-center justify-center rounded-xl hover:border-gray-400 transition-colors ${
                currentPage === 1 ? 'opacity-40 cursor-not-allowed' : ''
              }`}
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {Array.from({ length: totalPages }).map((_, idx) => {
              const pageNum = idx + 1;
              const isCurrent = pageNum === currentPage;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-10 h-10 border flex items-center justify-center rounded-xl text-xs font-bold tracking-wide transition-all ${
                    isCurrent
                      ? 'bg-[var(--apt-red)] border-[var(--apt-red)] text-white shadow-md shadow-[var(--apt-red)]/15'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`w-10 h-10 border border-gray-200 bg-white flex items-center justify-center rounded-xl hover:border-gray-400 transition-colors ${
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
              background: 'repeating-linear-gradient(45deg, var(--apt-navy), var(--apt-navy) 12px, #0A1425 12px, #0A1425 24px)',
              clipPath: 'polygon(0 0, 100% 0, 100% 90%, 98% 100%, 0 100%)'
            }}
          >
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
              <div className="space-y-4 max-w-[650px]">
                <h2 className="font-khand text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white leading-none">
                  READY TO EQUIP YOUR FACILITY?
                </h2>
                <p className="font-montserrat text-xs sm:text-sm text-gray-400 font-medium leading-relaxed">
                  Contact our industrial consultants today for customized bulk quotations and technical support across our entire product range.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      window.location.href = '/contact';
                    }
                  }}
                  className="text-center font-montserrat text-xs font-bold tracking-widest text-white border border-white/20 px-8 py-4.5 rounded-sm hover:bg-white hover:text-[var(--apt-navy)] hover:border-white transition-all duration-300 uppercase"
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
