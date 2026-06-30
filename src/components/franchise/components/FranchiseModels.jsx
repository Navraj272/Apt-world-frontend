import React from 'react';

function FranchiseModels({ data, onSelectModel }) {
  const { title, subtitle, items } = data;

  return (
    <section id="franchise-models" className="bg-[var(--apt-navy)] text-white py-16 sm:py-24">
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with Red Vertical Accent Line on Left */}
        <div className="border-l-4 border-[var(--apt-red)] pl-4 mb-12 sm:mb-16">
          <h2 className="font-khand text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-white leading-none">
            {title}
          </h2>
          <p className="font-montserrat text-xs sm:text-sm text-gray-400 font-medium mt-2">
            {subtitle}
          </p>
        </div>

        {/* Model Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-[1000px] mx-auto items-stretch">
          {items.map((item) => {
            const isRedTheme = item.theme === 'red';

            return (
              <div
                key={item.id}
                onClick={() => onSelectModel(item.id)}
                className={`relative flex flex-col justify-between p-8 sm:p-10 rounded-sm border transition-all duration-300 cursor-pointer group shadow-lg ${
                  isRedTheme
                    ? 'bg-[var(--apt-red)] border-transparent hover:shadow-[var(--apt-red)]/10 hover:-translate-y-1'
                    : 'bg-[#0A1322] border-white/5 hover:border-white/15 hover:shadow-black/30 hover:-translate-y-1'
                }`}
              >
                {/* Overlapping "MOST POPULAR" Badge for Platinum */}
                {item.isPopular && (
                  <div className="absolute -top-3.5 right-8 bg-[var(--apt-red)] text-white px-3 py-1.5 rounded-2xl shadow-md border border-white/20 select-none">
                    <span className="font-montserrat text-[9px] font-black tracking-[0.2em] uppercase">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                {/* Card Top */}
                <div className="space-y-6">
                  {/* Card Header (Title & Price Tag) */}
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="font-khand text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white leading-none">
                        {item.name}
                      </h3>
                      <p
                        className={`font-montserrat text-[10px] sm:text-xs font-black tracking-widest uppercase mt-1.5 ${
                          isRedTheme ? 'text-white/80' : 'text-[#EA9000]'
                        }`}
                      >
                        {item.level}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="font-montserrat text-3xl sm:text-4xl font-extrabold text-white leading-none">
                        {item.investment.replace('*', '')}
                      </span>
                      <span className="font-montserrat text-[10px] font-black tracking-widest text-white/70 align-top ml-0.5">
                        INR*
                      </span>
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3.5 pt-4">
                    {item.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        {/* Custom Checkmark Circle SVG */}
                        {isRedTheme ? (
                          <span className="inline-flex items-center justify-center shrink-0 w-5 h-5 rounded-full bg-white text-[var(--apt-red)]">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center shrink-0 w-5 h-5 rounded-full bg-green-500/10 text-green-500">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                        )}
                        <span
                          className={`font-montserrat text-xs sm:text-sm font-semibold tracking-wide ${
                            isRedTheme ? 'text-white' : 'text-gray-300'
                          }`}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Bottom / Button CTA */}
                <div className="pt-8 sm:pt-10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Avoid triggering parent click twice
                      onSelectModel(item.id);
                    }}
                    className={`w-full font-montserrat text-xs sm:text-sm font-bold tracking-widest py-3 rounded-sm border uppercase transition-all duration-300 ${
                      isRedTheme
                        ? 'bg-[var(--apt-navy)] text-white border-transparent hover:bg-[var(--apt-navy)]/80 shadow-lg shadow-black/20'
                        : 'bg-transparent text-white border-white/20 hover:bg-white hover:text-[var(--apt-navy)] hover:border-white'
                    }`}
                  >
                    {item.buttonText}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default FranchiseModels;
