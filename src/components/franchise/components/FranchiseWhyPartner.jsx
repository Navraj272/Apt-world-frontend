import React from 'react';

// Custom SVG Icons for the 6 key advantages
const IconMap = {
  box: (
    <svg className="w-6 h-6 text-[var(--apt-red)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
  money: (
    <svg className="w-6 h-6 text-[var(--apt-red)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  megaphone: (
    <svg className="w-6 h-6 text-[var(--apt-red)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
    </svg>
  ),
  manager: (
    <svg className="w-6 h-6 text-[var(--apt-red)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
    </svg>
  ),
  tech: (
    <svg className="w-6 h-6 text-[var(--apt-red)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  shield: (
    <svg className="w-6 h-6 text-[var(--apt-red)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  )
};

function FranchiseWhyPartner({ data }) {
  const { title, items } = data;

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col items-center mb-12 sm:mb-16 text-center">
          <h2 className="font-khand text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-[var(--apt-navy)]">
            {title}
          </h2>
          <div className="w-20 h-[3px] bg-[var(--apt-red)] mt-3" />
        </div>

        {/* 3x2 Grid on desktop, responsive down to 1 col */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 sm:p-8 border border-gray-100 border-l-4 border-l-[var(--apt-red)] hover:border-l-[var(--apt-red)] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-start items-start gap-4 rounded-sm"
            >
              {/* Icon Container */}
              <div className="p-3 bg-red-50 rounded-sm">
                {IconMap[item.icon] || IconMap.box}
              </div>

              {/* Text */}
              <div className="space-y-2">
                <h3 className="font-montserrat text-sm sm:text-base font-bold text-[var(--apt-navy)] uppercase tracking-wide">
                  {item.title}
                </h3>
                <p className="font-montserrat text-xs sm:text-sm text-gray-500 font-medium leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default FranchiseWhyPartner;
