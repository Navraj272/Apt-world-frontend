import React from 'react';

function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-[95vh] flex items-center justify-center bg-[var(--apt-navy)] text-white pt-24 pb-16 overflow-hidden"
    >
      {/* Background Image with Dark Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/png/hero_industrial_bg.png"
          alt="Industrial Manufacturing Background"
          className="w-full h-full object-cover object-center opacity-100 select-none pointer-events-none"
        />
        {/* Radial vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--apt-navy)] via-transparent to-[var(--apt-navy)]/85 z-10" />
        <div className="absolute inset-0 z-10" style={{ background: 'radial-gradient(ellipse at center, transparent 20%, var(--apt-navy) 95%)' }} />
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 max-w-[1350px] w-full mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
        <div className="max-w-[850px] space-y-6 sm:space-y-8">
          {/* Top Badge */}
          <div className="inline-flex items-center bg-[var(--apt-red)] px-4 py-2 rounded-sm">
            <span className="font-montserrat text-[10px] sm:text-xs font-black tracking-[0.2em] text-white uppercase">
              LET'S BUILD THE
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-khand text-5xl sm:text-7xl md:text-8xl font-extrabold uppercase leading-[0.9] tracking-tight text-white">
            <span className="text-[var(--apt-red)]">APT</span> WORLD <br />
            <span className="text-white">INDUSTRIAL FORCE</span>
          </h1>

          {/* Description */}
          <p className="font-montserrat text-sm sm:text-lg text-gray-300 font-medium leading-relaxed max-w-[680px]">
            Engineering precision tools and high-performance equipment for India's evolving industrial landscape. Leading the charge with legacy expertise and cutting-edge technology.
          </p>

          {/* Call to Actions & Stats Group */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10 pt-4">
            {/* Button */}
            <a
              href="/products"
              className="inline-flex items-center justify-between font-montserrat text-xs sm:text-sm font-bold tracking-widest text-white bg-[var(--apt-red)] pl-6 pr-4 py-2 rounded-sm border border-transparent hover:bg-transparent hover:border-white hover:text-white transition-all duration-300 group shadow-lg shadow-[var(--apt-red)]/15 w-fit"
            >
              EXPLORE PRODUCTS
              <svg
                className="w-4 h-4 ml-4 transform transition-transform duration-300 group-hover:translate-x-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>

            {/* Stat Box */}
            <div className="flex items-center gap-3">
              <span className="font-outfit text-3xl sm:text-4xl font-extrabold tracking-tight text-white border-r border-white/20 pr-4">
                5,000+
              </span>
              <div className="flex flex-col">
                <span className="font-montserrat text-[10px] sm:text-xs font-bold tracking-wider text-gray-400 uppercase leading-none">
                  ACTIVE
                </span>
                <span className="font-montserrat text-[10px] sm:text-xs font-bold tracking-wider text-gray-400 uppercase leading-none mt-1">
                  USERS
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center">
        <a href="#catalogue" className="text-white/40 hover:text-white transition-colors duration-300 flex flex-col items-center gap-1 group">
          <span className="font-montserrat text-[9px] font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            SCROLL
          </span>
          <svg
            className="w-5 h-5 animate-bounce text-[var(--apt-red)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}

export default HeroSection;
