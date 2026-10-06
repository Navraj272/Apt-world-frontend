import React from 'react';
import useEnquiry from '../hook/useEnquiry';

export default function EnquiriesTab() {
  const {
    enquiries,
    loading,
    page,
    setPage,
    totalPages,
    totalItems,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    selectedEnquiry,
    setSelectedEnquiry,
    handleStatusChange
  } = useEnquiry();

  // Format date to local readable string
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-[var(--apt-navy)]">Enquiries</h2>
          <p className="text-xs text-gray-500 mt-1">Review and manage distributor and product quote requests</p>
        </div>
      </div>

      {/* Control bar */}
      <div className="bg-white border border-gray-200 p-4 rounded-sm flex flex-col md:flex-row items-stretch md:items-center gap-4">
        {/* Search Input */}
        <div className="relative flex-grow max-w-md">
          <input
            type="text"
            placeholder="Search enquiries by name, contact, product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-xs px-3 py-2.5 pl-9 rounded-sm focus:outline-none focus:border-gray-300 transition"
          />
          <svg className="w-4 h-4 text-gray-400 absolute left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Status Filter Tab Buttons */}
        <div className="flex bg-gray-50 border border-gray-200 rounded-sm p-1">
          {['all', 'pending', 'resolved'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-wider transition-all ${
                statusFilter === status 
                  ? 'bg-[var(--apt-red)] text-white shadow-sm' 
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="md:ml-auto text-xs text-gray-500 font-medium self-center">
          Showing {enquiries.length} enquiries
        </div>
      </div>

      {/* Table view */}
      <div className="bg-white border border-gray-200 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 text-xs font-semibold uppercase tracking-wider bg-gray-50">
                <th className="py-4 px-6 w-16">ID</th>
                <th className="py-4 px-6">Customer Details</th>
                <th className="py-4 px-6">Product & Qty</th>
                <th className="py-4 px-6">Message</th>
                <th className="py-4 px-6">Submitted At</th>
                <th className="py-4 px-6 w-32">Status</th>
                <th className="py-4 px-6 w-36 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-600 text-xs">
              {loading ? (
                Array.from({ length: 3 }).map((_, idx) => (
                  <tr key={idx} className="animate-pulse">
                    <td className="py-4 px-6"><div className="h-4 bg-gray-200 rounded w-8"></div></td>
                    <td className="py-4 px-6">
                      <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-36"></div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="h-4 bg-gray-200 rounded w-28 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-16"></div>
                    </td>
                    <td className="py-4 px-6"><div className="h-4 bg-gray-200 rounded w-48"></div></td>
                    <td className="py-4 px-6"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
                    <td className="py-4 px-6"><div className="h-6 bg-gray-200 rounded w-16"></div></td>
                    <td className="py-4 px-6 text-right"><div className="h-4 bg-gray-200 rounded w-20 ml-auto"></div></td>
                  </tr>
                ))
              ) : enquiries.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-gray-400 font-medium bg-white">
                    No enquiries found.
                  </td>
                </tr>
              ) : (
                enquiries.map((enquiry) => (
                  <tr key={enquiry.id} className="hover:bg-gray-50 transition">
                    {/* ID */}
                    <td className="py-4 px-6 font-semibold text-gray-500">#{enquiry.id}</td>
                    
                    {/* Customer */}
                    <td className="py-4 px-6">
                      <div className="font-bold text-[var(--apt-navy)]">{enquiry.name || 'N/A'}</div>
                      <div className="text-gray-500 mt-0.5 select-all">{enquiry.email}</div>
                      {enquiry.phone && <div className="text-gray-400 text-[10px] mt-0.5 select-all">{enquiry.phone}</div>}
                    </td>

                    {/* Product Quote Details */}
                    <td className="py-4 px-6">
                      {enquiry.product ? (
                        <>
                          <div className="font-semibold text-gray-800">{enquiry.product.name?.en}</div>
                          <div className="text-[10px] text-gray-500 font-mono mt-0.5 uppercase">Code: {enquiry.product.baseCode}</div>
                          <div className="inline-flex items-center text-[10px] text-emerald-400 font-bold mt-1 bg-emerald-500/10 px-1 py-0.5 rounded-[3px]">
                            Qty: {enquiry.quantity || 1}
                          </div>
                        </>
                      ) : enquiry.type === 'franchise_product' && enquiry.franchiseLocation ? (
                        <>
                          <div className="font-semibold text-gray-800">{enquiry.franchiseLocation.city}, {enquiry.franchiseLocation.state}</div>
                          <div className="text-[10px] text-gray-500 mt-0.5 select-all">{enquiry.franchiseLocation.email}</div>
                          <div className="inline-flex items-center text-[10px] text-amber-400 font-bold mt-1 bg-amber-500/10 px-1 py-0.5 rounded-[3px]">
                            Photos sent via email
                          </div>
                        </>
                      ) : (
                        <span className="text-gray-400 italic">General Enquiry</span>
                      )}
                    </td>

                    {/* Message Details */}
                    <td className="py-4 px-6">
                      <div className="max-w-xs md:max-w-sm truncate text-gray-600">
                        {enquiry.message || '-'}
                      </div>
                      {enquiry.message && enquiry.message.length > 40 && (
                        <button
                          type="button"
                          onClick={() => setSelectedEnquiry(enquiry)}
                          className="text-red-500 hover:text-red-400 text-[10px] font-bold uppercase mt-1 transition-all"
                        >
                          Read Message
                        </button>
                      )}
                    </td>

                    {/* Date */}
                    <td className="py-4 px-6 text-gray-500 whitespace-nowrap">{formatDate(enquiry.createdAt)}</td>

                    {/* Status Badge */}
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        enquiry.status === 'resolved' 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {enquiry.status || 'pending'}
                      </span>
                    </td>

                    {/* Actions Status Selector */}
                    <td className="py-4 px-6 text-right">
                      {enquiry.status !== 'resolved' ? (
                        <button
                          onClick={() => handleStatusChange(enquiry.id, 'resolved')}
                          className="inline-flex items-center space-x-1.5 text-emerald-400 hover:text-emerald-300 bg-gray-50 border border-gray-200 hover:border-emerald-500/25 px-2.5 py-1.5 rounded-sm transition-all text-[10px] font-bold uppercase tracking-wide"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Resolve</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleStatusChange(enquiry.id, 'pending')}
                          className="inline-flex items-center space-x-1.5 text-amber-400 hover:text-amber-300 bg-gray-50 border border-gray-200 hover:border-amber-500/25 px-2.5 py-1.5 rounded-sm transition-all text-[10px] font-bold uppercase tracking-wide"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H12" />
                          </svg>
                          <span>Reopen</span>
                        </button>
                      )}
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

      {/* Message Modal Overlay */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-gray-200 rounded-sm w-full max-w-lg shadow-2xl overflow-hidden animate-zoom-in">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-gray-50">
              <h3 className="font-bold text-sm uppercase tracking-wider text-[var(--apt-navy)]">
                Enquiry Details
              </h3>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="text-gray-500 hover:text-[var(--apt-navy)] transition"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content Details */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-gray-400 font-bold block uppercase text-[10px] tracking-wider mb-0.5">Name</span>
                  <span className="text-[var(--apt-navy)] font-bold">{selectedEnquiry.name || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-bold block uppercase text-[10px] tracking-wider mb-0.5">Contact</span>
                  <span className="text-gray-800 select-all block">{selectedEnquiry.email}</span>
                  {selectedEnquiry.phone && <span className="text-gray-500 select-all">{selectedEnquiry.phone}</span>}
                </div>
                {selectedEnquiry.product && (
                  <>
                    <div>
                      <span className="text-gray-400 font-bold block uppercase text-[10px] tracking-wider mb-0.5">Product</span>
                      <span className="text-[var(--apt-navy)] block font-semibold">{selectedEnquiry.product.name?.en}</span>
                      <span className="text-gray-500 text-[10px] font-mono select-all">({selectedEnquiry.product.baseCode})</span>
                    </div>
                    <div>
                      <span className="text-gray-400 font-bold block uppercase text-[10px] tracking-wider mb-0.5">Quantity</span>
                      <span className="text-[var(--apt-navy)] block font-bold">{selectedEnquiry.quantity || 1}</span>
                    </div>
                  </>
                )}
                <div>
                  <span className="text-gray-400 font-bold block uppercase text-[10px] tracking-wider mb-0.5">Submitted At</span>
                  <span className="text-gray-600 block">{formatDate(selectedEnquiry.createdAt)}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-bold block uppercase text-[10px] tracking-wider mb-0.5">Status</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mt-0.5 ${
                    selectedEnquiry.status === 'resolved' 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {selectedEnquiry.status || 'pending'}
                  </span>
                </div>
              </div>

              {/* Message box */}
              <div className="border-t border-gray-200 pt-4 mt-4 space-y-1">
                <span className="text-gray-400 font-bold block uppercase text-[10px] tracking-wider">Message</span>
                <div className="bg-gray-50 border border-gray-200 p-4 rounded-sm text-gray-800 text-xs font-medium max-h-48 overflow-y-auto whitespace-pre-wrap select-all leading-relaxed">
                  {selectedEnquiry.message || 'No message provided.'}
                </div>
              </div>

              {/* Action Button inside modal */}
              <div className="flex justify-end pt-4 border-t border-gray-200 mt-6">
                <button
                  onClick={() => setSelectedEnquiry(null)}
                  className="bg-gray-50 border border-gray-200 text-gray-600 hover:text-[var(--apt-navy)] hover:border-gray-300 px-5 py-2 rounded-sm font-bold text-xs uppercase transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
