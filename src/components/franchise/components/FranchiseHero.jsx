import React from 'react';

function FranchiseHero({ data }) {
  const { badge, title, description, primaryBtn, secondaryBtn } = data;

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-start bg-[var(--apt-navy)] text-white pt-28 pb-20 overflow-hidden">
      {/* Layered Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/png/banner1.png"
          alt="Franchise Industrial Background"
          className="w-full h-full object-cover object-center !opacity-100 select-none pointer-events-none"
          style={{ transform: 'scale(1.05)' }}
        />
        {/* Strong left-to-right gradient for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--apt-navy)] via-[var(--apt-navy)]/75 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--apt-navy)] via-transparent to-[var(--apt-navy)]/80 z-10" />
        {/* Red ambient glow bottom-left */}
        <div className="absolute -left-32 bottom-0 w-[500px] h-[400px] bg-[var(--apt-red)] opacity-[0.07] blur-[120px] rounded-full pointer-events-none z-10" />
        {/* Diagonal light beam */}
        <div
          className="absolute inset-0 z-10 pointer-events-none opacity-[0.04]"
          style={{
            background: 'linear-gradient(135deg, transparent 40%, var(--apt-red) 50%, transparent 60%)',
          }}
        />
      </div>

      {/* Decorative grid lines */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.03]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-[1350px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[820px] space-y-7 sm:space-y-8">

          {/* Animated badge */}
          {badge && (
            <div className="inline-flex items-center gap-2 bg-[var(--apt-red)] px-4 py-2 rounded-full shadow-lg shadow-[var(--apt-red)]/25">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              <span className="font-montserrat text-[10px] sm:text-xs font-black tracking-[0.25em] text-white uppercase">
                {badge}
              </span>
            </div>
          )}

          {/* Heading */}
          <h1 className="font-khand text-5xl sm:text-7xl md:text-8xl font-extrabold uppercase leading-[0.95] tracking-tight text-white">
            {title}
          </h1>

          {/* Red accent underline */}
          <div className="w-20 h-1 bg-[var(--apt-red)] rounded-full" />

          {/* Description */}
          <p className="font-montserrat text-sm sm:text-lg text-gray-300 font-medium leading-relaxed max-w-[620px]">
            {description}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-5 pt-2">
            {primaryBtn && (
              <button
                onClick={() => handleScroll(primaryBtn.targetId)}
                className="font-montserrat text-xs sm:text-sm font-bold tracking-widest text-white bg-[var(--apt-red)] px-7 py-3 rounded-xl border border-transparent hover:bg-white hover:text-[var(--apt-red)] transition-all duration-300 shadow-lg shadow-[var(--apt-red)]/20 uppercase"
              >
                {primaryBtn.text}
              </button>
            )}
            {secondaryBtn && (
              <button
                onClick={() => handleScroll(secondaryBtn.targetId)}
                className="font-montserrat text-xs sm:text-sm font-bold tracking-widest text-white border border-white/25 px-7 py-3 rounded-xl hover:bg-white hover:text-[var(--apt-navy)] hover:border-white transition-all duration-300 uppercase"
              >
                {secondaryBtn.text}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1">
        <div className="w-5 h-8 border-2 border-white/20 rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-[var(--apt-red)] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}

export default FranchiseHero;
