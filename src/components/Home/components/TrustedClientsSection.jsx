import React, { useState } from 'react';

const logo = (file) => `/assets/logos/${file}`;
const clearbit = (domain) => `https://logo.clearbit.com/${domain}?size=256`;

const CLIENTS = [
  { name: 'ISRO', logo: logo('isro.png') },
  { name: 'AMUL', logo: logo('amul.png') },
  { name: 'NTPC', logo: logo('ntpc.png') },
  { name: 'Zydus', logo: logo('zydus.png') },
  { name: 'Ambuja Cement', logo: clearbit('ambujacement.com') },
  { name: 'IRCON', logo: clearbit('ircon.org') },
  { name: 'Bharat Petroleum', logo: logo('bharat_petroleum.png') },
  { name: 'BSNL', logo: logo('bsnl.png') },
  { name: 'NHAI', logo: logo('nhai.png') },
  { name: 'Essar', logo: clearbit('essar.com') },
  { name: 'Jindal Steel', logo: logo('jindal_steel.png') },
  { name: 'Adani', logo: logo('adani.png') },
  { name: 'Hindustan Petroleum', logo: clearbit('hindustanpetroleum.com') },
  { name: 'Indian Oil', logo: logo('indian_oil.png') },
  { name: 'L&T', logo: logo('larsen_toubro.png') },
  { name: 'MRF', logo: logo('mrf.png') },
  { name: 'ONGC', logo: logo('ongc.png') },
  { name: 'DLF', logo: logo('dlf.png') },
  { name: 'Aditya Birla Group', logo: logo('aditya_birla.png') },
  { name: 'Indian Railways', logo: logo('indian_railways.png') },
  { name: 'Tata', logo: logo('tata.png') },
  { name: 'UltraTech Cement', logo: logo('ultratech_cement.png') },
  { name: 'Samsung', logo: logo('samsung.png') },
  { name: 'Reliance', logo: logo('reliance.png') },
  { name: 'GMR Group', logo: logo('gmr_group.png') },
  { name: 'MEIL', logo: logo('meil.png') },
  { name: 'Suzlon', logo: logo('suzlon.png') },
  { name: 'ABB', logo: logo('abb.png') },
  { name: 'Shapoorji Pallonji', logo: logo('shapoorji_pallonji.png') },
  { name: 'Patel Infrastructure', logo: logo('patel_infrastructure.png') },
  { name: 'Sadbhav', logo: logo('sadbhav.png') },
];

const ClientTile = ({ client }) => {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="group relative flex items-center justify-center bg-white rounded-2xl p-5 shadow-sm border border-gray-200 hover:border-[var(--apt-red)]/40 hover:shadow-lg hover:shadow-[var(--apt-red)]/5 transition-all duration-300 h-20 sm:h-24 select-none cursor-pointer w-32 sm:w-36 shrink-0 overflow-hidden">
      {/* Client Logo */}
      {!imgFailed ? (
        <img
          src={client.logo}
          alt={client.name}
          onError={() => setImgFailed(true)}
          className="w-full h-full object-contain transition-all duration-300"
          loading="lazy"
        />
      ) : (
        <div className="flex flex-col items-center justify-center text-center gap-1.5 w-full h-full">
          <div className="w-9 h-9 rounded-full bg-[var(--apt-offwhite)] flex items-center justify-center">
            <span className="font-khand text-base font-bold text-[var(--apt-red)]">
              {client.name.charAt(0)}
            </span>
          </div>
          <span className="font-montserrat text-[8px] font-bold text-gray-500 uppercase tracking-tight leading-tight">
            {client.name}
          </span>
        </div>
      )}
    </div>
  );
};

function TrustedClientsSection() {
  const row1 = CLIENTS.slice(0, 17);
  const row2 = CLIENTS.slice(17);

  return (
    <section className="bg-[var(--apt-offwhite)] py-10 sm:py-12 border-t border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 text-center space-y-4">
        <span className="font-montserrat text-sm sm:text-base font-black tracking-[0.3em] text-[var(--apt-red)] uppercase block">
          TRUSTED BY INDIA&apos;S BEST
        </span>
        <h2 className="font-khand text-4xl sm:text-5xl font-black uppercase tracking-tight text-[#1a1a1a]">
          OUR <span className="text-[var(--apt-red)]">CLIENTS</span>
        </h2>
        <div className="w-20 h-1 bg-[var(--apt-red)] mx-auto" />
      </div>

      <div className="w-full overflow-hidden py-4 space-y-6 relative">
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes marquee-ltr {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          @keyframes marquee-rtl {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee-ltr {
            display: flex;
            width: max-content;
            animation: marquee-ltr 60s linear infinite;
          }
          .animate-marquee-rtl {
            display: flex;
            width: max-content;
            animation: marquee-rtl 60s linear infinite;
          }
          .animate-marquee-ltr:hover, .animate-marquee-rtl:hover {
            animation-play-state: paused;
          }
        `}} />

        {/* Row 1: Left-to-Right (LTR) */}
        <div className="relative w-full overflow-hidden flex">
          {/* Gradient Fades on edges */}
          <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[var(--apt-offwhite)] to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[var(--apt-offwhite)] to-transparent z-20 pointer-events-none" />

          <div className="animate-marquee-ltr flex gap-4 px-2">
            {row1.map((client, index) => (
              <ClientTile key={`r1-${client.name}-${index}`} client={client} />
            ))}
            {row1.map((client, index) => (
              <ClientTile key={`r1-dup-${client.name}-${index}`} client={client} />
            ))}
          </div>
        </div>

        {/* Row 2: Right-to-Left (RTL) */}
        <div className="relative w-full overflow-hidden flex">
          {/* Gradient Fades on edges */}
          <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[var(--apt-offwhite)] to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[var(--apt-offwhite)] to-transparent z-20 pointer-events-none" />

          <div className="animate-marquee-rtl flex gap-4 px-2">
            {row2.map((client, index) => (
              <ClientTile key={`r2-${client.name}-${index}`} client={client} />
            ))}
            {row2.map((client, index) => (
              <ClientTile key={`r2-dup-${client.name}-${index}`} client={client} />
            ))}
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-6">
        <div className="grid grid-cols-3 gap-6 sm:gap-12 border-t border-gray-100 pt-12">
          {[
            { value: '25+', label: 'ENTERPRISE CLIENTS' },
            { value: '500+', label: 'ACTIVE PROJECTS' },
            { value: '25+', label: 'YEARS TRUSTED' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="font-outfit text-3xl sm:text-5xl font-black text-[#1a1a1a] tracking-tight">{stat.value}</div>
              <div className="font-montserrat text-[10px] sm:text-[11px] font-bold tracking-widest text-[#2d2d2d] uppercase mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustedClientsSection;
