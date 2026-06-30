import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import { getAllProducts } from '@/services/getRequests';

const slugify = (text) => {
  if (!text) return '';
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
};

const getProductName = (product) => {
  if (!product.name) return '';
  if (typeof product.name === 'string') return product.name;
  return product.name.en || product.name.EN || '';
};

const getProductImage = (product) => {
  if (product.images && product.images.length > 0) return product.images[0];
  if (product.thumbnail) return product.thumbnail;
  return '/assets/png/products/rotary_hammer.png';
};

function GlobalSearch({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const inputRef = useRef(null);
  const debounceRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setResults([]);
      setHasSearched(false);
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const search = useCallback(async (q) => {
    if (q.trim().length < 3) {
      setResults([]);
      setHasSearched(false);
      return;
    }
    setLoading(true);
    setHasSearched(true);
    try {
      const res = await getAllProducts({ search: q.trim(), limit: 6, isActive: true });
      setResults(res?.products || []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(val), 400);
  };

  const handleViewAll = () => {
    if (query.trim().length >= 3) {
      router.push(`/products?search=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  const handleProductClick = (product) => {
    const name = getProductName(product);
    router.push(`/products/${slugify(name || product.baseCode)}/${product.id}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Compact Search Panel — centered, below header */}
      <div className="fixed top-[64px] left-1/2 -translate-x-1/2 z-[70] w-[calc(100%-2rem)] max-w-2xl">
        <div className="bg-white rounded-2xl shadow-2xl shadow-black/20 border border-gray-100 overflow-hidden">

          {/* Input Row */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-100">
            <svg
              className="w-4 h-4 text-[var(--apt-red)] shrink-0"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleChange}
              placeholder="Search products, equipment, tools..."
              className="flex-1 bg-transparent text-[var(--apt-navy)] text-sm font-montserrat font-medium placeholder-gray-400 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => { setQuery(''); setResults([]); setHasSearched(false); inputRef.current?.focus(); }}
                className="text-gray-400 hover:text-gray-700 transition-colors shrink-0 p-1"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            <button
              onClick={onClose}
              className="font-montserrat text-[10px] font-bold tracking-wider text-gray-400 hover:text-gray-700 transition-colors border border-gray-200 px-2 py-1 rounded-md shrink-0"
            >
              ESC
            </button>
          </div>

          {/* Hint */}
          {query.length > 0 && query.length < 3 && (
            <div className="px-4 py-2.5">
              <p className="font-montserrat text-xs text-gray-400">
                Type {3 - query.length} more character{3 - query.length !== 1 ? 's' : ''} to search…
              </p>
            </div>
          )}

          {/* Results */}
          {(loading || (hasSearched && query.length >= 3)) && (
            <div className="max-h-[55vh] overflow-y-auto">
              {loading ? (
                <div className="p-3 space-y-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex gap-3 p-2.5 bg-gray-50 rounded-xl animate-pulse">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg shrink-0" />
                      <div className="flex-1 space-y-2 py-1">
                        <div className="h-2.5 bg-gray-200 rounded w-3/4" />
                        <div className="h-2 bg-gray-200 rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : results.length > 0 ? (
                <div className="p-3 space-y-1">
                  {results.map((product) => {
                    const name = getProductName(product);
                    const image = getProductImage(product);
                    const catName = product.category && (product.category.name?.en || product.category.name?.EN || '');
                    const subName = product.subcategory && (product.subcategory.name?.en || product.subcategory.name?.EN || '');
                    return (
                      <button
                        key={product.id}
                        onClick={() => handleProductClick(product)}
                        className="w-full flex gap-3 p-2.5 hover:bg-gray-50 rounded-xl transition-all duration-150 text-left group"
                      >
                        <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                          <img
                            src={image}
                            alt={name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="font-montserrat text-[9px] font-bold tracking-widest text-[var(--apt-red)] uppercase block mb-0.5">
                            {subName || catName}
                          </span>
                          <h4 className="font-khand text-sm font-bold text-[var(--apt-navy)] group-hover:text-[var(--apt-red)] transition-colors uppercase leading-tight truncate">
                            {name}
                          </h4>
                          {product.baseCode && (
                            <span className="font-mono text-[9px] text-gray-400 tracking-wider">{product.baseCode}</span>
                          )}
                        </div>
                        <svg className="w-3.5 h-3.5 text-gray-300 group-hover:text-[var(--apt-red)] transition-colors shrink-0 self-center" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    );
                  })}
                  <div className="pt-2 mt-1 border-t border-gray-100">
                    <button
                      onClick={handleViewAll}
                      className="w-full text-center font-montserrat text-xs font-bold tracking-widest text-[var(--apt-red)] hover:text-[var(--apt-navy)] transition-colors uppercase py-2 flex items-center justify-center gap-1.5"
                    >
                      VIEW ALL RESULTS FOR &quot;{query}&quot;
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="px-4 py-6 text-center">
                  <p className="font-montserrat text-sm text-gray-500">No results for &quot;{query}&quot;</p>
                  <button
                    onClick={handleViewAll}
                    className="mt-2 font-montserrat text-xs font-bold tracking-widest text-[var(--apt-red)] hover:text-[var(--apt-navy)] transition-colors uppercase"
                  >
                    SEARCH ALL PRODUCTS →
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Empty state — hint */}
          {!hasSearched && query.length === 0 && (
            <div className="px-4 py-3">
              <p className="font-montserrat text-xs text-gray-400 text-center">
                Search for products, equipment, tools...
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default GlobalSearch;
