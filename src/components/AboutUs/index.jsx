import React from 'react';

function AboutUs() {
  const stats = [
    { value: '25,000+', label: 'ITEMS IN INVENTORY' },
    // { value: '150+', label: 'RETAIL STORES' },
    // { value: '12', label: 'GLOBAL PARTNERS' },
    { value: '25+', label: 'YEARS OF EXPERTISE' },
  ];

  const values = [
    {
      title: 'INTEGRITY',
      description: 'Uncompromising ethics in every transaction and partnership we enter into.',
      icon: (
        <svg className="w-8 h-8 text-[var(--apt-red)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: 'PRECISION',
      description: 'Demanding extreme accuracy in our products and technical data delivery.',
      icon: (
        <svg className="w-8 h-8 text-[var(--apt-red)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v7m0 0l-4 4m4-4l4 4m-4-11a1 1 0 100-2 1 1 0 000 2zM4 20h16M7 20v-5h10v5" />
        </svg>
      ),
    },
    {
      title: 'INNOVATION',
      description: 'Continuously updating our inventory with the latest global manufacturing achievements.',
      icon: (
        <svg className="w-8 h-8 text-[var(--apt-red)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-1.2 2-3 5.5-3 8.5 0 2.2 1 4.5 3 6.5 2-2 3-4.3 3-6.5 0-3-1.8-6.5-3-8.5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.5L5.5 21M15 17.5L18.5 21" />
        </svg>
      ),
    },
    {
      title: 'PARTNERSHIP',
      description: 'Building long-term growth for our franchise and industrial clients alike.',
      icon: (
        <svg className="w-8 h-8 text-[var(--apt-red)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div id="about" className="w-full">
      {/* 1. Hero Section */}
      <section className="relative min-h-[75vh] flex items-center bg-[var(--apt-navy)] text-white pt-28 pb-20 overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/png/hero_industrial_bg.png"
            alt="Industrial Background"
            className="w-full h-full object-cover object-center opacity-30 select-none pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--apt-navy)] via-[var(--apt-navy)]/75 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--apt-navy)] via-transparent to-[var(--apt-navy)]/90 z-10" />
          {/* Red ambient glow */}
          <div className="absolute bottom-0 left-1/3 w-[400px] h-[300px] bg-[var(--apt-red)] opacity-[0.06] blur-[120px] rounded-full pointer-events-none z-10" />
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.025]">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="about-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#about-grid)" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-20 max-w-[1350px] w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-[780px] space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 bg-[var(--apt-red)] px-5 py-2 rounded-full shadow-lg shadow-[var(--apt-red)]/25">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              <span className="font-montserrat text-[10px] sm:text-xs font-black tracking-widest text-white uppercase">
                ESTABLISHED 1999
              </span>
            </div>

            <h1 className="font-khand text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight leading-[0.95] text-white">
              THE NAME YOU <br />
              <span className="text-[var(--apt-red)]">CAN TRUST</span>
            </h1>

            <div className="w-20 h-1 bg-[var(--apt-red)] rounded-full" />

            <p className="font-montserrat text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed max-w-[620px] font-medium">
              For over two decades, APT WORLD has stood as a pillar of industrial excellence, bridging the gap between global innovation and local execution. We provide high-performance solutions for heavy manufacturing and construction.
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
          <div className="w-5 h-8 border-2 border-white/20 rounded-full flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-[var(--apt-red)] rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* 3. Infrastructure Section */}
      <section className="relative bg-[var(--apt-offwhite)] py-16 sm:py-20 text-[#1a1a1a] overflow-hidden">
        {/* Subtle industrial pattern background */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <img
            src="/assets/png/welder_industrial.png"
            alt=""
            className="w-full h-full object-cover object-center opacity-[0.04] grayscale"
          />
        </div>
        <div className="relative z-10 max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Title with underline */}
          <div className="mb-12 sm:mb-16">
            <h2 className="font-khand text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-[#1a1a1a]">
              OUR INFRASTRUCTURE
            </h2>
            <div className="w-16 h-[3px] bg-[var(--apt-red)] mt-3" />
          </div>

          {/* Asymmetric Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Card 1: PAN INDIA NETWORK (spans 2 columns on lg) */}
            <div className="lg:col-span-2 bg-white p-8 sm:p-10 border border-gray-100 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
              <div className="relative z-10 max-w-[70%] space-y-4">
                <div className="p-3 bg-[var(--apt-red)]/5 rounded-xl border border-[var(--apt-red)]/10 w-fit">
                  <svg className="w-6 h-6 text-[var(--apt-red)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                    <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                    <line x1="6" y1="6" x2="6.01" y2="6" strokeLinecap="round" strokeWidth="3" />
                    <line x1="6" y1="18" x2="6.01" y2="18" strokeLinecap="round" strokeWidth="3" />
                    <line x1="10" y1="6" x2="18" y2="6" strokeLinecap="round" />
                    <line x1="10" y1="18" x2="18" y2="18" strokeLinecap="round" />
                  </svg>
                </div>
                <h3 className="font-khand text-2xl sm:text-3xl font-extrabold tracking-wider text-[#1a1a1a] group-hover:text-[var(--apt-red)] transition-colors duration-300">
                  PAN INDIA NETWORK
                </h3>
                <p className="font-montserrat text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Strategically located distribution centers across all major industrial hubs, ensuring rapid delivery and 24/7 service availability from Jammu to Kanyakumari.
                </p>
              </div>
              {/* Globe Outline Vector Graphic on the right side */}
              <svg className="absolute right-0 bottom-0 w-36 h-36 sm:w-48 sm:h-48 text-gray-200 opacity-60 pointer-events-none transform translate-x-6 translate-y-6 group-hover:scale-105 transition-transform duration-500" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
                <circle cx="50" cy="50" r="45" />
                <ellipse cx="50" cy="50" rx="45" ry="18" />
                <ellipse cx="50" cy="50" rx="45" ry="32" />
                <ellipse cx="50" cy="50" rx="18" ry="45" />
                <ellipse cx="50" cy="50" rx="32" ry="45" />
                <line x1="5" y1="50" x2="95" y2="50" />
                <line x1="50" y1="5" x2="50" y2="95" />
              </svg>
            </div>

            {/* Card 2: GLOBAL SOURCING (spans 1 column, dark blue background) */}
            <div className="bg-[var(--apt-navy)] p-8 sm:p-10 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden group text-white">
              <div className="space-y-4">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 w-fit group-hover:bg-[var(--apt-red)]/10 group-hover:border-[var(--apt-red)]/30 transition-all duration-300">
                  <svg className="w-6 h-6 text-[var(--apt-red)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="font-khand text-2xl sm:text-3xl font-extrabold tracking-wider text-white">
                  GLOBAL SOURCING
                </h3>
                <p className="font-montserrat text-xs sm:text-sm text-gray-300 leading-relaxed">
                  Importing precision-engineered components and heavy tools from Germany, Japan, and the USA.
                </p>
              </div>
            </div>

            {/* Card 3: RIGOROUS TESTING (spans 1 column) */}
            <div className="bg-white p-8 sm:p-10 border border-gray-100 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
              <div className="space-y-4">
                <div className="p-3 bg-[var(--apt-red)]/5 rounded-xl border border-[var(--apt-red)]/10 w-fit">
                  <svg className="w-6 h-6 text-[var(--apt-red)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 3h3m-3 3h2m-3 12h5M6 21h12M9 18h6M12 6v10m-3-7a3 3 0 013-3m0 6a3 3 0 00-3-3" />
                  </svg>
                </div>
                <h3 className="font-khand text-2xl sm:text-3xl font-extrabold tracking-wider text-[#1a1a1a] group-hover:text-[var(--apt-red)] transition-colors duration-300">
                  RIGOROUS TESTING
                </h3>
                <p className="font-montserrat text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Every single SKU undergoes a 12-point quality check in our ISO-certified laboratories before deployment.
                </p>
              </div>
            </div>

            {/* Card 4: EFFICIENT DISTRIBUTION (spans 2 columns, split layout with image) */}
            <div className="lg:col-span-2 bg-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group flex flex-col md:flex-row">
              {/* Image side */}
              <div className="md:w-1/2 relative h-48 md:h-auto overflow-hidden shrink-0">
                <img
                  src="/assets/png/efficient_distribution.png"
                  alt="Warehouse Distribution"
                  className="w-full h-full object-cover grayscale brightness-90 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#ECEFF1]/20" />
              </div>
              {/* Content side */}
              <div className="md:w-1/2 p-8 sm:p-10 flex flex-col justify-center space-y-4">
                <h3 className="font-khand text-2xl sm:text-3xl font-extrabold tracking-wider text-[#1a1a1a]">
                  EFFICIENT DISTRIBUTION
                </h3>
                <p className="font-montserrat text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Our proprietary logistics management system ensures a 99.4% on-time delivery rate, powering the engines of Indian industry without interruption.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Technical Authority Section */}
      <section className="bg-[var(--apt-navy)] text-white py-20 sm:py-28 overflow-hidden relative">
        <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Information and Features */}
            <div className="lg:col-span-7 space-y-8 sm:space-y-10">
              <div className="space-y-4">
                <h2 className="font-khand text-4xl sm:text-6xl font-bold uppercase tracking-tight text-white leading-[0.95]">
                  25+ YEARS OF <span className="text-[var(--apt-red)]">TECHNICAL AUTHORITY</span>
                </h2>
                <p className="font-montserrat text-sm sm:text-base text-gray-300 leading-relaxed max-w-[620px] pt-2">
                  Our leadership team comprises industry veterans with decades of hands-on experience in metallurgy, mechanical engineering, and global supply chain management. We don't just sell tools; we provide engineering solutions.
                </p>
              </div>

              {/* Lists of sub-features */}
              <div className="space-y-6 pt-4 border-t border-white/10 max-w-[580px]">
                {/* Feature 1 */}
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-[var(--apt-red)] flex items-center justify-center shrink-0 shadow-md shadow-[var(--apt-red)]/20 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-khand text-lg sm:text-xl font-bold tracking-wider text-white">
                      CERTIFIED EXPERTISE
                    </h4>
                    <p className="font-montserrat text-xs sm:text-sm text-gray-400 leading-relaxed">
                      All our engineers are certified in ISO standards and advanced technical maintenance.
                    </p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-[var(--apt-red)] flex items-center justify-center shrink-0 shadow-md shadow-[var(--apt-red)]/20 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-khand text-lg sm:text-xl font-bold tracking-wider text-white">
                      DEDICATED SUPPORT
                    </h4>
                    <p className="font-montserrat text-xs sm:text-sm text-gray-400 leading-relaxed">
                      On-site technical assistance and training for all our corporate franchise partners.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Engineer Image with Overlapping Badge */}
            <div className="lg:col-span-5 relative group mt-6 lg:mt-0">
              {/* Graphic borders */}
              <div className="absolute -top-4 -left-4 w-20 h-20 border-t-2 border-l-2 border-[var(--apt-red)]/40 pointer-events-none transition-all duration-300 group-hover:-top-2 group-hover:-left-2" />
              <div className="absolute -bottom-4 -right-4 w-20 h-20 border-b-2 border-r-2 border-[var(--apt-red)]/40 pointer-events-none transition-all duration-300 group-hover:-bottom-2 group-hover:-right-2" />

              <div className="relative overflow-hidden rounded-2xl bg-gray-900 border border-white/10 shadow-2xl aspect-[4/5]">
                <img
                  src="/assets/png/engineer_hardhat.png"
                  alt="Industrial Engineer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-95"
                />
                {/* Subtle blue dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--apt-navy)]/50 via-transparent to-transparent pointer-events-none" />

                {/* Overlapping Red Box badge */}
                <div className="absolute bottom-0 left-0 bg-[var(--apt-red)] p-6 sm:p-8 max-w-[180px] flex flex-col justify-center shadow-lg border-r border-t border-[var(--apt-navy)]/20 select-none">
                  <span className="font-outfit text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-none">
                    1999
                  </span>
                  <span className="font-montserrat text-[9px] sm:text-[10px] font-black tracking-widest text-white uppercase mt-2 leading-none">
                    THE BEGINNING
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Core Values Section */}
      <section className="bg-[var(--apt-offwhite)] py-20 sm:py-28 text-[#1a1a1a]">
        <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12 sm:space-y-16">
          
          {/* Header Title / Subtitle */}
          <div className="space-y-4 max-w-[700px] mx-auto">
            <h2 className="font-khand text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-[#1a1a1a]">
              OUR CORE VALUES
            </h2>
            <p className="font-montserrat text-xs sm:text-sm text-gray-500 leading-relaxed">
              The principles that have guided APT WORLD through decades of industrial shifts and technological transitions.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-left">
            {values.map((val, idx) => (
              <div
                key={idx}
                className="bg-white p-8 border border-gray-100 rounded-2xl shadow-md hover:shadow-lg hover:border-[var(--apt-red)]/20 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Icon */}
                  <div className="p-3 bg-[var(--apt-red)]/5 rounded-xl border border-[var(--apt-red)]/10 w-fit group-hover:bg-[var(--apt-red)]/10 group-hover:border-[var(--apt-red)]/25 transition-all duration-300">
                    {val.icon}
                  </div>
                  {/* Title */}
                  <h3 className="font-khand text-xl sm:text-2xl font-extrabold tracking-wider text-[#1a1a1a] group-hover:text-[var(--apt-red)] transition-colors duration-300">
                    {val.title}
                  </h3>
                  {/* Description */}
                  <p className="font-montserrat text-xs sm:text-sm text-gray-500 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}

export default AboutUs;
