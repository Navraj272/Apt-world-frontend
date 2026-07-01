import React from 'react';
import useSubcategory from '../hook/useSubcategory';

export default function SubcategoriesTab() {
  const {
    subcategories,
    categories,
    loading,
    page,
    setPage,
    totalPages,
    totalItems,
    search,
    setSearch,
    isModalOpen,
    setIsModalOpen,
    editingSubcategory,
    formData,
    submitting,
    handleCreateOpen,
    handleEditOpen,
    handleInputChange,
    handleSubmit,
    handleDelete
  } = useSubcategory();

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-[var(--apt-navy)]">Subcategories</h2>
          <p className="text-xs text-gray-500 mt-1">Manage hierarchical product subcategories</p>
        </div>
        <button
          onClick={handleCreateOpen}
          className="flex items-center space-x-1.5 bg-[var(--apt-red)] hover:bg-[var(--apt-navy)] text-white font-bold text-xs uppercase px-4 py-2.5 rounded-sm transition-all shadow-md shadow-[var(--apt-red)]/15"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span>Create Subcategory</span>
        </button>
      </div>

      {/* Control bar */}
      <div className="bg-white border border-gray-200 p-4 rounded-sm flex items-center">
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Search subcategories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-xs px-3 py-2.5 pl-9 rounded-sm focus:outline-none focus:border-gray-300 transition"
          />
          <svg className="w-4 h-4 text-gray-400 absolute left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div className="ml-auto text-xs text-gray-500 font-medium">
          Showing {subcategories.length} subcategories
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
                <th className="py-4 px-6">Parent Category</th>
                <th className="py-4 px-6">Slug</th>
                <th className="py-4 px-6 w-24 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-600 text-xs">
              {loading ? (
                Array.from({ length: 3 }).map((_, idx) => (
                  <tr key={idx} className="animate-pulse">
                    <td className="py-4 px-6"><div className="h-4 bg-gray-200 rounded w-8"></div></td>
                    <td className="py-4 px-6"><div className="h-4 bg-gray-200 rounded w-28"></div></td>
                    <td className="py-4 px-6"><div className="h-4 bg-gray-200 rounded w-32"></div></td>
                    <td className="py-4 px-6"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
                    <td className="py-4 px-6 text-right"><div className="h-4 bg-gray-200 rounded w-12 ml-auto"></div></td>
                  </tr>
                ))
              ) : subcategories.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-gray-400 font-medium bg-white">
                    No subcategories found.
                  </td>
                </tr>
              ) : (
                subcategories.map((sub) => (
                  <tr key={sub.id} className="hover:bg-gray-50 transition">
                    <td className="py-4 px-6 font-semibold text-gray-500">#{sub.id}</td>
                    <td className="py-4 px-6 font-bold text-white">{sub.name?.en || 'N/A'}</td>
                    <td className="py-4 px-6">
                      <span className="bg-gray-50 text-gray-600 border border-gray-200 px-2 py-1 rounded-sm text-[10px] font-bold uppercase">
                        {sub.category?.name?.en || `Category #${sub.categoryId}`}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-500 font-mono">{sub.slug || '-'}</td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEditOpen(sub)}
                          className="text-gray-500 hover:text-[var(--apt-navy)] p-1.5 bg-gray-50 border border-gray-200 rounded-sm"
                          title="Edit"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-2.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(sub.id)}
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
          <div className="bg-white border border-gray-200 rounded-sm w-full max-w-lg shadow-2xl overflow-hidden animate-zoom-in">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-gray-50">
              <h3 className="font-bold text-sm uppercase tracking-wider text-[var(--apt-navy)]">
                {editingSubcategory ? 'Edit Subcategory' : 'Create Subcategory'}
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

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  Parent Category *
                </label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-xs px-3 py-2.5 rounded-sm focus:outline-none focus:border-gray-300 transition"
                >
                  <option value="" disabled>Select parent category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name?.en || `Category #${cat.id}`}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  Subcategory Name (EN) *
                </label>
                <input
                  type="text"
                  name="nameEn"
                  value={formData.nameEn}
                  onChange={handleInputChange}
                  placeholder="e.g. Cordless Drills"
                  required
                  className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-xs px-3 py-2.5 rounded-sm focus:outline-none focus:border-gray-300 transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  Description (EN)
                </label>
                <textarea
                  name="descriptionEn"
                  value={formData.descriptionEn}
                  onChange={handleInputChange}
                  placeholder="e.g. Battery powered handheld drills"
                  rows="4"
                  className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-xs px-3 py-2.5 rounded-sm focus:outline-none focus:border-gray-300 transition resize-none"
                />
              </div>

              {/* Modal Actions */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 mt-6">
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
                  <span>{editingSubcategory ? 'Update' : 'Create'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
