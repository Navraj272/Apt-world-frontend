import React from 'react';
import useProduct from '../hook/useProduct';

export default function ProductsTab() {
  const {
    products,
    categories,
    subcategories,
    loading,
    page,
    setPage,
    totalPages,
    totalItems,
    search,
    setSearch,
    isModalOpen,
    setIsModalOpen,
    editingProduct,
    formData,
    submitting,
    handleCreateOpen,
    handleEditOpen,
    handleInputChange,
    addSpec,
    removeSpec,
    handleSpecChange,
    handleImageChange,
    removeImage,
    handleSubmit,
    handleDelete
  } = useProduct();

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-[var(--apt-navy)]">Products</h2>
          <p className="text-xs text-gray-500 mt-1">Manage physical products and machinery options</p>
        </div>
        <button
          onClick={handleCreateOpen}
          className="flex items-center space-x-1.5 bg-[var(--apt-red)] hover:bg-[var(--apt-navy)] text-white font-bold text-xs uppercase px-4 py-2.5 rounded-sm transition-all shadow-md shadow-[var(--apt-red)]/15"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span>Create Product</span>
        </button>
      </div>

      {/* Control bar */}
      <div className="bg-white border border-gray-200 p-4 rounded-sm flex items-center">
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Search products by name, code, category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-xs px-3 py-2.5 pl-9 rounded-sm focus:outline-none focus:border-gray-300 transition"
          />
          <svg className="w-4 h-4 text-gray-400 absolute left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div className="ml-auto text-xs text-gray-500 font-medium">
          Showing {products.length} products
        </div>
      </div>

      {/* Table view */}
      <div className="bg-white border border-gray-200 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 text-xs font-semibold uppercase tracking-wider bg-gray-50">
                <th className="py-4 px-6 w-16">ID</th>
                <th className="py-4 px-6">Name</th>
                <th className="py-4 px-6 w-32">Base Code</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Specifications</th>
                <th className="py-4 px-6 w-24 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-600 text-xs">
              {loading ? (
                Array.from({ length: 3 }).map((_, idx) => (
                  <tr key={idx} className="animate-pulse">
                    <td className="py-4 px-6"><div className="h-4 bg-gray-200 rounded w-8"></div></td>
                    <td className="py-4 px-6"><div className="h-4 bg-gray-200 rounded w-32"></div></td>
                    <td className="py-4 px-6"><div className="h-4 bg-gray-200 rounded w-20"></div></td>
                    <td className="py-4 px-6"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
                    <td className="py-4 px-6"><div className="h-4 bg-gray-200 rounded w-40"></div></td>
                    <td className="py-4 px-6 text-right"><div className="h-4 bg-gray-200 rounded w-12 ml-auto"></div></td>
                  </tr>
                ))
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-gray-400 font-medium bg-white">
                    No products found.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition">
                    <td className="py-4 px-6 font-semibold text-gray-500">#{product.id}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        {product.thumbnail && (
                          <img 
                            src={product.thumbnail.startsWith('/') ? `${process.env.NEXT_PUBLIC_BASE_URL}${product.thumbnail}` : product.thumbnail} 
                            alt="" 
                            className="w-10 h-10 object-cover rounded-sm border border-gray-200"
                          />
                        )}
                        <div>
                          <div className="font-bold text-[var(--apt-navy)]">{product.name?.en || 'N/A'}</div>
                          <div className="text-[10px] text-gray-500 mt-0.5 truncate max-w-[150px]">{product.description?.en || ''}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600 font-mono font-semibold uppercase">{product.baseCode || '-'}</td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="text-gray-600 font-medium">{product.category?.name?.en || 'Uncategorized'}</span>
                        {product.subcategory && (
                          <span className="text-[10px] text-gray-400 italic mt-0.5">{product.subcategory?.name?.en}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-1.5 max-w-xs">
                        {product.specs && Object.keys(product.specs).length > 0 ? (
                          Object.entries(product.specs).map(([key, val]) => (
                            <span key={key} className="bg-gray-50 text-gray-500 border border-gray-200 px-1.5 py-0.5 rounded-[3px] text-[10px] lowercase font-medium">
                              {key}: <span className="text-gray-800 font-bold">{val}</span>
                            </span>
                          ))
                        ) : (
                          <span className="text-slate-600">-</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEditOpen(product)}
                          className="text-gray-500 hover:text-[var(--apt-navy)] p-1.5 bg-gray-50 border border-gray-200 rounded-sm"
                          title="Edit"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-2.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-gray-400 hover:text-red-500 p-1.5 bg-gray-50 border border-gray-200 rounded-sm transition-colors"
                          title="Delete"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-between">
            <div className="text-xs text-gray-500">
              Page <span className="font-semibold text-[var(--apt-navy)]">{page}</span> of <span className="font-semibold text-[var(--apt-navy)]">{totalPages}</span> ({totalItems} total items)
            </div>
            <div className="flex space-x-2">
              <button
                disabled={page === 1 || loading}
                onClick={() => setPage(p => Math.max(p - 1, 1))}
                className="bg-gray-50 border border-gray-200 text-gray-600 hover:text-[var(--apt-navy)] hover:border-gray-300 px-3 py-1.5 rounded-sm font-semibold text-xs transition disabled:opacity-50 disabled:pointer-events-none"
              >
                Previous
              </button>
              <button
                disabled={page === totalPages || loading}
                onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                className="bg-gray-50 border border-gray-200 text-gray-600 hover:text-[var(--apt-navy)] hover:border-gray-300 px-3 py-1.5 rounded-sm font-semibold text-xs transition disabled:opacity-50 disabled:pointer-events-none"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Create / Edit Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-gray-200 rounded-sm w-full max-w-2xl shadow-2xl overflow-hidden animate-zoom-in max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-gray-50 flex-shrink-0">
              <h3 className="font-bold text-sm uppercase tracking-wider text-[var(--apt-navy)]">
                {editingProduct ? 'Edit Product' : 'Create Product'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-[var(--apt-navy)] transition"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSubmit} className="overflow-y-auto flex-grow p-6 space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category Select */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    Category *
                  </label>
                  <select
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-xs px-3 py-2.5 rounded-sm focus:outline-none focus:border-gray-300 transition"
                  >
                    <option value="" disabled>Select a category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name?.en || `Category #${cat.id}`}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subcategory Select */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    Subcategory
                  </label>
                  <select
                    name="subcategoryId"
                    value={formData.subcategoryId}
                    onChange={handleInputChange}
                    disabled={!formData.categoryId || subcategories?.length === 0}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-xs px-3 py-2.5 rounded-sm focus:outline-none focus:border-gray-300 transition disabled:opacity-50"
                  >
                    <option value="">No Subcategory</option>
                    {subcategories?.map(sub => (
                      <option key={sub.id} value={sub.id}>
                        {sub.name?.en || `Subcategory #${sub.id}`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Base Code */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    Base Code *
                  </label>
                  <input
                    type="text"
                    name="baseCode"
                    value={formData.baseCode}
                    onChange={handleInputChange}
                    placeholder="e.g. ID-X100"
                    required
                    className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-xs px-3 py-2.5 rounded-sm focus:outline-none focus:border-gray-300 transition"
                  />
                </div>
              </div>

              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  Product Name (EN) *
                </label>
                <input
                  type="text"
                  name="nameEn"
                  value={formData.nameEn}
                  onChange={handleInputChange}
                  placeholder="e.g. Impact Drill X100"
                  required
                  className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-xs px-3 py-2.5 rounded-sm focus:outline-none focus:border-gray-300 transition"
                />
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  Description (EN)
                </label>
                <textarea
                  name="descriptionEn"
                  value={formData.descriptionEn}
                  onChange={handleInputChange}
                  placeholder="Heavy duty impact drill with variable speed."
                  rows="3"
                  className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-xs px-3 py-2.5 rounded-sm focus:outline-none focus:border-gray-300 transition resize-none"
                />
              </div>

              {/* Image Upload Section */}
              <div className="space-y-4 border-t border-gray-200 pt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--apt-navy)]">Media Management</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Thumbnail */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Main Thumbnail</label>
                    <div className="flex items-center gap-4">
                      {formData.thumbnail && (
                        <div className="relative w-16 h-16 rounded border border-gray-200 overflow-hidden bg-black/20">
                          <img 
                            src={formData.thumbnail.startsWith('data:') ? formData.thumbnail : `${process.env.NEXT_PUBLIC_BASE_URL}${formData.thumbnail}`} 
                            alt="Thumb" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <label className="flex-grow cursor-pointer bg-gray-50 border border-gray-200 border-dashed hover:border-gray-300 rounded-sm p-4 flex flex-col items-center justify-center transition-all group">
                        <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, true)} className="hidden" />
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-red-500 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{formData.thumbnail ? 'Change' : 'Upload'}</span>
                      </label>
                    </div>
                  </div>

                  {/* Multiple Images */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Gallery Images</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formData.images.map((img, idx) => (
                        <div key={idx} className="relative w-12 h-12 rounded border border-gray-200 overflow-hidden group">
                          <img 
                            src={img.startsWith('data:') ? img : `${process.env.NEXT_PUBLIC_BASE_URL}${img}`} 
                            alt="" 
                            className="w-full h-full object-cover"
                          />
                          <button 
                            type="button"
                            onClick={() => removeImage(idx)}
                            className="absolute inset-0 bg-[var(--apt-red)]/80 items-center justify-center hidden group-hover:flex transition"
                          >
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                      <label className="w-12 h-12 cursor-pointer bg-gray-50 border border-gray-200 border-dashed hover:border-gray-300 rounded-sm flex items-center justify-center transition-all group">
                        <input type="file" accept="image/*" multiple onChange={(e) => handleImageChange(e, false)} className="hidden" />
                        <svg className="w-4 h-4 text-gray-400 group-hover:text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Specifications Selection */}
              <div className="space-y-4 border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--apt-navy)]">Dynamic Specifications</h4>
                  <button
                    type="button"
                    onClick={addSpec}
                    className="inline-flex items-center space-x-1 text-red-500 hover:text-red-400 font-bold text-[10px] uppercase"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Add Item</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {formData.specs.map((spec, index) => (
                    <div key={index} className="flex items-center gap-3 animate-fade-in group">
                      <div className="flex-grow grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Subject (e.g. RPM)"
                          value={spec.key}
                          onChange={(e) => handleSpecChange(index, 'key', e.target.value)}
                          className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-xs px-3 py-2.5 rounded-sm focus:outline-none focus:border-gray-300 transition"
                        />
                        <input
                          type="text"
                          placeholder="Value (e.g. 3000)"
                          value={spec.value}
                          onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                          className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-xs px-3 py-2.5 rounded-sm focus:outline-none focus:border-gray-300 transition"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeSpec(index)}
                        className="text-gray-400 hover:text-red-500 transition-all p-2 opacity-0 group-hover:opacity-100 disabled:pointer-events-none"
                        disabled={formData.specs.length === 1}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 flex-shrink-0 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-50 border border-gray-200 text-gray-600 hover:text-[var(--apt-navy)] hover:border-gray-300 px-4 py-2 rounded-sm font-bold text-xs uppercase transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-[var(--apt-red)] hover:bg-[var(--apt-navy)] text-white px-5 py-2 rounded-sm font-bold text-xs uppercase tracking-wider transition flex items-center space-x-1.5 shadow-md shadow-[var(--apt-red)]/15"
                >
                  {submitting && (
                    <div className="w-3.5 h-3.5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                  )}
                  <span>{editingProduct ? 'Update Product' : 'Save Product'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
