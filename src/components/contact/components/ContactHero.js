import React from 'react';

function ContactHero() {
  return (
    <section className="relative w-full bg-[#F8F9FA] pt-28 overflow-hidden">
      {/* Light Gradient Hero Area */}
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 text-center pb-12 sm:pb-16 space-y-4">
        <h1 
          className="font-khand text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-widest text-white select-none"
          style={{
            textShadow: '0 4px 20px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.1)',
            color: '#FFFFFF',
            WebkitTextStroke: '1px rgba(0,0,0,0.05)'
          }}
        >
          CONTACT OUR EXPERTS
        </h1>
        <p className="font-montserrat text-xs sm:text-sm font-bold tracking-[0.2em] text-[#E11922] uppercase">
          BRIDGING INDUSTRIAL EXCELLENCE WITH PRECISION SERVICE SINCE 1999
        </p>
      </div>

      {/* Dark Industrial Separator Band */}
      <div className="relative h-28 sm:h-36 w-full bg-[#060F1E] border-y border-white/5 overflow-hidden">
        <img
          src="/assets/png/welder_industrial.png"
          alt="Industrial Factory"
          className="w-full h-full object-cover object-center opacity-30 grayscale pointer-events-none select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060F1E] via-transparent to-[#060F1E]" />
      </div>
    </section>
  );
}

export default ContactHero;
