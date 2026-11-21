import React, { useState, useEffect, useRef } from 'react';
import { equipmentData } from '../data/equipmentData';


function SpecTable({ head, rows, noMargin }) {
  return (
    <div className={`${noMargin ? '' : 'mt-10 '}rounded-2xl border border-gray-100 overflow-hidden shadow-sm`}>
      <div className="max-h-[420px] overflow-y-auto overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="sticky top-0 z-10">
            <tr className="bg-[var(--apt-navy)]">
              {head.map((h, i) => (
                <th key={i} className="font-montserrat text-[10px] sm:text-xs font-bold tracking-wider text-white px-4 py-3.5 text-left uppercase whitespace-nowrap border-r border-white/5 last:border-r-0">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} className={`${ri % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-red-50/30 transition-colors`}>
                {row.map((cell, ci) => (
                  <td key={ci} className="font-montserrat text-[11px] sm:text-xs font-semibold text-gray-700 px-4 py-3 border-b border-gray-100 whitespace-nowrap">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RentalPage({ initialSlug }) {
  const initial = equipmentData.find((eq) => eq.slug === initialSlug) || equipmentData[0];
  const [activeId, setActiveId] = useState(initial.id);
  const [shownImage, setShownImage] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close the dropdown on outside click or Escape
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);
  const active = equipmentData.find((eq) => eq.id === activeId) || equipmentData[0];

  // Keep the address bar pointing at the item being viewed so it can be shared
  const selectItem = (eq) => {
    setActiveId(eq.id);
    setShownImage(null);
    if (typeof window !== 'undefined') window.history.replaceState(window.history.state, '', `/rental/${eq.slug}`);
  };

  return (
    <div className="w-full min-h-screen bg-white text-[var(--apt-navy)] pt-24 font-montserrat">

      <section className="relative bg-[var(--apt-navy)] text-white py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/images/rental/boom-lift.jpg"
            alt="Rental Equipment"
            className="w-full h-full object-cover object-center opacity-15 grayscale select-none pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--apt-navy)]/95 via-[var(--apt-navy)]/85 to-[var(--apt-navy)]/95 z-10" />
          <div className="absolute inset-0 z-10" style={{ background: 'radial-gradient(ellipse at center, transparent 20%, var(--apt-navy) 95%)' }} />
        </div>

        <div className="relative z-20 max-w-[1350px] w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="font-montserrat text-xs sm:text-sm font-black tracking-[0.25em] text-[var(--apt-red)] uppercase block">
            HEAVY EQUIPMENT RENTAL
          </span>
          <h1 className="font-khand text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-none">
            RENTAL <span className="text-[var(--apt-red)]">EQUIPMENT</span>
          </h1>
          <p className="font-montserrat text-sm sm:text-base text-gray-300 leading-relaxed max-w-[650px] font-medium pt-2">
            High-performance aerial work platforms and access equipment available for short-term and long-term rental across India.
          </p>
        </div>
      </section>

      <section className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative">
        {/* Equipment selector: dropdown styled like the Products menu in the navigation bar */}
        <div className="mb-10 pb-8 border-b border-gray-100">
          <p className="font-montserrat text-[10px] sm:text-xs font-black tracking-[0.2em] text-gray-400 uppercase mb-3">
            Select equipment ({equipmentData.length} available)
          </p>
          <div ref={menuRef} className="relative inline-block w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-haspopup="listbox"
              aria-expanded={menuOpen}
              className={`w-full sm:min-w-[320px] flex items-center justify-between gap-4 rounded-2xl border px-5 py-3.5 font-montserrat text-xs sm:text-[13px] font-bold tracking-wider uppercase bg-white/75 backdrop-blur-xl shadow-[0_10px_30px_rgba(6,15,30,0.08)] transition-colors duration-200 ${
                menuOpen ? 'border-[var(--apt-red)] text-[var(--apt-red)]' : 'border-gray-200 text-[var(--apt-navy)] hover:border-[var(--apt-red)]'
              }`}
            >
              <span className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--apt-red)]" />
                {active.title}
              </span>
              <svg
                className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${menuOpen ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div
              className={`absolute top-full left-0 pt-3 z-40 w-full sm:w-[620px] max-w-[calc(100vw-2rem)] transition-all duration-200 ease-out ${
                menuOpen ? 'opacity-100 translate-y-0 pointer-events-auto visible' : 'opacity-0 -translate-y-2 pointer-events-none invisible'
              }`}
            >
              <ul
                role="listbox"
                className="grid grid-cols-1 sm:grid-cols-2 gap-x-1 max-h-[70vh] overflow-y-auto py-3 px-2 rounded-2xl border border-white/60 bg-white/75 backdrop-blur-xl shadow-[0_20px_50px_rgba(6,15,30,0.18)]"
              >
                {equipmentData.map((eq) => {
                  const isActive = activeId === eq.id;
                  return (
                    <li key={eq.id} role="option" aria-selected={isActive}>
                      <button
                        type="button"
                        onClick={() => {
                          selectItem(eq);
                          setMenuOpen(false);
                        }}
                        className={`group w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left font-montserrat text-[13px] font-semibold tracking-wide transition-all duration-200 ${
                          isActive
                            ? 'bg-[var(--apt-red)]/10 text-[var(--apt-red)]'
                            : 'text-[#404040] hover:bg-white/70 hover:text-[var(--apt-navy)]'
                        }`}
                      >
                        <span className="w-10 h-10 shrink-0 rounded-lg overflow-hidden bg-white border border-gray-100 flex items-center justify-center">
                          <img src={eq.image} alt="" className="w-full h-full object-cover" loading="lazy" />
                        </span>
                        <span className="flex-1 uppercase">{eq.title}</span>
                        <svg className={`w-3 h-3 shrink-0 transition-opacity ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* Active equipment panel */}
        <div key={active.id} className="animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="space-y-3">
              <div className="w-full h-[320px] sm:h-[420px] relative overflow-hidden rounded-2xl bg-white group flex items-center justify-center">
                <img
                  src={shownImage || active.image}
                  alt={active.title}
                  className="max-w-full max-h-full w-auto h-auto object-contain rounded-2xl group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-3 right-3 bg-[var(--apt-navy)]/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10 select-none pointer-events-none">
                  <span className="font-khand text-xs sm:text-sm font-bold tracking-wider text-white leading-none">
                    APT <span className="text-[var(--apt-red)]">WORLD</span>
                  </span>
                </div>
              </div>

              {active.gallery && active.gallery.length > 0 && (
                <div className="flex gap-3 flex-wrap">
                  {[{ src: active.image, label: 'Product' }, ...active.gallery].map((g) => {
                    const current = shownImage || active.image;
                    return (
                      <button
                        key={g.src}
                        type="button"
                        onClick={() => setShownImage(g.src)}
                        aria-label={`Show ${g.label} image`}
                        className={`w-24 h-20 rounded-lg overflow-hidden border-2 bg-white flex items-center justify-center transition-colors ${current === g.src ? 'border-[var(--apt-red)]' : 'border-gray-200 hover:border-gray-400'}`}
                      >
                        <img src={g.src} alt={g.label} className="max-w-full max-h-full object-contain rounded-md" />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <h2 className="font-khand text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#1a1a1a]">
                  {active.title}
                </h2>
                <div className="w-16 h-[3px] bg-[var(--apt-red)]" />
              </div>
              <div className="space-y-3">
                {active.description.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="font-montserrat text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {active.specs && <SpecTable head={active.specs.head} rows={active.specs.rows} />}

          {(active.extraTables || []).map((t, ti) => (
            <div key={ti} className="mt-10 space-y-3">
              <h3 className="font-khand text-lg sm:text-xl font-bold uppercase tracking-wide text-[#1a1a1a]">{t.title}</h3>
              <SpecTable head={t.head} rows={t.rows} noMargin />
            </div>
          ))}

          {active.note && (
            <p className="mt-4 font-montserrat text-[11px] sm:text-xs text-gray-500 italic font-medium">
              Note: {active.note}
            </p>
          )}
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
        }
      `}</style>

      <section className="bg-white border-t border-gray-100 py-16 sm:py-24">
        <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-[var(--apt-navy)] to-[#262626] text-white p-8 sm:p-12 md:p-16 border border-white/10 shadow-2xl overflow-hidden rounded-2xl group transition-all duration-500 hover:border-white/15">
            {/* Glowing Accent Strip on Left */}
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[var(--apt-red)] to-red-600 rounded-l-2xl" />

            {/* Background Orbs / Glows */}
            <div className="absolute -left-12 -top-12 w-64 h-64 bg-red-600/5 blur-[80px] rounded-full pointer-events-none z-0" />
            <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-[var(--apt-red)]/10 blur-[100px] rounded-full pointer-events-none z-0" />

            {/* Grid Pattern Background */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none select-none z-0">
              <svg width="100%" height="100%">
                <defs>
                  <pattern id="rental-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#rental-grid)" />
              </svg>
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
              <div className="space-y-4 max-w-[700px]">
                {/* Visual Category Badge */}
                <div className="inline-flex items-center gap-2 bg-red-500/10 px-3 py-1.5 rounded-full border border-red-500/20 mb-1">
                  <span className="w-1.5 h-1.5 bg-[var(--apt-red)] rounded-full animate-pulse" />
                  <span className="font-montserrat text-[10px] sm:text-xs font-black tracking-[0.2em] text-[var(--apt-red)] uppercase">
                    Tailored Solutions
                  </span>
                </div>

                <h2 className="font-khand text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white leading-none">
                  NEED A <span className="text-[var(--apt-red)]">CUSTOM SOLUTION</span>?
                </h2>
                <p className="font-montserrat text-xs sm:text-sm text-gray-300 font-medium leading-relaxed">
                  Contact our rental consultants for customized fleet requirements, long-term rental agreements, and site-specific equipment recommendations.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
                <a
                  href="/contact"
                  className="group text-center font-montserrat text-xs font-bold tracking-widest text-white bg-[var(--apt-red)] px-8 py-4 rounded-xl hover:bg-white hover:text-[var(--apt-red)] transition-all duration-300 shadow-lg shadow-[var(--apt-red)]/15 hover:shadow-[var(--apt-red)]/30 hover:-translate-y-0.5 uppercase flex items-center justify-center gap-2.5"
                >
                  <span>REQUEST RENTAL</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
                <a
                  href="/contact"
                  className="group text-center font-montserrat text-xs font-bold tracking-widest text-white border border-white/20 px-8 py-4 rounded-xl hover:bg-white hover:text-[var(--apt-navy)] hover:border-white transition-all duration-300 hover:-translate-y-0.5 uppercase flex items-center justify-center gap-2.5"
                >
                  <span>CONTACT SALES</span>
                  <svg className="w-4 h-4 text-white/50 group-hover:text-[var(--apt-navy)] transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default RentalPage;
