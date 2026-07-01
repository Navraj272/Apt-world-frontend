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
  { name: 'Torrent Power', logo: logo('torrent_power.png') },
  { name: 'ABB', logo: logo('abb.png') },
  { name: 'Shapoorji Pallonji', logo: logo('shapoorji_pallonji.png') },
  { name: 'Patel Infrastructure', logo: logo('patel_infrastructure.png') },
  { name: 'Sadbhav', logo: logo('sadbhav.png') },
  { name: 'Jaypee Group', logo: logo('jaypee_group.png') },
];

const ClientTile = ({ client }) => {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="flex items-center justify-center bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:border-[var(--apt-red)]/40 hover:shadow-md transition-all duration-300 h-24 sm:h-28">
      {!imgFailed ? (
        <img
          src={client.logo}
          alt={client.name}
          onError={() => setImgFailed(true)}
          className="w-full h-full object-contain"
          loading="lazy"
        />
      ) : (
        <div className="flex flex-col items-center justify-center text-center gap-1.5">
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
  return (
    <section className="bg-[var(--apt-offwhite)] py-20 sm:py-24 border-t border-gray-100">
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

      {/* Still grid */}
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 sm:gap-4">
          {CLIENTS.map((client) => (
            <ClientTile key={client.name} client={client} />
          ))}
        </div>
      </div>

      {/* Stats strip */}
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24">
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
