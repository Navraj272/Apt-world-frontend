import React from 'react';

function ContactHero() {
  return (
    <section className="relative min-h-[65vh] flex items-center bg-[var(--apt-navy)] text-white pt-28 pb-20 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/png/welder_industrial.png"
          alt="Industrial Background"
          className="w-full h-full object-cover object-center opacity-30 select-none pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--apt-navy)]/90 via-[var(--apt-navy)]/70 to-[var(--apt-navy)] z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--apt-navy)]/80 via-transparent to-[var(--apt-navy)]/80 z-10" />
        {/* Red glow accent */}
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-[var(--apt-red)] opacity-[0.06] blur-[100px] rounded-full pointer-events-none z-10" />
      </div>

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.025]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="contact-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contact-grid)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-[1350px] w-full mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-[var(--apt-red)] px-5 py-2 rounded-full shadow-lg shadow-[var(--apt-red)]/25">
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
          <span className="font-montserrat text-[10px] sm:text-xs font-black tracking-[0.2em] text-white uppercase">
            GET IN TOUCH
          </span>
        </div>

        <h1 className="font-khand text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight leading-[0.95] text-white">
          CONTACT OUR <span className="text-[var(--apt-red)]">EXPERTS</span>
        </h1>

        <div className="w-20 h-1 bg-[var(--apt-red)] mx-auto rounded-full" />

        <p className="font-montserrat text-sm sm:text-base text-gray-300 font-medium max-w-[580px] mx-auto leading-relaxed">
          Bridging industrial excellence with precision service. Reach out for inquiries, quotations, or technical support.
        </p>

        {/* Quick contact info pills — the single canonical place these details appear */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <a
            href="tel:9699429699"
            className="flex items-center gap-2.5 bg-white/10 border border-white/20 hover:border-[var(--apt-red)] hover:bg-[var(--apt-red)]/15 rounded-full px-5 py-2.5 transition-all duration-200 shadow-lg shadow-black/10"
          >
            <svg className="w-4 h-4 text-[var(--apt-red)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="font-montserrat text-xs font-bold text-white">9699429699</span>
          </a>
          <a
            href="mailto:info.aptworld@gmail.com"
            className="flex items-center gap-2.5 bg-white/10 border border-white/20 hover:border-[var(--apt-red)] hover:bg-[var(--apt-red)]/15 rounded-full px-5 py-2.5 transition-all duration-200 shadow-lg shadow-black/10"
          >
            <svg className="w-4 h-4 text-[var(--apt-red)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="font-montserrat text-xs font-bold text-white">info.aptworld@gmail.com</span>
          </a>
          <div className="flex items-center gap-2.5 bg-white/10 border border-white/20 rounded-full px-5 py-2.5 shadow-lg shadow-black/10">
            <svg className="w-4 h-4 text-[var(--apt-red)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="font-montserrat text-xs font-bold text-white">Indore, MP, India</span>
          </div>
          <div className="flex items-center gap-2.5 bg-white/10 border border-white/20 rounded-full px-5 py-2.5 shadow-lg shadow-black/10">
            <svg className="w-4 h-4 text-[var(--apt-red)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-montserrat text-xs font-bold text-white">MON-SAT: 09:00 - 19:00</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactHero;
