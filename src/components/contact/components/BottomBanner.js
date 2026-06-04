import React from 'react';

function BottomBanner() {
  const pillars = [
    'INDUSTRIAL STRENGTH',
    'GLOBAL STANDARDS',
    'CERTIFIED QUALITY',
    'ESTABLISHED 1999'
  ];

  return (
    <section className="bg-[#050D1A] border-t border-b border-white/5 py-8 text-center select-none">
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-around gap-6 sm:gap-4 flex-wrap">
          {pillars.map((pillar, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-4 sm:gap-0 group"
            >
              {/* Pillar Text */}
              <span className="font-khand text-lg sm:text-xl font-bold tracking-[0.18em] text-gray-400 group-hover:text-white transition-colors duration-300 uppercase">
                {pillar}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BottomBanner;
