import React, { useState } from 'react';

function WhyChooseUsSection() {
  const [activeFeature, setActiveFeature] = useState('reliability');

  const features = [
    {
      id: 'reliability',
      title: 'RELIABILITY',
      description: 'Built to withstand the hardest environments.',
      detail: 'Every APT tool is subjected to extreme stress testing. Engineered for continuous duty cycle profiles in shipyard and heavy automotive manufacturing setups. Guaranteed 1,200+ operational hours before servicing.',
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
      detail: 'Aligned with ISO 9001:2015 and CE quality standards. Our double-inspected hardened alloy castings and precision motor windings are sourced from high-grade carbon steel for zero-defect field reliability.',
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
      detail: 'Our direct-to-enterprise logistics network eliminates intermediary dealer markups. This ensures up to 30% lower upfront acquisition cost and guarantees the lowest total cost of ownership in India.',
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
      detail: 'Developing cordless IoT smart battery telemetry and smart auto-shutoff safety sensors. Over 12 registered patents in ergonomics and torque vibration damping to reduce operator fatigue.',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    }
  ];

  const activeFeatureData = features.find(f => f.id === activeFeature) || features[0];

  return (
    <section id="about" className="bg-[var(--apt-navy)] text-white py-20 sm:py-28 overflow-hidden border-b border-white/5">
      {/* Scanning laser animation style injection */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scanLaser {
          0% { transform: translateY(0); opacity: 0.3; }
          50% { transform: translateY(380px); opacity: 1; }
          100% { transform: translateY(0); opacity: 0.3; }
        }
        .laser-scanner-line {
          animation: scanLaser 3s ease-in-out infinite;
        }
      `}} />

      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          
          {/* Left Column: Welder Image with overlap badge */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[420px] lg:max-w-none group/image overflow-hidden">
              {/* Outer decorative border decoration */}
              <div className="absolute -inset-3 border border-white/10 rounded-sm pointer-events-none select-none -z-10" />
              
              {/* Main grayscale image */}
              <div className="relative overflow-hidden rounded-sm border border-white/10 shadow-2xl">
                {/* Blueprint grid overlay */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover/image:opacity-30 transition-opacity duration-500 pointer-events-none z-10"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(220, 38, 38, 0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(220, 38, 38, 0.25) 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                  }}
                />
                
                {/* Scanning laser line */}
                <div className="absolute left-0 right-0 h-[2.5px] bg-[var(--apt-red)] shadow-[0_0_10px_var(--apt-red)] opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 z-20 laser-scanner-line pointer-events-none" />

                <img
                  src="/assets/png/welder_industrial.png"
                  alt="Industrial Welder Working"
                  className="w-full h-auto object-cover grayscale contrast-125 group-hover/image:scale-105 transition-transform duration-700"
                />
              </div>
              
              {/* Red overlapping badge */}
              <div 
                className="absolute -bottom-6 -right-4 sm:-right-6 lg:-right-8 bg-[var(--apt-red)] text-white p-6 sm:p-8 rounded-sm shadow-xl z-30 flex flex-col justify-center items-center text-center min-w-[150px] sm:min-w-[170px] hover:scale-105 transition-transform duration-300"
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
              <span className="font-montserrat text-xs sm:text-sm font-black tracking-[0.2em] text-[var(--apt-red)] uppercase">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-4">
              {features.map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => setActiveFeature(feature.id)}
                  className={`flex items-start gap-4 p-4 border rounded-sm transition-all duration-300 text-left w-full outline-none ${
                    activeFeature === feature.id
                      ? 'bg-white/10 border-[var(--apt-red)] shadow-lg shadow-[var(--apt-red)]/10'
                      : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20'
                  }`}
                >
                  {/* Icon with active or hover state background */}
                  <div className={`p-2.5 rounded-sm transition-all duration-300 shrink-0 ${
                    activeFeature === feature.id
                      ? 'bg-[var(--apt-red)] text-white'
                      : 'bg-white/5 text-[var(--apt-red)] border border-white/10'
                  }`}>
                    {feature.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className={`font-khand text-lg sm:text-xl font-bold tracking-wide uppercase transition-colors duration-300 ${
                      activeFeature === feature.id ? 'text-[var(--apt-red)]' : 'text-white'
                    }`}>
                      {feature.title}
                    </h4>
                    <p className="font-montserrat text-xs text-gray-400 font-semibold leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Active Feature Detail Drawer */}
            <div className="bg-white/5 border border-white/10 p-6 rounded-sm relative overflow-hidden transition-all duration-500">
              <div className="absolute top-0 left-0 bottom-0 w-1 bg-[var(--apt-red)]" />
              <h5 className="font-khand text-sm font-bold tracking-widest text-[var(--apt-red)] uppercase mb-2">
                {activeFeatureData.title} METRICS & ARCHITECTURE
              </h5>
              <p className="font-montserrat text-xs sm:text-sm text-gray-300 font-medium leading-relaxed">
                {activeFeatureData.detail}
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default WhyChooseUsSection;
