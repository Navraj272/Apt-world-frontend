import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllProducts, getAllCategories, getAllSubcategories } from '@/services/getRequests';
import ProductCard from '../ProductCard';

const ALL_PRODUCTS_LIMIT = 30;

function ProductPage() {
  const router = useRouter();
  const { category: categorySlug, subcategory: subcategorySlug, search: urlSearch } = router.query;

  const [allCategories, setAllCategories] = useState([]);
  const [allSubcategories, setAllSubcategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const sortBy = 'PRICE_LOW_HIGH';
  const [searchQuery, setSearchQuery] = useState(urlSearch || '');
  const [debouncedSearch, setDebouncedSearch] = useState(urlSearch || '');
  const [currentPage, setCurrentPage] = useState(1);

  // Category / subcategory selection comes from the URL (set by the header mega-menu)
  const { selectedCategory, selectedSubcategory } = useMemo(() => {
    const sub = subcategorySlug
      ? allSubcategories.find((x) => x.slug === subcategorySlug)
      : null;
    const cat = sub
      ? null
      : categorySlug
        ? allCategories.find((x) => x.slug === categorySlug)
        : null;
    return { selectedCategory: cat?.id || null, selectedSubcategory: sub?.id || null };
  }, [categorySlug, subcategorySlug, allCategories, allSubcategories]);

  // Block the first fetch until a slug in the URL can be resolved to an id
  const filtersReady =
    !router.isReady ||
    ((!categorySlug || allCategories.length > 0) && (!subcategorySlug || allSubcategories.length > 0));

  useEffect(() => {
    setCurrentPage(1);
  }, [categorySlug, subcategorySlug]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    getAllCategories().then((res) => {
      if (res && res.categories) setAllCategories(res.categories);
    }).catch(() => { });
    getAllSubcategories({ limit: 500 }).then((res) => {
      if (res && res.subcategories) setAllSubcategories(res.subcategories);
    }).catch(() => { });
  }, []);

  useEffect(() => {
    if (urlSearch) {
      setSearchQuery(urlSearch);
      setDebouncedSearch(urlSearch);
    }
  }, [urlSearch]);

  const fetchProducts = useCallback(async () => {
    if (!filtersReady) return;
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
      // Plain "All Products" view is a curated top 30: featured first, then the newest, no further pages
      if (!selectedSubcategory && !selectedCategory && !debouncedSearch.trim()) {
        params.curated = true;
        params.limit = ALL_PRODUCTS_LIMIT;
      }
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
  }, [currentPage, selectedCategory, selectedSubcategory, debouncedSearch, sortBy, filtersReady]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };



  const activeSub = allSubcategories.find((x) => x.id === selectedSubcategory);
  const activeCat = allCategories.find((x) => x.id === selectedCategory);
  const activeLabel = activeSub || activeCat;
  const activeName = activeLabel ? (activeLabel.name?.en || activeLabel.name?.EN || activeLabel.slug || '') : '';

  return (
    <div className="w-full min-h-screen bg-[var(--apt-offwhite)] text-[var(--apt-navy)] pt-24 font-montserrat">

      {/* 1. HERO SECTION */}
      <section className="relative bg-[var(--apt-navy)] text-white py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/png/banner2.png"
            alt="Industrial Background"
            className="w-full h-full object-cover object-center opacity-50 grayscale select-none pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--apt-navy)]/95 via-[var(--apt-navy)]/85 to-[var(--apt-navy)]/95 z-10" />
        </div>

        <div className="relative z-20 max-w-[1500px] w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
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

      {/* 3. CURRENT INVENTORY SUB-HEADER */}
      <section className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-gray-200">

          <div className="relative pb-2">
            <h2 className="font-khand text-2xl sm:text-3xl font-black uppercase tracking-wider text-[#1a1a1a]">
              {activeName ? activeName.toUpperCase() : 'CURRENT INVENTORY'}
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

          </div>
        </div>
      </section>

      {/* 4. PRODUCTS GRID */}
      <section className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse border border-gray-200 shadow-[0_2px_14px_rgba(6,15,30,0.06)]">
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
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
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
        <section className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="flex items-center justify-center gap-2">

            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className={`w-10 h-10 border border-gray-200 bg-white flex items-center justify-center rounded-xl hover:border-gray-400 transition-colors ${currentPage === 1 ? 'opacity-40 cursor-not-allowed' : ''
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
                  className={`w-10 h-10 border flex items-center justify-center rounded-xl text-xs font-bold tracking-wide transition-all ${isCurrent
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
              className={`w-10 h-10 border border-gray-200 bg-white flex items-center justify-center rounded-xl hover:border-gray-400 transition-colors ${currentPage === totalPages ? 'opacity-40 cursor-not-allowed' : ''
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
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">

          <div
            className="relative bg-[var(--apt-navy)] text-white p-8 sm:p-12 md:p-16 border border-white/5 shadow-2xl overflow-hidden rounded-sm"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% 90%, 98% 100%, 0 100%)'
            }}
          >
            <div className="absolute inset-0 opacity-5 pointer-events-none select-none">
              <svg width="100%" height="100%">
                <defs>
                  <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
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
                  className="text-center font-montserrat text-xs font-bold tracking-widest text-white bg-[var(--apt-red)] px-6 py-3 rounded-xl hover:bg-white hover:text-[var(--apt-navy)] hover:border-white transition-all duration-300 uppercase"
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
