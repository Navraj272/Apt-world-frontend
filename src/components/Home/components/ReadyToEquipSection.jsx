import React from 'react';

function ReadyToEquipSection() {
  return (
    <section id="franchise" className="bg-white py-16 sm:py-24">
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Angled Banner Container */}
        <div 
          className="relative bg-[#050D1A] text-white p-8 sm:p-12 md:p-16 border border-white/5 shadow-2xl overflow-hidden rounded-sm"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 90%, 98% 100%, 0 100%)'
          }}
        >
          {/* Subtle Industrial Background Grid Lines */}
          <div className="absolute inset-0 opacity-5 pointer-events-none select-none">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
            {/* Left Content */}
            <div className="space-y-4 max-w-[650px]">
              <h2 className="font-khand text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white leading-none">
                READY TO EQUIP YOUR <br className="hidden sm:inline" /> ENTERPRISE?
              </h2>
              <p className="font-montserrat text-xs sm:text-sm text-gray-400 font-medium leading-relaxed">
                Partner with APT WORLD for bulk procurement, customized industrial supply chains, and specialized on-site technical services support.
              </p>
            </div>

            {/* Right Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="/contact"
                className="text-center font-montserrat text-xs font-bold tracking-widest text-white bg-[#E11922] px-6 py-2 rounded-sm hover:bg-transparent hover:border-[#E11922] hover:text-[#E11922] border border-transparent transition-all duration-300 shadow-lg shadow-[#E11922]/15 uppercase"
              >
                REQUEST DISCUSSION
              </a>
              <a
                href="/contact"
                className="text-center font-montserrat text-xs font-bold tracking-widest text-white border border-white/20 px-6 py-2 rounded-sm hover:bg-white hover:text-[#050D1A] hover:border-white transition-all duration-300 uppercase"
              >
                OFFICE LOCATOR
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default ReadyToEquipSection;
