import React from 'react';

const equipmentData = [
  {
    id: 1,
    title: 'Boom Lift',
    image: '/assets/images/rental/boom-lift.jpg',
    description: `Boom lifts provide exceptional reach and flexibility for working at height. Their platforms can be elevated vertically, shifted laterally, and extended horizontally, allowing operators to safely work over obstacles.

Diesel boom lifts are designed for rugged outdoor environments and rough terrain. These self-propelled machines allow operators to move around the job site even while elevated.

Electric boom lifts are ideal for indoor applications, maintenance work, and cleaning. Their compact size, lightweight construction, non-marking tyres, and excellent manoeuvrability make them suitable for delicate flooring and confined spaces.`,
    specs: {
      head: ['Lift Type', 'Power Source', 'Working Height (m)', 'Safe Working Load (kg)'],
      rows: [
        ['Telescopic', 'Diesel', '58.25', '230'],
        ['Telescopic', 'Diesel', '47.75', '230'],
        ['Telescopic', 'Diesel', '43.30', '230'],
        ['Telescopic', 'Diesel', '38.73', '230'],
        ['Telescopic', 'Diesel', '27.91', '227'],
        ['Articulated', 'Diesel', '26.46', '230'],
        ['Telescopic', 'Diesel', '22.31', '230'],
        ['Articulated', 'Diesel', '20.47', '230'],
        ['Telescopic', 'Diesel', '20.30', '227'],
        ['Articulated', 'Diesel', '17.81', '230'],
        ['Articulated', 'Diesel', '16.25', '230'],
        ['Telescopic', 'Diesel', '16.02', '230'],
        ['Articulated', 'Electric', '20.22', '227'],
        ['Articulated', 'Electric', '15.94', '227'],
        ['Articulated', 'Electric', '15.72', '230'],
        ['Articulated', 'Bi-Energy (Diesel / Electric)', '12.52', '227'],
        ['Articulated', 'Bi-Energy (Diesel / Electric)', '12.00', '200'],
      ],
    },
  },
  {
    id: 2,
    title: 'Scissor Lift',
    image: '/assets/images/rental/scissor-lift.jpg',
    description: `Scissor lifts are vertical access platforms that operate using a criss-cross "X" lifting mechanism. They provide spacious work platforms with extending bridge decks for improved access. Designed for lifting multiple workers and equipment safely, they offer high load capacities of up to 1000 kg. Electric models feature non-marking tyres, making them suitable for indoor environments.`,
    specs: {
      head: ['Lift Type', 'Power Source', 'Working Height (m)', 'Safe Working Load (kg)'],
      rows: [
        ['Scissor', 'Diesel', '26.00', '750'],
        ['Scissor', 'Diesel', '18.00', '681'],
        ['Scissor', 'Diesel', '17.03', '400'],
        ['Scissor', 'Diesel', '14.00', '681'],
        ['Scissor', 'Electric', '13.90', '340'],
        ['Scissor', 'Electric', '12.06', '340'],
        ['Scissor', 'Electric', '9.92', '340'],
        ['Scissor', 'Electric', '8.00', '340'],
        ['Scissor', 'Electric', '6.00', '340'],
        ['Scissor', 'Electric', '5.00', '340'],
      ],
    },
  },
  {
    id: 3,
    title: 'Vertical Mast Lift',
    image: '/assets/images/rental/vertical-mast-lift.jpg',
    description: `Vertical mast lifts are compact access platforms designed for maintenance and indoor work. They offer excellent manoeuvrability, intuitive controls, maintenance-free components, and automatic battery charging, ensuring reliable performance in confined spaces.`,
    specs: {
      head: ['Lift Type', 'Power Source', 'Working Height (m)', 'Safe Working Load (kg)'],
      rows: [
        ['Vertical Mast', 'Electric', '10.30', '200'],
        ['Vertical Mast', 'Electric', '8.00', '227'],
        ['Vertical Mast', 'Electric', '5.00', '227'],
      ],
    },
  },
  {
    id: 4,
    title: 'Spider Lift',
    image: '/assets/images/rental/spider-lift.jpg',
    description: `Spider lifts are tracked aerial work platforms designed for reaching difficult and elevated work areas. Their extendable tracks provide stability on uneven terrain, while compact dimensions allow access through narrow spaces. Suitable for indoor and outdoor use, they can operate on steep inclines within manufacturer limits. Available with AC, Diesel, and optional DC power configurations.`,
    specs: {
      head: ['Lift Type', 'Power Source', 'Working Height (m)', 'Safe Working Load (kg)'],
      rows: [
        ['Articulated', 'AC / Diesel (Optional DC)', '52.40', '230'],
        ['Telescopic', 'AC / Diesel (Optional DC)', '41.40', '230'],
        ['Telescopic', 'AC / Diesel (Optional DC)', '35.40', '230'],
        ['Telescopic', 'AC / Diesel (Optional DC)', '30.50', '230'],
        ['Articulated', 'AC / Diesel (Optional DC)', '30.20', '230'],
        ['Telescopic', 'AC / Diesel (Optional DC)', '26.20', '230'],
        ['Articulated', 'AC / Diesel (Optional DC)', '26.00', '230'],
        ['Articulated', 'AC / Diesel (Optional DC)', '23.50', '230'],
        ['Telescopic', 'AC / Diesel (Optional DC)', '21.20', '200'],
        ['Telescopic', 'AC / Diesel (Optional DC)', '18.50', '200'],
        ['Telescopic', 'AC / Diesel (Optional DC)', '17.60', '200'],
        ['Telescopic', 'AC / Diesel (Optional DC)', '15.60', '200'],
        ['Articulated', 'AC / Diesel (Optional DC)', '15.00', '230'],
        ['Telescopic', 'AC / Diesel (Optional DC)', '12.20', '200'],
      ],
    },
  },
  {
    id: 5,
    title: 'Mast Climber',
    image: '/assets/images/rental/mast-climber.jpg',
    description: `Mast Climbers (MCWP – Mast Climbing Work Platforms) provide a safe and efficient solution for accessing elevated work areas on construction sites, façades, and maintenance projects. Unlike traditional scaffolding, mast climbers offer adjustable working platforms that can reach heights of up to 300 metres. Multiple attachments and configurations are available to meet specific project requirements.`,
    specs: {
      head: ['Product Code', 'Power Source', 'Maximum Working Height (m)', 'Single Mast SWL (kg)', 'Twin Mast SWL (kg)'],
      rows: [
        ['RE MC4000', 'Electric', 'Up to 300', 'Up to 2000', 'Up to 4200'],
        ['RE MC8000', 'Electric', 'Up to 300', 'Up to 4500', 'Up to 8000'],
      ],
    },
    note: 'Available with multiple attachments and can be customized according to site requirements.',
  },
];

function RentalPage() {
  return (
    <div className="w-full min-h-screen bg-white text-[var(--apt-navy)] pt-24 font-montserrat">

      <section className="relative bg-[var(--apt-navy)] text-white py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/images/rental/boom-lift.jpg"
            alt="Rental Equipment"
            className="w-full h-full object-cover object-center opacity-15 grayscale select-none pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--apt-navy)]/95 via-[var(--apt-navy)]/85 to-[var(--apt-navy)]/95 z-10" />
          <div className="absolute inset-0 z-10" style={{ background: 'radial-gradient(ellipse at center, transparent 20%, var(--apt-navy) 95%)' }} />
        </div>

        <div className="relative z-20 max-w-[1350px] w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="font-montserrat text-xs sm:text-sm font-black tracking-[0.25em] text-[var(--apt-red)] uppercase block">
            HEAVY EQUIPMENT RENTAL
          </span>
          <h1 className="font-khand text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-none">
            RENTAL <span className="text-[var(--apt-red)]">EQUIPMENT</span>
          </h1>
          <p className="font-montserrat text-sm sm:text-base text-gray-300 leading-relaxed max-w-[650px] font-medium pt-2">
            High-performance aerial work platforms and access equipment available for short-term and long-term rental across India.
          </p>
        </div>
      </section>

      <section className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative">
        {/* Subtle industrial background watermark */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
          <svg className="w-full h-full opacity-[0.02]" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="rental-grid-bg" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="var(--apt-navy)" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#rental-grid-bg)" />
          </svg>
        </div>
        <div className="relative z-10 space-y-24 sm:space-y-32">
          {equipmentData.map((eq, index) => {
            const ImageContent = (
              <div className="relative overflow-hidden rounded-sm bg-gray-100 shadow-lg group">
                <img
                  src={eq.image}
                  alt={eq.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-3 right-3 bg-[var(--apt-navy)]/80 backdrop-blur-sm px-3 py-1.5 rounded-sm border border-white/10 select-none pointer-events-none">
                  <span className="font-khand text-xs sm:text-sm font-bold tracking-wider text-white leading-none">
                    APT <span className="text-[var(--apt-red)]">WORLD</span>
                  </span>
                </div>
              </div>
            );

            const TextContent = (
              <div className="space-y-6">
                <div className="space-y-3">
                  <span className="font-khand text-6xl sm:text-7xl font-black text-[var(--apt-red)]/10 leading-none select-none">
                    {String(eq.id).padStart(2, '0')}
                  </span>
                  <h2 className="font-khand text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#1a1a1a] -mt-3">
                    {eq.title}
                  </h2>
                  <div className="w-16 h-[3px] bg-[var(--apt-red)]" />
                </div>
                <div className="space-y-4">
                  {eq.description.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="font-montserrat text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            );

            return (
              <div key={eq.id}>
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${index % 2 === 1 ? '' : ''}`}>
                  {index % 2 === 0 ? (
                    <>
                      <div className="aspect-[4/3] w-full">{ImageContent}</div>
                      <div>{TextContent}</div>
                    </>
                  ) : (
                    <>
                      <div className="lg:order-2 aspect-[4/3] w-full">{ImageContent}</div>
                      <div className="lg:order-1">{TextContent}</div>
                    </>
                  )}
                </div>

                <div className="mt-10 overflow-x-auto">
                  <div className="inline-block min-w-full align-middle">
                    <table className="min-w-full border-collapse">
                      <thead>
                        <tr className="bg-[var(--apt-navy)]">
                          {eq.specs.head.map((h, i) => (
                            <th key={i} className="font-montserrat text-[10px] sm:text-xs font-bold tracking-wider text-white px-4 py-3.5 text-left uppercase whitespace-nowrap border-r border-white/5 last:border-r-0">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {eq.specs.rows.map((row, ri) => (
                          <tr key={ri} className={`${ri % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-red-50/30 transition-colors`}>
                            {row.map((cell, ci) => (
                              <td key={ci} className="font-montserrat text-[11px] sm:text-xs font-semibold text-gray-700 px-4 py-3 border-b border-gray-100 whitespace-nowrap">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {eq.note && (
                  <p className="mt-4 font-montserrat text-[11px] sm:text-xs text-gray-500 italic font-medium">
                    Note: {eq.note}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-white border-t border-gray-100 py-16 sm:py-24">
        <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="relative text-white p-8 sm:p-12 md:p-16 border border-white/5 shadow-2xl overflow-hidden rounded-sm"
            style={{
              background: 'repeating-linear-gradient(45deg, var(--apt-navy), var(--apt-navy) 12px, #0A1425 12px, #0A1425 24px)',
              clipPath: 'polygon(0 0, 100% 0, 100% 90%, 98% 100%, 0 100%)'
            }}
          >
            <div className="absolute inset-0 opacity-5 pointer-events-none select-none">
              <svg width="100%" height="100%">
                <defs>
                  <pattern id="rental-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#rental-grid)" />
              </svg>
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
              <div className="space-y-4 max-w-[650px]">
                <h2 className="font-khand text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white leading-none">
                  NEED A CUSTOM SOLUTION?
                </h2>
                <p className="font-montserrat text-xs sm:text-sm text-gray-400 font-medium leading-relaxed">
                  Contact our rental consultants for customized fleet requirements, long-term rental agreements, and site-specific equipment recommendations.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="/contact"
                  className="text-center font-montserrat text-xs font-bold tracking-widest text-white bg-[var(--apt-red)] px-8 py-[1.125rem] rounded-sm hover:bg-transparent hover:border-[var(--apt-red)] hover:text-[var(--apt-red)] border border-transparent transition-all duration-300 shadow-lg shadow-[var(--apt-red)]/15 uppercase"
                >
                  REQUEST RENTAL
                </a>
                <a
                  href="/contact"
                  className="text-center font-montserrat text-xs font-bold tracking-widest text-white border border-white/20 px-8 py-[1.125rem] rounded-sm hover:bg-white hover:text-[var(--apt-navy)] hover:border-white transition-all duration-300 uppercase"
                >
                  CONTACT SALES
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default RentalPage;
