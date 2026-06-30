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
    <div className="flex items-center justify-center bg-white rounded-lg p-5 shadow-sm border border-[#e2e8f0] hover:border-[var(--apt-red)] transition-all duration-300 h-24 sm:h-32 group relative">
      {!imgFailed ? (
        <img
          src={client.logo}
          alt={client.name}
          onError={() => setImgFailed(true)}
          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-full bg-[var(--apt-offwhite)] flex items-center justify-center mb-2">
            <span className="font-khand text-xl font-bold text-[var(--apt-red)]">
              {client.name.charAt(0)}
            </span>
          </div>
          <span className="font-montserrat text-[10px] font-bold text-gray-500 uppercase tracking-tighter">
            {client.name}
          </span>
        </div>
      )}
    </div>
  );
};

function TrustedClientsSection() {
  const allClients = [...CLIENTS_ROW1, ...CLIENTS_ROW2];

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

      {/* Static Grid */}
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-6">
          {allClients.map((client, i) => (
            <ClientTile key={`${client.name}-${i}`} client={client} />
          ))}
        </div>
      </div>

      {/* Stats strip */}
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24">
        <div className="grid grid-cols-3 gap-6 sm:gap-12 border-t border-gray-100 pt-12">
          {[
            { value: '35+', label: 'ENTERPRISE CLIENTS' },
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
