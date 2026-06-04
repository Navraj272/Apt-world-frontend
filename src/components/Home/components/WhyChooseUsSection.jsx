import React from 'react';

function WhyChooseUsSection() {
  const features = [
    {
      id: 'reliability',
      title: 'RELIABILITY',
      description: 'Built to withstand the hardest environments.',
      // Target/shield check icon
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      id: 'quality',
      title: 'QUALITY',
      description: 'Strict adherence to international ISO standards.',
      // Quality badge/stamp icon
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    },
    {
      id: 'value',
      title: 'VALUE',
      description: 'Superior performance-to-cost ratio for owners.',
      // Tag/currency icon
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2zM9 16a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" />
        </svg>
      )
    },
    {
      id: 'innovation',
      title: 'INNOVATION',
      description: 'Continuous R&D to use next-gen tool tech.',
      // Lightbulb/idea icon
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    }
  ];

  return (
    <section id="about" className="bg-[#050D1A] text-white py-20 sm:py-28 overflow-hidden border-b border-white/5">
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          
          {/* Left Column: Welder Image with overlap badge */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[420px] lg:max-w-none">
              {/* Outer decorative border decoration */}
              <div className="absolute -inset-3 border border-white/10 rounded-sm pointer-events-none select-none -z-10" />
              
              {/* Main grayscale image */}
              <img
                src="/assets/png/welder_industrial.png"
                alt="Industrial Welder Working"
                className="w-full h-auto object-cover rounded-sm grayscale contrast-125 border border-white/10 shadow-2xl"
              />
              
              {/* Red overlapping badge */}
              <div 
                className="absolute -bottom-6 -right-4 sm:-right-6 lg:-right-8 bg-[#E11922] text-white p-6 sm:p-8 rounded-sm shadow-xl z-10 flex flex-col justify-center items-center text-center min-w-[150px] sm:min-w-[170px]"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%)'
                }}
              >
                <span className="font-outfit text-4xl sm:text-5xl font-black tracking-tight leading-none">
                  25+
                </span>
                <span className="font-montserrat text-[9px] sm:text-[10px] font-black tracking-[0.2em] uppercase mt-2 leading-none">
                  YEARS OF
                </span>
                <span className="font-montserrat text-[9px] sm:text-[10px] font-black tracking-[0.2em] uppercase mt-1 leading-none">
                  EXCELLENCE
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Title and 2x2 Feature Grid */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="font-montserrat text-xs sm:text-sm font-black tracking-[0.2em] text-[#E11922] uppercase">
                OUR FOUNDATION
              </span>
              <h2 className="font-khand text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white leading-none">
                BUILT ON RIGOR & PRECISION
              </h2>
              <p className="font-montserrat text-xs sm:text-sm md:text-base text-gray-300 font-medium leading-relaxed max-w-[620px] pt-2">
                Born from a legacy that includes leadership roles at Stanley Black & Decker, APT WORLD brings a global standard of industrial quality to the Indian market. We don't just sell tools; we engineer success.
              </p>
            </div>

            {/* 2x2 Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 pt-4">
              {features.map((feature) => (
                <div key={feature.id} className="flex items-start gap-4 group">
                  {/* Icon with hover rotation/color effect */}
                  <div className="p-2.5 bg-white/5 border border-white/10 rounded-sm text-[#E11922] group-hover:bg-[#E11922] group-hover:text-white group-hover:border-[#E11922] transition-all duration-300 shrink-0">
                    {feature.icon}
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="font-khand text-lg sm:text-xl font-bold tracking-wide text-white uppercase group-hover:text-[#E11922] transition-colors duration-300">
                      {feature.title}
                    </h4>
                    <p className="font-montserrat text-xs sm:text-sm text-gray-400 font-medium leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default WhyChooseUsSection;
