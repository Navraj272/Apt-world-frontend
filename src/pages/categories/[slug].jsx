import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import { getAllSubcategories, getAllCategories, getAllProducts } from '@/services/getRequests';

const slugify = (text) => {
  if (!text) return '';
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
};

const getName = (obj) => {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  return obj.en || obj.EN || '';
};

const getProductImage = (product) => {
  if (product.images && product.images.length > 0) return product.images[0];
  if (product.thumbnail) return product.thumbnail;
  return '/assets/png/products/rotary_hammer.png';
};

const getProductName = (product) => {
  if (!product.name) return '';
  if (typeof product.name === 'string') return product.name;
  return product.name.en || product.name.EN || '';
};

const formatPrice = (price) => {
  if (price === null || price === undefined || price === 0) return null;
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
};

function CategoryPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [displayName, setDisplayName] = useState('');
  const [categoryId, setCategoryId] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSub, setSelectedSub] = useState(null);
  const [isSubDropdownOpen, setIsSubDropdownOpen] = useState(false);

  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [sortBy, setSortBy] = useState('PRICE_LOW_HIGH');

  const dropdownRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    if (!slug) return;
    const load = async () => {
      try {
        const [subsRes, catsRes] = await Promise.all([getAllSubcategories({ limit: 200 }), getAllCategories()]);
        const allSubs = subsRes?.subcategories || [];
        const allCats = catsRes?.categories || [];

        const matchedSub = allSubs.find((s) => s.slug === slug);
        if (matchedSub) {
          setCategoryId(matchedSub.categoryId);
          setDisplayName(getName(matchedSub.name));
          setSubcategories(allSubs.filter((s) => s.categoryId === matchedSub.categoryId));
          setSelectedSub(matchedSub.id);
          return;
        }

        const matchedCat = allCats.find((c) => c.slug === slug);
        if (matchedCat) {
          setCategoryId(matchedCat.id);
          setDisplayName(getName(matchedCat.name));
          setSubcategories(allSubs.filter((s) => s.categoryId === matchedCat.id));
          setSelectedSub(null);
          return;
        }

        setDisplayName(slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '));
      } catch {
        setDisplayName(slug || '');
      }
    };
    load();
  }, [slug]);

  const fetchProducts = useCallback(async () => {
    if (!categoryId && !slug) return;
    setLoading(true);
    try {
      const params = { pageNo: currentPage, limit: 8, isActive: true };
      if (selectedSub) {
        params.subcategoryId = selectedSub;
      } else if (categoryId) {
        params.categoryId = categoryId;
      }
      if (debouncedSearch.trim()) params.search = debouncedSearch.trim();
      if (sortBy === 'PRICE_LOW_HIGH') params.order = 'price_asc';
      if (sortBy === 'PRICE_HIGH_LOW') params.order = 'price_desc';
      const res = await getAllProducts(params);
      setProducts(res?.products || []);
      setTotalPages(res?.totalPages || 1);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [categoryId, selectedSub, currentPage, debouncedSearch, sortBy, slug]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const handleOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsSubDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const selectedSubName = selectedSub && subcategories.find((s) => s.id === selectedSub)
    ? getName(subcategories.find((s) => s.id === selectedSub).name)
    : 'ALL';

  return (
    <div className="w-full min-h-screen bg-[var(--apt-offwhite)] text-[var(--apt-navy)] pt-24 font-montserrat">

      {/* HERO */}
      <section className="relative bg-[var(--apt-navy)] text-white py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/png/banner2.png"
            alt="Industrial Background"
            className="w-full h-full object-cover object-center opacity-15 grayscale select-none pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--apt-navy)]/95 via-[var(--apt-navy)]/85 to-[var(--apt-navy)]/95 z-10" />
        </div>
        <div className="relative z-20 max-w-[1350px] w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="flex items-center gap-2 text-gray-500 font-montserrat text-[10px] sm:text-xs font-bold tracking-wider">
            <a href="/" className="hover:text-white transition-colors">HOME</a>
            <span>/</span>
            <a href="/products" className="hover:text-white transition-colors">PRODUCTS</a>
            {displayName && <><span>/</span><span className="text-[var(--apt-red)]">{displayName.toUpperCase()}</span></>}
          </div>
          <h1 className="font-khand text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-none">
            {displayName || 'PRODUCTS'}
            {selectedSub && subcategories.find((s) => s.id === selectedSub) && (
              <span className="text-[var(--apt-red)]"> — {getName(subcategories.find((s) => s.id === selectedSub).name)}</span>
            )}
          </h1>
          <p className="font-montserrat text-sm text-gray-400 max-w-[560px] font-medium">
            Precision-engineered equipment for industrial excellence.
          </p>
        </div>
      </section>

      {/* FILTER BAR */}
      <section className="bg-white border-b border-gray-200 sticky top-[69px] z-30 shadow-sm">
        <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">

            {/* Subcategory dropdown */}
            {subcategories.length > 0 && (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsSubDropdownOpen(!isSubDropdownOpen)}
                  className="flex items-center gap-2 bg-[var(--apt-offwhite)] border border-gray-200 hover:border-[var(--apt-red)]/40 rounded-xl px-4 py-2.5 text-xs font-bold tracking-wider transition-all min-w-[220px] justify-between"
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-[var(--apt-red)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                    </svg>
                    <span className="text-gray-500 font-semibold">FILTER:</span>
                    <span className="text-[var(--apt-red)]">{selectedSubName}</span>
                  </span>
                  <svg className={`w-3.5 h-3.5 text-gray-400 transition-transform ${isSubDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isSubDropdownOpen && (
                  <div className="absolute left-0 mt-1.5 bg-white border border-gray-100 rounded-2xl shadow-2xl z-40 py-2 min-w-[240px] max-h-[300px] overflow-y-auto">
                    <button
                      onClick={() => { setSelectedSub(null); setCurrentPage(1); setIsSubDropdownOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-xs font-bold tracking-wider transition-colors ${!selectedSub ? 'text-[var(--apt-red)] bg-[var(--apt-red)]/5' : 'text-gray-700 hover:bg-gray-50 hover:text-[var(--apt-red)]'}`}
                    >
                      ALL {displayName.toUpperCase()}
                    </button>
                    <div className="border-t border-gray-100 my-1" />
                    {subcategories.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => { setSelectedSub(sub.id); setCurrentPage(1); setIsSubDropdownOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 text-xs font-bold tracking-wider transition-colors ${selectedSub === sub.id ? 'text-[var(--apt-red)] bg-[var(--apt-red)]/5' : 'text-gray-700 hover:bg-gray-50 hover:text-[var(--apt-red)]'}`}
                      >
                        {getName(sub.name).toUpperCase()}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Search */}
            <div className="relative flex-1 sm:max-w-xs">
              <input
                type="text"
                placeholder="Search in this category..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full bg-white text-[#1a1a1a] border border-gray-200 focus:border-[var(--apt-red)]/40 focus:outline-none rounded-xl px-4 py-2.5 pl-10 text-xs font-medium placeholder-gray-400 transition-colors"
              />
              <svg className="w-4 h-4 text-gray-400 absolute left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Sort */}
            <div className="relative ml-auto">
              <button
                onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                className="flex items-center gap-3 bg-white border border-gray-200 hover:border-gray-300 px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider text-gray-800 transition-all min-w-[190px] justify-between"
              >
                <span>SORT: <span className="text-[var(--apt-red)]">{sortBy === 'PRICE_LOW_HIGH' ? 'LOW→HIGH' : 'HIGH→LOW'}</span></span>
                <svg className={`w-3.5 h-3.5 text-gray-400 transition-transform ${isSortDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isSortDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsSortDropdownOpen(false)} />
                  <div className="absolute right-0 mt-1.5 bg-white border border-gray-100 rounded-2xl shadow-2xl z-20 py-2 min-w-[180px]">
                    {[['PRICE_LOW_HIGH', 'PRICE: LOW - HIGH'], ['PRICE_HIGH_LOW', 'PRICE: HIGH - LOW']].map(([val, label]) => (
                      <button key={val} onClick={() => { setSortBy(val); setIsSortDropdownOpen(false); setCurrentPage(1); }}
                        className={`w-full text-left px-4 py-2.5 text-xs font-semibold hover:bg-gray-50 transition-colors ${sortBy === val ? 'text-[var(--apt-red)] bg-red-50/30' : 'text-gray-700'}`}>
                        {label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse border border-gray-200 shadow-[0_2px_14px_rgba(6,15,30,0.06)]">
                <div className="aspect-[4/3] bg-gray-200" />
                <div className="p-5 space-y-3">
                  <div className="h-2.5 bg-gray-200 rounded-full w-1/3" />
                  <div className="h-5 bg-gray-200 rounded-full w-3/4" />
                  <div className="h-2.5 bg-gray-200 rounded-full w-1/4" />
                  <div className="flex items-center justify-between pt-2">
                    <div className="h-4 bg-gray-200 rounded-full w-20" />
                    <div className="h-9 bg-gray-200 rounded-xl w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeIn">
            {products.map((product) => {
              const productName = getProductName(product);
              const imageUrl = getProductImage(product);
              const catName = product.category && (product.category.name?.en || product.category.name?.EN || '');
              const subName = product.subcategory && (product.subcategory.name?.en || product.subcategory.name?.EN || '');
              return (
                <a
                  key={product.id}
                  href={`/products/${slugify(productName || product.baseCode)}/${product.id}`}
                  className="bg-white rounded-2xl shadow-[0_2px_14px_rgba(6,15,30,0.06)] hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group cursor-pointer border border-gray-200 hover:border-[var(--apt-red)]/30"
                >
                  <div className="relative aspect-[4/3] w-full bg-gray-50 overflow-hidden shrink-0">
                    <img
                      src={imageUrl}
                      alt={productName}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 flex-grow flex flex-col justify-between">
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
                    <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
                      <span className="font-outfit text-base font-black text-[var(--apt-red)] tracking-tight">
                        {formatPrice(product.price) || 'GET QUOTE'}
                      </span>
                      <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); router.push(`/products/${slugify(productName || product.baseCode)}/${product.id}`); }}
                        className="bg-[var(--apt-navy)] text-white font-montserrat text-[9px] font-bold tracking-widest px-4 py-2.5 rounded-xl hover:bg-[var(--apt-red)] transition-colors duration-300 uppercase"
                      >
                        ENQUIRE
                      </button>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="font-khand text-2xl font-bold uppercase tracking-wider text-gray-800">No Products Found</h3>
            <p className="font-montserrat text-xs text-gray-400 mt-2">Try adjusting your filters or search keywords.</p>
          </div>
        )}
      </section>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <section className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className={`w-10 h-10 border border-gray-200 flex items-center justify-center rounded-xl bg-white hover:border-gray-400 transition-colors ${currentPage === 1 ? 'opacity-40 cursor-not-allowed' : ''}`}
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            {Array.from({ length: totalPages }).map((_, idx) => {
              const pageNum = idx + 1;
              return (
                <button key={pageNum} onClick={() => setCurrentPage(pageNum)}
                  className={`w-10 h-10 border flex items-center justify-center rounded-xl text-xs font-bold tracking-wide transition-all ${pageNum === currentPage ? 'bg-[var(--apt-red)] border-[var(--apt-red)] text-white' : 'bg-white border-gray-200 text-gray-700 hover:border-gray-400'}`}>
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`w-10 h-10 border border-gray-200 flex items-center justify-center rounded-xl bg-white hover:border-gray-400 transition-colors ${currentPage === totalPages ? 'opacity-40 cursor-not-allowed' : ''}`}
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

export default CategoryPage;
