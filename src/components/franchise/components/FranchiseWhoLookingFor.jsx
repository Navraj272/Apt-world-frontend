import React from 'react';

// Custom outline SVG icons for target partner profiles
const TargetIconMap = {
  dealers: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  hardhat: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  building: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  )
};

function FranchiseWhoLookingFor({ data }) {
  const { title, items, image } = data;

  return (
    <section className="bg-[var(--apt-offwhite)] py-16 sm:py-24 overflow-hidden relative">

      {/* Subtle background pattern */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-[0.025]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="who-grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#404040" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#who-grid)" />
        </svg>
      </div>

      {/* Ambient glow – bottom left */}
      <div className="absolute bottom-0 left-0 w-[420px] h-[280px] rounded-full bg-[var(--apt-red)] opacity-[0.05] blur-[100px] pointer-events-none" />

      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 items-center">
          {/* Left Column: Text Cards */}
          <div className="lg:col-span-6 space-y-8">
            {/* Title */}
            <div className="space-y-3">
              <span className="font-montserrat text-xs sm:text-sm font-black tracking-[0.25em] text-[var(--apt-red)] uppercase">
                IDEAL PARTNERS
              </span>
              <h2 className="font-khand text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-[var(--apt-navy)] leading-none">
                {title}
              </h2>
              <div className="flex items-center gap-2">
                <div className="w-8 h-[3px] bg-[var(--apt-red)] rounded-full" />
                <div className="w-20 h-[3px] bg-[var(--apt-red)] rounded-full" />
              </div>
            </div>

            {/* Sub-cards */}
            <div className="space-y-4">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="group bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 flex items-start gap-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[var(--apt-red)]/8 hover:border-[var(--apt-red)]/20 relative overflow-hidden"
                >
                  {/* Hover accent bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[var(--apt-red)] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top rounded-r-full" />

                  {/* Icon Wrapper */}
                  <div className="p-3 bg-[var(--apt-offwhite)] rounded-xl shrink-0 border border-gray-100 text-[var(--apt-red)] group-hover:bg-[var(--apt-red)] group-hover:border-[var(--apt-red)] group-hover:text-white transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[var(--apt-red)]/20">
                    {TargetIconMap[item.icon] || TargetIconMap.dealers}
                  </div>

                  {/* Info */}
                  <div className="space-y-1.5 flex-1">
                    <h3 className="font-khand text-lg sm:text-xl font-extrabold text-[var(--apt-navy)] uppercase tracking-wide group-hover:text-[var(--apt-red)] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="font-montserrat text-xs sm:text-[13px] text-[#4B5563] font-medium leading-relaxed group-hover:text-[#4B5563]/90 transition-colors duration-300">
                      {item.description}
                    </p>
                  </div>

                  {/* Step number watermark */}
                  <span className="absolute top-3 right-4 font-outfit text-5xl font-black text-gray-100 leading-none pointer-events-none select-none group-hover:text-[var(--apt-red)]/10 transition-colors duration-300">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Handshake Image */}
          <div className="lg:col-span-6 h-full min-h-[350px] sm:min-h-[480px] relative">
            <div className="w-full h-full relative rounded-2xl overflow-hidden group shadow-2xl shadow-black/10 border border-gray-100">
              <img
                src={image}
                alt="Partner Partnership Handshake"
                className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--apt-navy)]/30 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--apt-navy)]/10 via-transparent to-transparent pointer-events-none" />

              {/* Floating badge */}
              <div className="absolute bottom-5 left-5 bg-[var(--apt-red)] text-white px-4 py-3 rounded-xl shadow-xl">
                <div className="font-outfit text-2xl font-black leading-none">25+</div>
                <div className="font-montserrat text-[9px] font-black tracking-[0.2em] uppercase mt-0.5 opacity-90">YEARS LEGACY</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default FranchiseWhoLookingFor;
