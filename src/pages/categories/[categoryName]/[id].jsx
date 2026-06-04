import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { categoriesProducts, categoriesTree } from '@/common/categoriesData';

function CategoryPage() {
  const router = useRouter();
  const { categoryName, id } = router.query;
  const [searchQuery, setSearchQuery] = useState('');

  // Find the category name in the tree to display user-friendly casing
  let displayName = '';
  if (categoryName) {
    // Traverse the categories tree to find the matching item
    for (const cat of categoriesTree) {
      for (const sub of cat.subcategories) {
        const matchedItem = sub.items.find((item) => item.id === id);
        if (matchedItem) {
          displayName = matchedItem.name;
          break;
        }
      }
      if (displayName) break;
    }
  }

  // Fallback to query slug if displayName is not found
  if (!displayName && categoryName) {
    displayName = categoryName
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  // Get products for this category ID (fallback to default if not found)
  const allProducts = categoriesProducts[id] || categoriesProducts.default;

  // Filter products by search query
  const filteredProducts = allProducts.filter((product) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      product.title.toLowerCase().includes(query) ||
      product.sku.toLowerCase().includes(query)
    );
  });

  return (
    <div className="w-full min-h-screen bg-[#F8F9FA] text-[#060F1E] pt-28 pb-16 font-montserrat">
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Section of page */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-gray-200">
          <div>
            <h1 className="font-khand text-4xl sm:text-5xl font-black uppercase tracking-tight text-gray-900 leading-none">
              {displayName}
            </h1>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:max-w-xs">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-gray-900 border border-gray-200 focus:border-gray-400 focus:outline-none rounded-sm px-4 py-2.5 pl-10 text-xs font-medium placeholder-gray-400 transition-colors"
            />
            <svg
              className="w-4 h-4 text-gray-400 absolute left-3 top-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-100 hover:border-gray-300 rounded-sm shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group p-4"
              >
                {/* Image Box */}
                <div className="relative aspect-square w-full bg-[#FAFBFB] rounded-sm overflow-hidden shrink-0 flex items-center justify-center p-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Badge */}
                  {product.badge && (
                    <div
                      className="absolute top-2 left-2 px-2 py-0.5 rounded-sm text-[8px] font-black tracking-widest text-white shadow-sm"
                      style={{
                        backgroundColor:
                          product.badgeType === 'success'
                            ? '#10B981'
                            : product.badgeType === 'warning'
                            ? '#F59E0B'
                            : '#E11922'
                      }}
                    >
                      {product.badge}
                    </div>
                  )}
                </div>

                {/* Details Section */}
                <div className="pt-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-1">
                    <h3 className="font-montserrat text-xs sm:text-sm font-bold text-gray-800 leading-snug group-hover:text-[#E11922] transition-colors duration-300">
                      {product.title}
                    </h3>
                    <span className="font-montserrat text-[10px] text-[#E11922] font-black tracking-wider block pt-1">
                      {product.sku}
                    </span>
                    <span className="font-montserrat text-[10px] text-[#E11922]/80 font-bold tracking-wider block">
                      {product.category}
                    </span>
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
              Try searching with a different keyword.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default CategoryPage;
