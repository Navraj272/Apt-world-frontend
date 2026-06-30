import React from 'react';
import useFranchiseLocation from '../hook/useFranchiseLocation';
import { INDIAN_STATES } from '@/constants/indianStates';

export default function FranchiseLocationsTab() {
  const {
    franchiseLocations,
    loading,
    page,
    setPage,
    totalPages,
    totalItems,
    search,
    setSearch,
    isModalOpen,
    setIsModalOpen,
    editingFranchiseLocation,
    formData,
    submitting,
    handleCreateOpen,
    handleEditOpen,
    handleInputChange,
    handleSubmit,
    handleDelete,
  } = useFranchiseLocation();

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white">Franchise Locations</h2>
          <p className="text-xs text-slate-400 mt-1">Manage franchise locations shown on the public Franchise Locator</p>
        </div>
        <button
          onClick={handleCreateOpen}
          className="flex items-center space-x-1.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase px-4 py-2.5 rounded-sm transition-all shadow-md shadow-red-600/10"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span>Add Franchise Location</span>
        </button>
      </div>

      {/* Control bar */}
      <div className="bg-[#091225] border border-slate-800 p-4 rounded-sm flex items-center">
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Search by state, city, contact..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#050a16] border border-slate-800 text-slate-200 text-xs px-3 py-2.5 pl-9 rounded-sm focus:outline-none focus:border-slate-700 transition"
          />
          <svg className="w-4 h-4 text-slate-500 absolute left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div className="ml-auto text-xs text-slate-400 font-medium">
          Showing {franchiseLocations.length} franchise locations
        </div>
      </div>

      {/* Table view */}
      <div className="bg-[#091225] border border-slate-800 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-xs font-semibold uppercase tracking-wider bg-[#0c1933]/50">
                <th className="py-4 px-6 w-16">ID</th>
                <th className="py-4 px-6">State / City</th>
                <th className="py-4 px-6">Address</th>
                <th className="py-4 px-6">Contact</th>
                <th className="py-4 px-6 w-24">Status</th>
                <th className="py-4 px-6 w-32 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 text-xs">
              {loading ? (
                Array.from({ length: 3 }).map((_, idx) => (
                  <tr key={idx} className="animate-pulse">
                    <td className="py-4 px-6"><div className="h-4 bg-slate-800 rounded w-8"></div></td>
                    <td className="py-4 px-6"><div className="h-4 bg-slate-800 rounded w-28"></div></td>
                    <td className="py-4 px-6"><div className="h-4 bg-slate-800 rounded w-48"></div></td>
                    <td className="py-4 px-6"><div className="h-4 bg-slate-800 rounded w-32"></div></td>
                    <td className="py-4 px-6"><div className="h-4 bg-slate-800 rounded w-16"></div></td>
                    <td className="py-4 px-6 text-right"><div className="h-4 bg-slate-800 rounded w-12 ml-auto"></div></td>
                  </tr>
                ))
              ) : franchiseLocations.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-500 font-medium bg-[#091225]">
                    No franchise locations found.
                  </td>
                </tr>
              ) : (
                franchiseLocations.map((f) => (
                  <tr key={f.id} className="hover:bg-[#0c1830] transition">
                    <td className="py-4 px-6 font-semibold text-slate-400">#{f.id}</td>
                    <td className="py-4 px-6 font-bold text-white">{f.city}, {f.state}</td>
                    <td className="py-4 px-6 text-slate-400 truncate max-w-xs">{f.address}</td>
                    <td className="py-4 px-6">
                      {f.contactName && <div className="font-semibold text-slate-200">{f.contactName}</div>}
                      <div className="text-slate-400 select-all">{f.email}</div>
                      <div className="text-slate-500 text-[10px] select-all">{f.phone}</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        f.isActive
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25'
                          : 'bg-slate-500/10 text-slate-400 border border-slate-500/25'
                      }`}>
                        {f.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEditOpen(f)}
                          className="text-slate-400 hover:text-white p-1.5 bg-[#050a16] border border-slate-800 rounded-sm hover:border-slate-600 transition"
                          title="Edit"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-2.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(f.id)}
                          className="text-slate-500 hover:text-red-500 p-1.5 bg-[#050a16] border border-slate-800 rounded-sm hover:border-red-900/30 transition"
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
          <div className="bg-[#0c1933]/30 border-t border-slate-800 px-6 py-4 flex items-center justify-between">
            <div className="text-xs text-slate-400">
              Page <span className="font-semibold text-white">{page}</span> of <span className="font-semibold text-white">{totalPages}</span> ({totalItems} total items)
            </div>
            <div className="flex space-x-2">
              <button
                disabled={page === 1 || loading}
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                className="bg-[#050a16] border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 px-3 py-1.5 rounded-sm font-semibold text-xs transition disabled:opacity-50 disabled:pointer-events-none"
              >
                Previous
              </button>
              <button
                disabled={page === totalPages || loading}
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
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
          <div className="bg-[#091225] border border-slate-800 rounded-sm w-full max-w-lg shadow-2xl overflow-hidden animate-zoom-in max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-[#0c1933]/50 sticky top-0">
              <h3 className="font-bold text-sm uppercase tracking-wider text-white">
                {editingFranchiseLocation ? 'Edit Franchise Location' : 'Add Franchise Location'}
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
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">State *</label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-[#050a16] border border-slate-800 text-slate-200 text-xs px-3 py-2.5 rounded-sm focus:outline-none focus:border-slate-700 transition"
                  >
                    <option value="">Select State</option>
                    {INDIAN_STATES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="e.g. Ahmedabad"
                    required
                    className="w-full bg-[#050a16] border border-slate-800 text-slate-200 text-xs px-3 py-2.5 rounded-sm focus:outline-none focus:border-slate-700 transition"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Full Address *</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Full street address"
                  rows="3"
                  required
                  className="w-full bg-[#050a16] border border-slate-800 text-slate-200 text-xs px-3 py-2.5 rounded-sm focus:outline-none focus:border-slate-700 transition resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Contact Name</label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  placeholder="e.g. Rajesh Patel"
                  className="w-full bg-[#050a16] border border-slate-800 text-slate-200 text-xs px-3 py-2.5 rounded-sm focus:outline-none focus:border-slate-700 transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="franchise@example.com"
                    required
                    className="w-full bg-[#050a16] border border-slate-800 text-slate-200 text-xs px-3 py-2.5 rounded-sm focus:outline-none focus:border-slate-700 transition"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="9999999999"
                    required
                    className="w-full bg-[#050a16] border border-slate-800 text-slate-200 text-xs px-3 py-2.5 rounded-sm focus:outline-none focus:border-slate-700 transition"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  name="isActive"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="w-4 h-4 accent-red-600 cursor-pointer"
                />
                <label htmlFor="isActive" className="text-xs text-slate-300 cursor-pointer select-none">
                  Active (visible in the public Franchise Locator)
                </label>
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
                  <span>{editingFranchiseLocation ? 'Update' : 'Create'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
