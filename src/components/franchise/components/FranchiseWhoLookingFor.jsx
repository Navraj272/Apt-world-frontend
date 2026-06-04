import React from 'react';

// Custom outline SVG icons for target partner profiles
const TargetIconMap = {
  dealers: (
    <svg className="w-6 h-6 text-[#E11922]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  hardhat: (
    <svg className="w-6 h-6 text-[#E11922]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  building: (
    <svg className="w-6 h-6 text-[#E11922]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  )
};

function FranchiseWhoLookingFor({ data }) {
  const { title, items, image } = data;

  return (
    <section className="bg-[#F4F6F9] py-16 sm:py-24">
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          {/* Left Column: Text Cards */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            {/* Title */}
            <div>
              <h2 className="font-khand text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-[#050D1A] leading-none mb-4">
                {title}
              </h2>
              <div className="w-20 h-[3px] bg-[#E11922]" />
            </div>

            {/* Sub-cards */}
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-5 sm:p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex items-start gap-4 rounded-sm"
                >
                  {/* Icon Wrapper */}
                  <div className="p-3 bg-red-50 rounded-sm shrink-0">
                    {TargetIconMap[item.icon] || TargetIconMap.dealers}
                  </div>

                  {/* Info */}
                  <div className="space-y-1">
                    <h3 className="font-montserrat text-sm sm:text-base font-bold text-[#050D1A] uppercase tracking-wide">
                      {item.title}
                    </h3>
                    <p className="font-montserrat text-xs sm:text-sm text-gray-500 font-medium leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Handshake Image */}
          <div className="lg:col-span-6 h-full min-h-[350px] sm:min-h-[450px] relative">
            <div className="w-full h-full relative border border-gray-100 shadow-xl rounded-sm overflow-hidden bg-white/5 group">
              <img
                src={image}
                alt="Partner Partnership Handshake"
                className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
              />
              {/* Soft overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050D1A]/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default FranchiseWhoLookingFor;
