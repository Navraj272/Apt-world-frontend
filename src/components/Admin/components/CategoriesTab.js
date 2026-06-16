import React from 'react';
import useCategory from '../hook/useCategory';

export default function CategoriesTab() {
  const {
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
    editingCategory,
    formData,
    submitting,
    handleCreateOpen,
    handleEditOpen,
    handleInputChange,
    handleSubmit
  } = useCategory();

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white">Categories</h2>
          <p className="text-xs text-slate-400 mt-1">Manage and organize product categories</p>
        </div>
        <button
          onClick={handleCreateOpen}
          className="flex items-center space-x-1.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase px-4 py-2.5 rounded-sm transition-all shadow-md shadow-red-600/10"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span>Create Category</span>
        </button>
      </div>

      {/* Control bar */}
      <div className="bg-[#091225] border border-slate-800 p-4 rounded-sm flex items-center">
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#050a16] border border-slate-800 text-slate-200 text-xs px-3 py-2.5 pl-9 rounded-sm focus:outline-none focus:border-slate-700 transition"
          />
          <svg className="w-4 h-4 text-slate-500 absolute left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div className="ml-auto text-xs text-slate-400 font-medium">
          Showing {categories.length} categories
        </div>
      </div>

      {/* Table view */}
      <div className="bg-[#091225] border border-slate-800 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-xs font-semibold uppercase tracking-wider bg-[#0c1933]/50">
                <th className="py-4 px-6 w-16">ID</th>
                <th className="py-4 px-6">Name</th>
                <th className="py-4 px-6">Slug</th>
                <th className="py-4 px-6">Description</th>
                <th className="py-4 px-6 w-32">Status</th>
                <th className="py-4 px-6 w-24 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 text-xs">
              {loading ? (
                Array.from({ length: 3 }).map((_, idx) => (
                  <tr key={idx} className="animate-pulse">
                    <td className="py-4 px-6"><div className="h-4 bg-slate-800 rounded w-8"></div></td>
                    <td className="py-4 px-6"><div className="h-4 bg-slate-800 rounded w-28"></div></td>
                    <td className="py-4 px-6"><div className="h-4 bg-slate-800 rounded w-24"></div></td>
                    <td className="py-4 px-6"><div className="h-4 bg-slate-800 rounded w-48"></div></td>
                    <td className="py-4 px-6"><div className="h-6 bg-slate-800 rounded w-16"></div></td>
                    <td className="py-4 px-6 text-right"><div className="h-4 bg-slate-800 rounded w-12 ml-auto"></div></td>
                  </tr>
                ))
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-500 font-medium bg-[#091225]">
                    No categories found.
                  </td>
                </tr>
              ) : (
                categories.map((category) => (
                  <tr key={category.id} className="hover:bg-[#0c1830] transition">
                    <td className="py-4 px-6 font-semibold text-slate-400">#{category.id}</td>
                    <td className="py-4 px-6 font-bold text-white">{category.name?.en || 'N/A'}</td>
                    <td className="py-4 px-6 text-slate-400 font-mono">{category.slug || '-'}</td>
                    <td className="py-4 px-6 text-slate-400 truncate max-w-xs">{category.description?.en || '-'}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        category.isActive 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25' 
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/25'
                      }`}>
                        {category.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleEditOpen(category)}
                        className="inline-flex items-center space-x-1 text-slate-400 hover:text-white font-bold bg-[#050a16] border border-slate-800 hover:border-slate-600 px-2.5 py-1.5 rounded-sm transition-all"
                      >
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-2.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        <span>Edit</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="bg-[#0c1933]/30 border-t border-slate-800 px-6 py-4 flex items-center justify-between">
            <div className="text-xs text-slate-400">
              Page <span className="font-semibold text-white">{page}</span> of <span className="font-semibold text-white">{totalPages}</span> ({totalItems} total items)
            </div>
            <div className="flex space-x-2">
              <button
                disabled={page === 1 || loading}
                onClick={() => setPage(p => Math.max(p - 1, 1))}
                className="bg-[#050a16] border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 px-3 py-1.5 rounded-sm font-semibold text-xs transition disabled:opacity-50 disabled:pointer-events-none"
              >
                Previous
              </button>
              <button
                disabled={page === totalPages || loading}
                onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                className="bg-[#050a16] border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 px-3 py-1.5 rounded-sm font-semibold text-xs transition disabled:opacity-50 disabled:pointer-events-none"
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
          <div className="bg-[#091225] border border-slate-800 rounded-sm w-full max-w-lg shadow-2xl overflow-hidden animate-zoom-in">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-[#0c1933]/50">
              <h3 className="font-bold text-sm uppercase tracking-wider text-white">
                {editingCategory ? 'Edit Category' : 'Create Category'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white transition"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Category Name (EN) *
                </label>
                <input
                  type="text"
                  name="nameEn"
                  value={formData.nameEn}
                  onChange={handleInputChange}
                  placeholder="e.g. Power Tools"
                  required
                  className="w-full bg-[#050a16] border border-slate-800 text-slate-200 text-xs px-3 py-2.5 rounded-sm focus:outline-none focus:border-slate-700 transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Description (EN)
                </label>
                <textarea
                  name="descriptionEn"
                  value={formData.descriptionEn}
                  onChange={handleInputChange}
                  placeholder="e.g. Heavy duty drills, saws, and power sanders"
                  rows="4"
                  className="w-full bg-[#050a16] border border-slate-800 text-slate-200 text-xs px-3 py-2.5 rounded-sm focus:outline-none focus:border-slate-700 transition resize-none"
                />
              </div>

              {/* Modal Actions */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-800 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-[#050a16] border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 px-4 py-2 rounded-sm font-bold text-xs uppercase transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-sm font-bold text-xs uppercase tracking-wider transition flex items-center space-x-1.5 shadow-md shadow-red-600/10"
                >
                  {submitting && (
                    <div className="w-3.5 h-3.5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                  )}
                  <span>{editingCategory ? 'Update' : 'Create'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
