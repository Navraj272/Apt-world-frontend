import React from 'react';

function CatalogueSection() {
  const sectors = [
    {
      id: 1,
      title: 'POWER TOOLS',
      count: '2,500+ ITEMS',
      description: 'Dynamic range of grinders, drills, and specialized hammers for intense industrial work.',
      link: '/categories/power-tools',
      icon: (
        <svg className="w-8 h-8 text-[var(--apt-red)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
        </svg>
      )
    },
    {
      id: 2,
      title: 'CLEANING SOLUTIONS',
      count: '1,200+ ITEMS',
      description: 'High-pressure washers, industrial vacuums, and advanced floor care machinery.',
      link: '/categories/cleaning-solutions',
      icon: (
        <svg className="w-8 h-8 text-[var(--apt-red)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a7 7 0 10-14 0v2m7-7v2" />
        </svg>
      )
    },
    {
      id: 3,
      title: 'CORDLESS',
      count: '850+ ITEMS',
      description: 'Next-gen battery-powered tools including impact drills, wrenches, and chainsaws.',
      link: '/categories/cordless',
      icon: (
        <svg className="w-8 h-8 text-[var(--apt-red)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      id: 4,
      title: 'AGRICULTURE MACHINES',
      count: '950+ ITEMS',
      description: 'Power sprayers, tillers, and specialized harvesters for modern farming.',
      link: '/categories/agriculture-machines',
      icon: (
        <svg className="w-8 h-8 text-[var(--apt-red)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l9-5-9-5-9 5 9 5zm0 0v8m-4-4h8" />
        </svg>
      )
    },
    {
      id: 5,
      title: 'LIFTING PRODUCTS',
      count: '420+ ITEMS',
      description: 'Chain hoists, winches, and heavy-duty cranes for safe and efficient material handling.',
      link: '/categories/lifting-products',
      icon: (
        <svg className="w-8 h-8 text-[var(--apt-red)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 11l5-5m0 0l5 5m-5-5v12" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 20h16" />
        </svg>
      )
    },
    {
      id: 6,
      title: 'AERIAL WORK',
      count: '150+ ITEMS',
      description: 'Scissor lifts, boom lifts, and aerial platforms for elevated industrial operations.',
      link: '/categories/aerial-work-platforms',
      icon: (
        <svg className="w-8 h-8 text-[var(--apt-red)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      )
    },
    {
      id: 7,
      title: 'CONSTRUCTION',
      count: '1,800+ ITEMS',
      description: 'Bar bending, cutting, and leveling machines for large-scale infrastructure projects.',
      link: '/categories/construction',
      icon: (
        <svg className="w-8 h-8 text-[var(--apt-red)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      id: 8,
      title: 'PACKAGING',
      count: '700+ ITEMS',
      description: 'Capping, sealing, and labeling machines designed for automated production lines.',
      link: '/categories/packaging',
      icon: (
        <svg className="w-8 h-8 text-[var(--apt-red)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14v14m0-14L4 7m0 0v10l8 4" />
        </svg>
      )
    },
    {
      id: 9,
      title: 'WELDING MACHINES',
      count: '550+ ITEMS',
      description: 'Precision ARC, MIG, TIG, and laser welding solutions for metal fabrication.',
      link: '/categories/welding-machines',
      icon: (
        <svg className="w-8 h-8 text-[var(--apt-red)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14M12 3v10" />
        </svg>
      )
    },
    {
      id: 10,
      title: 'MHE EQUIPMENT',
      count: '380+ ITEMS',
      description: 'Battery pallet trucks, forklifts, and stackers for high-velocity logistics.',
      link: '/categories/mhe-material-handling-equipment',
      icon: (
        <svg className="w-8 h-8 text-[var(--apt-red)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ];

  return (
    <section id="catalogue" className="py-20 sm:py-32 bg-[var(--apt-offwhite)] overflow-hidden">
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 sm:pb-16 border-b border-gray-100 mb-12 sm:mb-16">
          <div className="space-y-3">
            <span className="font-montserrat text-xs sm:text-sm font-black tracking-[0.2em] text-[var(--apt-red)] uppercase">
              PRODUCT PORTFOLIO
            </span>
            <h2 className="font-khand text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-[#1a1a1a] leading-none">
              CATALOGUE BY SECTOR
            </h2>
          </div>
          <p className="font-montserrat text-sm sm:text-base text-gray-500 font-medium max-w-[420px] md:text-right leading-relaxed">
            Precision-engineered tools designed for seamless industrial integration and workflow efficiency.
          </p>
        </div>

        {/* 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {sectors.map((sector) => (
            <div
              key={sector.id}
              className="group relative flex flex-col justify-between p-8 sm:p-10 bg-white border border-gray-100 rounded-2xl transition-all duration-300 hover:border-[var(--apt-red)]/40 hover:shadow-xl hover:shadow-[var(--apt-red)]/5 hover:-translate-y-1"
            >
              {/* Card Header (Icon & Count) */}
              <div className="flex items-center justify-between">
                <div className="p-3 bg-[var(--apt-offwhite)] rounded-xl group-hover:bg-[var(--apt-red)]/10 transition-colors duration-300">
                  {sector.icon}
                </div>
                <span className="font-outfit text-[11px] sm:text-xs font-bold tracking-widest text-gray-400 group-hover:text-[var(--apt-red)]/80 transition-colors duration-300">
                  {sector.count}
                </span>
              </div>

              {/* Title & Description */}
              <div className="mt-8 sm:mt-10 mb-6 sm:mb-8 space-y-3">
                <h3 className="font-khand text-2xl sm:text-3xl font-extrabold tracking-wide text-[#1a1a1a] group-hover:text-[var(--apt-red)] transition-colors duration-300">
                  {sector.title}
                </h3>
                <p className="font-montserrat text-xs sm:text-sm text-gray-500 font-medium leading-relaxed">
                  {sector.description}
                </p>
              </div>

              {/* Action Link */}
              <div>
                <a
                  href={sector.link}
                  className="inline-flex items-center font-montserrat text-[10px] sm:text-xs font-bold tracking-widest text-[var(--apt-red)] group-hover:text-black transition-colors duration-300"
                >
                  VIEW PRODUCTS
                  <svg
                    className="w-3.5 h-3.5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default CatalogueSection;
