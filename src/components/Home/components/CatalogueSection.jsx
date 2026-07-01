import React, { useState } from 'react';

function CatalogueSection() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const sectors = [
    {
      id: 1,
      title: 'POWER TOOLS',
      count: '2,500+ ITEMS',
      group: 'power-cordless',
      popular: 'Angle Grinders, Rotary Hammers, Circular Saws',
      description: 'Dynamic range of grinders, drills, and specialized hammers for intense industrial work.',
      link: '/categories/power-tools',
      icon: (
        <svg className="w-8 h-8 text-[var(--apt-red)] transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
        </svg>
      )
    },
    {
      id: 2,
      title: 'CLEANING SOLUTIONS',
      count: '1,200+ ITEMS',
      group: 'logistics-supply',
      popular: 'High-Pressure Washers, Industrial Floor Sweepers',
      description: 'High-pressure washers, industrial vacuums, and advanced floor care machinery.',
      link: '/categories/cleaning-solutions',
      icon: (
        <svg className="w-8 h-8 text-[var(--apt-red)] transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.5c-4.142 0-7.5-3.358-7.5-7.5C4.5 9 12 3 12 3s7.5 6 7.5 11c0 4.142-3.358 7.5-7.5 7.5z" />
        </svg>
      )
    },
    {
      id: 3,
      title: 'CORDLESS',
      count: '850+ ITEMS',
      group: 'power-cordless',
      popular: 'Brushless Drills, Lithium Impact Wrenches',
      description: 'Next-gen battery-powered tools including impact drills, wrenches, and chainsaws.',
      link: '/categories/cordless',
      icon: (
        <svg className="w-8 h-8 text-[var(--apt-red)] transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      id: 4,
      title: 'AGRICULTURE MACHINES',
      count: '950+ ITEMS',
      group: 'construction-agri',
      popular: 'High-Pressure Sprayers, Power Weeders, Tillers',
      description: 'Power sprayers, tillers, and specialized harvesters for modern farming.',
      link: '/categories/agriculture-machines',
      icon: (
        <svg className="w-8 h-8 text-[var(--apt-red)] transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 5c-3-2.5-6-1.5-6 2s3 4.5 6 4.5m0-6.5c3-2.5 6-1.5 6 2s-3 4.5-6 4.5" />
        </svg>
      )
    },
    {
      id: 5,
      title: 'LIFTING PRODUCTS',
      count: '420+ ITEMS',
      group: 'logistics-supply',
      popular: 'Electric Chain Hoists, Webbing Slings, Winches',
      description: 'Chain hoists, winches, and heavy-duty cranes for safe and efficient material handling.',
      link: '/categories/lifting-products',
      icon: (
        <svg className="w-8 h-8 text-[var(--apt-red)] transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 11l5-5m0 0l5 5m-5-5v12" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 20h16" />
        </svg>
      )
    },
    {
      id: 6,
      title: 'AERIAL WORK',
      count: '150+ ITEMS',
      group: 'construction-agri',
      popular: 'Articulated Boom Lifts, Scissor Lift Platforms',
      description: 'Scissor lifts, boom lifts, and aerial platforms for elevated industrial operations.',
      link: '/categories/aerial-work-platforms',
      icon: (
        <svg className="w-8 h-8 text-[var(--apt-red)] transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM9 3v18M15 3v18M3 9h18M3 15h18" />
        </svg>
      )
    },
    {
      id: 7,
      title: 'CONSTRUCTION',
      count: '1,800+ ITEMS',
      group: 'construction-agri',
      popular: 'Bar Bending Machines, Plate Compactors',
      description: 'Bar bending, cutting, and leveling machines for large-scale infrastructure projects.',
      link: '/categories/construction',
      icon: (
        <svg className="w-8 h-8 text-[var(--apt-red)] transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      id: 8,
      title: 'PACKAGING',
      count: '700+ ITEMS',
      group: 'logistics-supply',
      popular: 'Pneumatic Strapping Tools, Continuous Band Sealers',
      description: 'Capping, sealing, and labeling machines designed for automated production lines.',
      link: '/categories/packaging',
      icon: (
        <svg className="w-8 h-8 text-[var(--apt-red)] transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14v14m0-14L4 7m0 0v10l8 4" />
        </svg>
      )
    },
    {
      id: 9,
      title: 'WELDING MACHINES',
      count: '550+ ITEMS',
      group: 'construction-agri',
      popular: 'Inverter ARC Welders, Portable MIG/TIG Machines',
      description: 'Precision ARC, MIG, TIG, and laser welding solutions for metal fabrication.',
      link: '/categories/welding-machines',
      icon: (
        <svg className="w-8 h-8 text-[var(--apt-red)] transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14M12 3v10" />
        </svg>
      )
    },
    {
      id: 10,
      title: 'MHE EQUIPMENT',
      count: '380+ ITEMS',
      group: 'logistics-supply',
      popular: 'Semi-Electric Pallet Trucks, Forklifts, Stackers',
      description: 'Battery pallet trucks, forklifts, and stackers for high-velocity logistics.',
      link: '/categories/mhe-material-handling-equipment',
      icon: (
        <svg className="w-8 h-8 text-[var(--apt-red)] transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 14h11v3H3zM14 8h2v9h-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 6v11M18 14h3" />
          <circle cx="5.5" cy="18" r="2" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="11.5" cy="18" r="2" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )
    }
  ];

  const tabs = [
    { id: 'all', label: 'ALL SECTORS' },
    { id: 'power-cordless', label: 'POWER & CORDLESS' },
    { id: 'construction-agri', label: 'CONSTRUCTION & AGRI' },
    { id: 'logistics-supply', label: 'LOGISTICS & SUPPLY' }
  ];

  const filteredSectors = sectors.filter((sector) => {
    const matchesTab = activeTab === 'all' || sector.group === activeTab;
    const matchesSearch = sector.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          sector.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          sector.popular.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <section id="catalogue" className="py-20 sm:py-32 bg-[var(--apt-offwhite)] overflow-hidden">
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 sm:pb-16 border-b border-gray-100 mb-12">
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

        {/* Search & Tabs Filtering Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12 pb-6 border-b border-gray-100/50">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`font-montserrat text-[10px] sm:text-xs font-bold tracking-widest px-4 py-2.5 rounded-sm border transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-[var(--apt-red)] border-transparent text-white shadow-lg shadow-[var(--apt-red)]/15'
                    : 'bg-white border-gray-200 text-[#1a1a1a] hover:border-[var(--apt-red)]/40 hover:text-[var(--apt-red)]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative max-w-sm w-full">
            <input
              type="text"
              placeholder="Search sectors or products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full font-montserrat text-xs font-semibold pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-sm focus:outline-none focus:border-[var(--apt-red)] focus:ring-1 focus:ring-[var(--apt-red)] transition-all duration-300 text-black placeholder-gray-400"
            />
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black font-montserrat text-[10px] font-bold tracking-wider"
              >
                CLEAR
              </button>
            )}
          </div>
        </div>

        {/* 3x2 Grid */}
        {filteredSectors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 transition-all duration-500">
            {filteredSectors.map((sector) => (
              <div
                key={sector.id}
                className="group relative flex flex-col justify-between p-8 sm:p-10 bg-white border border-gray-100 rounded-2xl transition-all duration-500 hover:border-[var(--apt-red)]/40 hover:shadow-2xl hover:shadow-[var(--apt-red)]/5 hover:-translate-y-2 overflow-hidden"
              >
                {/* Micro-interaction backdrop pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[var(--apt-red)]/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
                <div className="absolute -right-12 -bottom-12 w-28 h-28 rounded-full bg-[var(--apt-red)]/5 blur-2xl group-hover:bg-[var(--apt-red)]/10 transition-all duration-700 pointer-events-none" />

                {/* Card Header (Icon & Count) */}
                <div className="flex items-center justify-between relative z-10">
                  <div className="p-3 bg-[var(--apt-offwhite)] rounded-xl group-hover:bg-[var(--apt-red)]/10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                    {React.cloneElement(sector.icon, {
                      className: sector.icon.props.className + " group-hover:scale-105 group-hover:rotate-3"
                    })}
                  </div>
                  <span className="font-outfit text-[11px] sm:text-xs font-bold tracking-widest text-gray-400 group-hover:text-[var(--apt-red)]/85 transition-colors duration-300">
                    {sector.count}
                  </span>
                </div>

                {/* Title & Description */}
                <div className="mt-8 sm:mt-10 mb-6 sm:mb-8 space-y-3 relative z-10 flex-grow">
                  <h3 className="font-khand text-2xl sm:text-3xl font-extrabold tracking-wide text-[#1a1a1a] group-hover:text-[var(--apt-red)] transition-colors duration-300">
                    {sector.title}
                  </h3>
                  <p className="font-montserrat text-xs sm:text-sm text-gray-500 font-medium leading-relaxed">
                    {sector.description}
                  </p>
                </div>

                {/* Quick item list reveals on hover */}
                <div className="max-h-0 opacity-0 overflow-hidden transition-all duration-500 group-hover:max-h-16 group-hover:opacity-100 group-hover:mb-6 border-l-2 border-[var(--apt-red)]/20 pl-3 relative z-10">
                  <span className="font-montserrat text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">
                    KEY PRODUCTS
                  </span>
                  <span className="font-montserrat text-[11px] font-semibold text-gray-600 leading-snug block">
                    {sector.popular}
                  </span>
                </div>

                {/* Action Link */}
                <div className="relative z-10 pt-2 border-t border-gray-50/50">
                  <a
                    href={sector.link}
                    className="inline-flex items-center font-montserrat text-[10px] sm:text-xs font-bold tracking-widest text-[var(--apt-red)] group-hover:text-[#1a1a1a] transition-colors duration-300"
                  >
                    VIEW PRODUCTS
                    <svg
                      className="w-3.5 h-3.5 ml-2 transform transition-transform duration-300 group-hover:translate-x-2"
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
        ) : (
          <div className="text-center py-20 bg-white border border-dashed border-gray-200 rounded-2xl">
            <svg
              className="w-12 h-12 mx-auto text-gray-300 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 13.5h3.86a2.25 2.25 0 012.008 1.24l.885 1.77a2.25 2.25 0 002.007 1.24h1.98a2.25 2.25 0 002.007-1.24l.885-1.77a2.25 2.25 0 012.007-1.24h3.86m-18 0h18"
              />
            </svg>
            <h3 className="font-khand text-xl font-bold text-gray-700 uppercase tracking-wide">
              No Sectors Found
            </h3>
            <p className="font-montserrat text-xs text-gray-400 font-medium mt-1">
              Try adjusting your search or search filters.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}

export default CatalogueSection;
