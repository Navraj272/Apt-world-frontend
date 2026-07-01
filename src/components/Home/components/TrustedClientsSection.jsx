import React, { useState } from 'react';

const CLIENTS_ROW1 = [
  { name: 'ISRO',                logo: '/assets/logos/isro_gov_in.png' },
  { name: 'AMUL',                logo: '/assets/logos/amul_com.png' },
  { name: 'NTPC',                logo: '/assets/logos/ntpc_co_in.png' },
  { name: 'Zydus Life',          logo: '/assets/logos/zyduslife_com.png' },
  { name: 'Ambuja Cement',       logo: '/assets/logos/ambujacement_com.png' },
  { name: 'Patel Infra',         logo: '/assets/logos/patelinfrastructure_com.png' },
  { name: 'Bharat Petroleum',    logo: '/assets/logos/bharatpetroleum_in.png' },
  { name: 'BSNL',                logo: '/assets/logos/bsnl_co_in.png' },
  { name: 'IRB Infra',           logo: '/assets/logos/irb_co_in.png' },
  { name: 'Essar',               logo: '/assets/logos/essar_com.png' },
  { name: 'Adani',               logo: '/assets/logos/adani_com.png' },
  { name: 'Hindustan Petroleum', logo: '/assets/logos/hindustanpetroleum_com.png' },
  { name: 'Indian Oil',          logo: '/assets/logos/iocl_com.png' },
  { name: 'L&T',                 logo: '/assets/logos/larsentoubro_com.png' },
  { name: 'MRF',                 logo: '/assets/logos/mrftyres_com.png' },
  { name: 'Afcons',              logo: '/assets/logos/afcons_com.png' },
  { name: 'ONGC',                logo: '/assets/logos/ongcindia_com.png' },
];

const CLIENTS_ROW2 = [
  { name: 'DLF',                 logo: '/assets/logos/dlf_in.png' },
  { name: 'Aditya Birla',        logo: '/assets/logos/adityabirla_com.png' },
  { name: 'Indian Railways',     logo: '/assets/logos/indianrailways_gov_in.png' },
  { name: 'GMR Group',           logo: '/assets/logos/gmrgroup_in.png' },
  { name: 'MEIL',                logo: '/assets/logos/meil_in.png' },
  { name: 'Samsung',             logo: '/assets/logos/samsung_com.png' },
  { name: 'Tata',                logo: '/assets/logos/tata_com.png' },
  { name: 'Ultratech',           logo: '/assets/logos/ultratechcement_com.png' },
  { name: 'Jindal Steel',        logo: '/assets/logos/jindalsteelpower_com.png' },
  { name: 'Suzlon',              logo: '/assets/logos/suzlon_com.png' },
  { name: 'Torrent Power',       logo: '/assets/logos/torrentpower_com.png' },
  { name: 'Reliance',            logo: '/assets/logos/ril_com.png' },
  { name: 'ABB',                 logo: '/assets/logos/abb_com.png' },
  { name: 'Shapoorji Pallonji',  logo: '/assets/logos/shapoorjipallonji_com.png' },
  { name: 'Sadbhav',             logo: '/assets/logos/sadbhav_com.png' },
  { name: 'Jaypee Group',        logo: '/assets/logos/jaypeegroup_com.png' },
  { name: 'ITcon',               logo: '/assets/logos/itcon_in.png' },
];

const ClientTile = ({ client }) => {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="flex items-center justify-center bg-white rounded-lg p-3 sm:p-4 shadow-sm border border-[#e2e8f0] hover:border-[var(--apt-red)] hover:shadow-md transition-all duration-300 h-16 sm:h-20 w-full group relative overflow-hidden select-none">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      {!imgFailed ? (
        <img
          src={client.logo}
          alt={client.name}
          onError={() => setImgFailed(true)}
          className="h-10 sm:h-12 w-auto max-w-[90%] object-contain transition-all duration-300 group-hover:scale-105 filter grayscale hover:grayscale-0"
        />
      ) : (
        <div className="flex flex-col items-center justify-center text-center">
          <span className="font-montserrat text-[10px] font-bold text-gray-500 uppercase tracking-tight">
            {client.name}
          </span>
        </div>
      )}
    </div>
  );
};

function TrustedClientsSection() {
  const [showAllGrid, setShowAllGrid] = useState(false);
  const allClients = [...CLIENTS_ROW1, ...CLIENTS_ROW2];
  
  // Duplicate rows for seamless infinite scroller loop
  const doubledRow1 = [...CLIENTS_ROW1, ...CLIENTS_ROW1];
  const doubledRow2 = [...CLIENTS_ROW2, ...CLIENTS_ROW2];

  return (
    <section className="bg-[var(--apt-offwhite)] py-20 sm:py-24 border-t border-gray-100 relative">
      {/* Marquee CSS injection */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marqueeRowLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRowRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          display: flex;
          width: max-content;
          animation: marqueeRowLeft 35s linear infinite;
        }
        .animate-marquee-right {
          display: flex;
          width: max-content;
          animation: marqueeRowRight 35s linear infinite;
        }
        .marquee-scroller-box:hover .animate-marquee-left,
        .marquee-scroller-box:hover .animate-marquee-right {
          animation-play-state: paused;
        }
      `}} />

      {/* Header */}
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 text-center space-y-4">
        <span className="font-montserrat text-[10px] sm:text-xs font-black tracking-[0.3em] text-[var(--apt-red)] uppercase block">
          TRUSTED BY INDIA&apos;S BEST
        </span>
        <h2 className="font-khand text-4xl sm:text-5xl font-black uppercase tracking-tight text-[#1a1a1a]">
          OUR <span className="text-[var(--apt-red)]">CLIENTS</span>
        </h2>
        <div className="w-20 h-1 bg-[var(--apt-red)] mx-auto" />
      </div>

      {/* Interactive toggle block */}
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex justify-center">
        <button
          onClick={() => setShowAllGrid(!showAllGrid)}
          className="inline-flex items-center gap-2 font-montserrat text-xs font-black tracking-widest text-[var(--apt-red)] hover:text-black border border-[var(--apt-red)]/20 hover:border-black/30 px-5 py-2.5 rounded-sm bg-white shadow-sm hover:shadow transition-all duration-300"
        >
          {showAllGrid ? 'COLLAPSE SCROLLER' : 'VIEW ALL CLIENTS'}
          <svg className={`w-4 h-4 transform transition-transform duration-300 ${showAllGrid ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Main Display Area (Marquee Scroller or Static Grid) */}
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {!showAllGrid ? (
          // Infinite Scrolling Marquee
          <div className="space-y-6 marquee-scroller-box relative py-4">
            {/* Edge shadows for vignette blurring */}
            <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[var(--apt-offwhite)] to-transparent z-15 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[var(--apt-offwhite)] to-transparent z-15 pointer-events-none" />

            {/* Row 1 (Left Scrolling) */}
            <div className="flex overflow-hidden">
              <div className="animate-marquee-left flex gap-4">
                {doubledRow1.map((client, i) => (
                  <div key={`marquee-1-${client.name}-${i}`} className="w-36 sm:w-44 shrink-0">
                    <ClientTile client={client} />
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2 (Right Scrolling) */}
            <div className="flex overflow-hidden">
              <div className="animate-marquee-right flex gap-4">
                {doubledRow2.map((client, i) => (
                  <div key={`marquee-2-${client.name}-${i}`} className="w-36 sm:w-44 shrink-0">
                    <ClientTile client={client} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Static Grid (Full view)
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 animate-fadeIn">
            {allClients.map((client, i) => (
              <ClientTile key={`grid-${client.name}-${i}`} client={client} />
            ))}
          </div>
        )}
      </div>

      {/* Stats strip */}
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24">
        <div className="grid grid-cols-3 gap-6 sm:gap-12 border-t border-gray-100 pt-12">
          {[
            { value: '35+', label: 'ENTERPRISE CLIENTS' },
            { value: '500+', label: 'ACTIVE PROJECTS' },
            { value: '25+', label: 'YEARS TRUSTED' },
          ].map((stat, i) => (
            <div key={i} className="text-center group/stat">
              <div className="font-outfit text-3xl sm:text-5xl font-black text-[#1a1a1a] tracking-tight transition-colors duration-300 group-hover/stat:text-[var(--apt-red)]">{stat.value}</div>
              <div className="font-montserrat text-[10px] sm:text-[11px] font-bold tracking-widest text-[#2d2d2d] uppercase mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustedClientsSection;
