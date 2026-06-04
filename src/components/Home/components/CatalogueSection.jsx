import React from 'react';

function CatalogueSection() {
  const sectors = [
    {
      id: 1,
      title: 'POWER TOOLS',
      count: '1,200+ ITEMS',
      description: 'Heavy-duty drills, grinders, and sanders engineered for continuous industrial use.',
      link: '#products-power-tools',
      // Wrench and Hammer cross icon
      icon: (
        <svg className="w-8 h-8 text-[#E11922]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 15l-3 3M15 9l-3 3" />
        </svg>
      )
    },
    {
      id: 2,
      title: 'WELDING EQUIPMENT',
      count: '450+ ITEMS',
      description: 'Advanced MIG, TIG, and MMA welding solutions for high-level metal welding and fabrication.',
      link: '#products-welding',
      // Torch / Welder arm style icon
      icon: (
        <svg className="w-8 h-8 text-[#E11922]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14M12 3v10M12 3a2 2 0 100-4 2 2 0 000 4z" />
        </svg>
      )
    },
    {
      id: 3,
      title: 'CLEANING SOLUTIONS',
      count: '800+ ITEMS',
      description: 'Industrial-grade high-pressure washers and heavy-duty vacuum systems for large facilities.',
      link: '#products-cleaning',
      // Broom / squeegee icon
      icon: (
        <svg className="w-8 h-8 text-[#E11922]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a7 7 0 10-14 0v2m7-7v2" />
        </svg>
      )
    },
    {
      id: 4,
      title: 'AGRI SOLUTIONS',
      count: '650+ ITEMS',
      description: 'Professional agricultural tools and machinery focused on productivity and soil health.',
      link: '#products-agri',
      // Tractor/Tire style icon
      icon: (
        <svg className="w-8 h-8 text-[#E11922]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l9-5-9-5-9 5 9 5zm0 0v8m-4-4h8" />
        </svg>
      )
    },
    {
      id: 5,
      title: 'WAREHOUSE & LIFT',
      count: '320+ ITEMS',
      description: 'Material handling equipment, pallet jacks, and heavy-duty storage shelving systems.',
      link: '#products-lift',
      // Forklift / Shelves box icon
      icon: (
        <svg className="w-8 h-8 text-[#E11922]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14v14m0-14L4 7m0 0v10l8 4" />
        </svg>
      )
    },
    {
      id: 6,
      title: 'GENERAL TOOLS',
      count: '2,500+ ITEMS',
      description: 'Comprehensive range of manual tools, measuring instruments, and hardware basics.',
      link: '#products-general',
      // Hammer / Wrench icon
      icon: (
        <svg className="w-8 h-8 text-[#E11922]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 4H4v14a2 2 0 002 2h12a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      )
    }
  ];

  return (
    <section id="products" className="bg-white text-black py-20 sm:py-28 border-b border-gray-100">
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 sm:pb-16 border-b border-gray-100 mb-12 sm:mb-16">
          <div className="space-y-3">
            <span className="font-montserrat text-xs sm:text-sm font-black tracking-[0.2em] text-[#E11922] uppercase">
              PRODUCT PORTFOLIO
            </span>
            <h2 className="font-khand text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-gray-900 leading-none">
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
              className="group relative flex flex-col justify-between p-8 sm:p-10 bg-white border border-gray-200 rounded-sm transition-all duration-300 hover:border-[#E11922] hover:shadow-xl hover:shadow-[#E11922]/5"
            >
              {/* Card Header (Icon & Count) */}
              <div className="flex items-center justify-between">
                <div className="p-3 bg-gray-50 rounded-sm group-hover:bg-[#E11922]/5 transition-colors duration-300">
                  {sector.icon}
                </div>
                <span className="font-outfit text-[11px] sm:text-xs font-bold tracking-widest text-gray-400 group-hover:text-[#E11922]/80 transition-colors duration-300">
                  {sector.count}
                </span>
              </div>

              {/* Title & Description */}
              <div className="mt-8 sm:mt-10 mb-6 sm:mb-8 space-y-3">
                <h3 className="font-khand text-2xl sm:text-3xl font-extrabold tracking-wide text-gray-900 group-hover:text-[#E11922] transition-colors duration-300">
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
                  className="inline-flex items-center font-montserrat text-[10px] sm:text-xs font-bold tracking-widest text-[#E11922] group-hover:text-black transition-colors duration-300"
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
