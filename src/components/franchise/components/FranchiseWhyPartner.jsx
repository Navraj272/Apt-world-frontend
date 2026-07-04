import React, { useState } from 'react';

// Custom SVG Icons for the 6 key advantages
const IconMap = {
  box: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
  money: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  megaphone: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
    </svg>
  ),
  manager: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
    </svg>
  ),
  tech: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  shield: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  )
};

function FranchiseWhyPartner({ data }) {
  const { title, items } = data;
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section className="bg-[var(--apt-offwhite)] py-16 sm:py-24 overflow-hidden relative">

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-[0.025]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="why-grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#404040" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#why-grid)" />
        </svg>
      </div>

      {/* Ambient red glow – top right */}
      <div className="absolute top-0 right-0 w-[480px] h-[320px] rounded-full bg-[var(--apt-red)] opacity-[0.05] blur-[120px] pointer-events-none" />

      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section Header ── */}
        <div className="flex flex-col items-center text-center mb-14 sm:mb-20 space-y-4">
          <span className="font-montserrat text-xs sm:text-sm font-black tracking-[0.25em] text-[var(--apt-red)] uppercase">
            FRANCHISE ADVANTAGES
          </span>
          <h2 className="font-khand text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-[var(--apt-navy)] leading-none">
            {title}
          </h2>
          <div className="flex items-center gap-2">
            <div className="w-8 h-[3px] bg-[var(--apt-red)] rounded-full" />
            <div className="w-20 h-[3px] bg-[var(--apt-red)] rounded-full" />
            <div className="w-8 h-[3px] bg-[var(--apt-red)] rounded-full" />
          </div>
          <p className="font-montserrat text-xs sm:text-sm text-[#4B5563] font-medium max-w-[520px] leading-relaxed pt-1">
            Six powerful reasons why top entrepreneurs choose the APT WORLD franchise ecosystem.
          </p>
        </div>

        {/* ── Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {items.map((item, index) => {
            const isHovered = hoveredId === item.id;
            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden cursor-default transition-all duration-300 hover:-translate-y-2 hover:border-[var(--apt-red)]/30 shadow-[0_2px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.14)] pb-1"
              >
                {/* Red top bar — always visible, thickens on hover */}
                <div
                  className="absolute top-0 left-0 right-0 bg-[var(--apt-red)] transition-all duration-300"
                  style={{ height: isHovered ? '5px' : '4px' }}
                />

                {/* Card body */}
                <div className="p-7 sm:p-8 flex flex-col gap-5 h-full">

                  {/* Card Number – faint watermark */}
                  <span className="absolute top-4 right-5 font-outfit text-6xl font-black select-none pointer-events-none leading-none transition-colors duration-300"
                    style={{ color: isHovered ? 'rgba(220,38,38,0.08)' : 'rgba(0,0,0,0.06)' }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* Icon */}
                  <div className="relative z-10 flex items-start">
                    <div
                      className="p-3.5 rounded-xl border transition-all duration-300"
                      style={{
                        backgroundColor: isHovered ? 'var(--apt-red)' : 'var(--apt-offwhite)',
                        borderColor: isHovered ? 'var(--apt-red)' : '#e5e7eb',
                        color: isHovered ? 'white' : 'var(--apt-red)',
                        boxShadow: isHovered ? '0 8px 24px rgba(220,38,38,0.35)' : '0 1px 3px rgba(0,0,0,0.06)',
                      }}
                    >
                      {IconMap[item.icon] || IconMap.box}
                    </div>
                  </div>

                  {/* Text content */}
                  <div className="relative z-10 space-y-2 flex-1">
                    <h3
                      className="font-khand text-xl sm:text-2xl font-extrabold tracking-wide uppercase transition-colors duration-300"
                      style={{ color: isHovered ? 'var(--apt-red)' : 'var(--apt-navy)' }}
                    >
                      {item.title}
                    </h3>
                    <p className="font-montserrat text-xs sm:text-[13px] text-[#4B5563] font-medium leading-relaxed group-hover:text-[#4B5563]/90 transition-colors duration-300">
                      {item.description}
                    </p>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* ── Bottom CTA strip ── */}
        <div className="mt-14 sm:mt-20 flex flex-col sm:flex-row items-center justify-between gap-6 bg-[var(--apt-navy)] border border-white/5 text-white rounded-2xl px-8 sm:px-12 py-8 sm:py-10 relative overflow-hidden">
          {/* Decorative red glow inside CTA */}
          <div className="absolute -left-16 top-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-[var(--apt-red)] opacity-[0.15] blur-[60px] pointer-events-none" />

          <div className="relative z-10 text-center sm:text-left space-y-1.5">
            <span className="font-montserrat text-[10px] font-black tracking-[0.25em] text-[var(--apt-red)] uppercase">
              READY TO JOIN?
            </span>
            <h3 className="font-khand text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white leading-none">
              START YOUR APT WORLD JOURNEY
            </h3>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3">
            <a
              href="#franchise-inquiry-form"
              onClick={e => { e.preventDefault(); document.getElementById('franchise-inquiry-form')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="font-montserrat text-xs font-bold tracking-widest text-white bg-[var(--apt-red)] px-7 py-3 rounded-xl border border-transparent hover:bg-white hover:text-[var(--apt-red)] transition-all duration-300 shadow-lg shadow-[var(--apt-red)]/30 uppercase whitespace-nowrap"
            >
              INQUIRE NOW
            </a>
            <a
              href="#franchise-models"
              onClick={e => { e.preventDefault(); document.getElementById('franchise-models')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="font-montserrat text-xs font-bold tracking-widest text-white border border-white/30 px-7 py-3 rounded-xl hover:bg-white hover:text-[var(--apt-navy)] hover:border-white transition-all duration-300 uppercase whitespace-nowrap"
            >
              VIEW MODELS
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

export default FranchiseWhyPartner;
