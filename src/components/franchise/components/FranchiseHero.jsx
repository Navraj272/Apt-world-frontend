import React from 'react';

function FranchiseHero({ data }) {
  const { badge, title, description, primaryBtn, secondaryBtn } = data;

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative min-h-[90vh] flex items-center justify-start bg-[#050D1A] text-white pt-28 pb-20 overflow-hidden"
    >
      {/* Background Image with Premium Dark Red-Navy Industrial Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/png/hero_industrial_bg.png"
          alt="Franchise Industrial Background"
          className="w-full h-full object-cover object-center opacity-40 select-none pointer-events-none"
        />
        {/* Sleek radial and linear gradients for premium styling */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050D1A] via-[#050D1A]/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050D1A] via-transparent to-[#050D1A]/90 z-10" />
        {/* Subtle red ambient glow to match industrial vibe */}
        <div className="absolute -left-20 top-20 w-[400px] h-[400px] bg-[#E11922] opacity-[0.08] blur-[150px] rounded-full pointer-events-none z-10" />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-[1350px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[850px] space-y-6 sm:space-y-8 text-left">
          
          {/* Badge */}
          {badge && (
            <div className="inline-flex items-center bg-[#E11922] px-4 py-2 rounded-sm">
              <span className="font-montserrat text-[10px] sm:text-xs font-black tracking-[0.25em] text-white uppercase">
                {badge}
              </span>
            </div>
          )}

          {/* Heading */}
          <h1 className="font-khand text-5xl sm:text-7xl md:text-8xl font-extrabold uppercase leading-[0.95] tracking-tight text-white">
            {title}
          </h1>

          {/* Description */}
          <p className="font-montserrat text-sm sm:text-lg text-gray-300 font-medium leading-relaxed max-w-[650px]">
            {description}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4">
            {primaryBtn && (
              <button
                onClick={() => handleScroll(primaryBtn.targetId)}
                className="font-montserrat text-xs sm:text-sm font-bold tracking-widest text-white bg-[#E11922] px-6 py-2 rounded-sm border border-transparent hover:bg-transparent hover:border-white hover:text-white transition-all duration-300 shadow-lg shadow-[#E11922]/15 uppercase"
              >
                {primaryBtn.text}
              </button>
            )}
            {secondaryBtn && (
              <button
                onClick={() => handleScroll(secondaryBtn.targetId)}
                className="font-montserrat text-xs sm:text-sm font-bold tracking-widest text-white border border-white/20 px-6 py-2 rounded-sm hover:bg-white hover:text-[#050D1A] hover:border-white transition-all duration-300 uppercase"
              >
                {secondaryBtn.text}
              </button>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

export default FranchiseHero;
