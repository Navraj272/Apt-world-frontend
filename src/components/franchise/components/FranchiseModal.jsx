import React, { useEffect } from 'react';

function FranchiseModal({ isOpen, onClose, children }) {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      onClick={(e) => {
        // Close on overlay backdrop click
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[var(--apt-navy)]/80 backdrop-blur-sm animate-fade-in"
    >
      {/* Modal Content Container */}
      <div className="relative bg-white w-full max-w-[780px] max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl border-t-[5px] border-t-[var(--apt-red)] p-6 sm:p-10 transform scale-100 transition-all duration-300 animate-scale-up scrollbarcontainer">
        
        {/* Sleek Close X Button */}
        <button
          onClick={onClose}
          aria-label="Close Modal"
          className="absolute top-4 right-4 text-gray-400 hover:text-[var(--apt-navy)] transition-colors p-2"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Form Content */}
        <div className="pt-2">
          {children}
        </div>

      </div>

      {/* Embedded local keyframe animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out forwards;
        }
        .animate-scale-up {
          animation: scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}

export default FranchiseModal;
