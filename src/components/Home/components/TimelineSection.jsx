import React, { useState } from 'react';

function TimelineSection() {
  const [activeStep, setActiveStep] = useState('02');

  const steps = [
    {
      id: '01',
      title: 'WESTERN HUB',
      description: 'Established headquarters and primary logistics in Mumbai/Pune corridor.',
      status: 'OPERATIONAL',
      statusType: 'success',
      details: 'Mumbai & Pune corridor: 2 major distribution hubs (45,000 sq. ft. combined capacity), managing over 15,000 SKUs. Directly integrated with Nhava Sheva port for seamless import customs clearance and supply logistics.'
    },
    {
      id: '02',
      title: 'NORTHERN PUSH',
      description: 'Expansion into Delhi NCR and industrial zones of Haryana and Rajasthan.',
      status: 'OPERATIONAL',
      statusType: 'success',
      details: 'Neemrana & Noida: 1 major regional distribution center servicing 1,200+ local enterprises. Houses our primary Technical Services Center and a tool calibration laboratory.'
    },
    {
      id: '03',
      title: 'SOUTHERN REACH',
      description: 'Distribution centers launched in Bengaluru, Chennai, and Hyderabad.',
      status: 'ACTIVE TEAM SET-UP',
      statusType: 'warning',
      details: 'Bengaluru & Chennai: Local warehousing leases finalized. Current hiring phase for 45+ service technicians and sales representatives to cover local automotive and aerospace clusters.'
    },
    {
      id: '04',
      title: 'EASTERN FRONTIER',
      description: 'Entering Kolkata and the mineral-rich belts of Odisha and Jharkhand.',
      status: 'SOON',
      statusType: 'info',
      details: 'Kolkata central office planned for Q4 2026. Designed to directly support heavy mineral mining sectors, metal refineries, and steel mills with high-torque hydraulic tools.'
    },
    {
      id: '05',
      title: 'NE CORRIDOR',
      description: 'Final phase connecting the 7 sisters to the industrial supply chain.',
      status: 'ON THE HORIZON',
      statusType: 'muted',
      details: 'Guwahati hub planned for late 2027. Engineered to establish a localized spare-parts and tooling support corridor for tea estate processing and refinery maintenance teams.'
    }
  ];

  const activeStepData = steps.find(s => s.id === activeStep) || steps[0];

  const getStatusBadge = (status, type) => {
    switch (type) {
      case 'success':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider border border-green-500/30 text-green-600 bg-green-50/50">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            {status}
          </span>
        );
      case 'warning':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider border border-amber-500/30 text-amber-600 bg-amber-50/50">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            {status}
          </span>
        );
      case 'info':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider border border-blue-500/30 text-blue-600 bg-blue-50/50">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            {status}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider border border-gray-300 text-gray-500 bg-gray-50">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
            {status}
          </span>
        );
    }
  };

  const activeIndex = steps.findIndex(s => s.id === activeStep);

  return (
    <section id="services" className="bg-[var(--apt-offwhite)] text-black py-20 sm:py-28 overflow-hidden">
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center space-y-3 pb-16 sm:pb-20">
          <span className="font-montserrat text-xs sm:text-sm font-black tracking-[0.2em] text-[var(--apt-red)] uppercase">
            SCALING OPERATIONS
          </span>
          <h2 className="font-khand text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-[#1a1a1a] leading-none">
            EXPANSION TIMELINE
          </h2>
        </div>

        {/* Horizontal Timeline Scroll Container */}
        <div className="relative pt-6">
          {/* Connecting horizontal line track */}
          <div className="absolute top-1/2 left-[10%] right-[10%] h-[3px] bg-gray-200 -translate-y-1/2 hidden xl:block z-0" />
          
          {/* Connecting horizontal line fill active */}
          <div 
            className="absolute top-1/2 left-[10%] h-[3px] bg-[var(--apt-red)] -translate-y-1/2 hidden xl:block z-0 transition-all duration-700 ease-out"
            style={{
              width: `${(activeIndex / 4) * 80}%`
            }}
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 xl:gap-4 relative z-10">
            {steps.map((step, idx) => {
              const isPassedOrActive = idx <= activeIndex;
              const isActive = step.id === activeStep;

              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`group bg-white p-6 sm:p-8 border rounded-sm transition-all duration-300 flex flex-col justify-between min-h-[260px] relative text-left outline-none ${
                    isActive
                      ? 'border-[var(--apt-red)] shadow-xl shadow-[var(--apt-red)]/5 -translate-y-1.5'
                      : 'border-gray-100 shadow-md hover:shadow-lg hover:-translate-y-1 hover:border-gray-300'
                  }`}
                >
                  {/* Timeline connector visual dots for large screens */}
                  <div 
                    className={`absolute top-1/2 -right-2 w-4 h-4 rounded-full border-4 border-white z-20 -translate-y-1/2 hidden xl:block transition-all duration-500 ${
                      isPassedOrActive
                        ? 'bg-[var(--apt-red)] scale-110 shadow-[0_0_8px_var(--apt-red)]'
                        : 'bg-gray-300'
                    }`} 
                  />

                  {/* Card Header (Step Number Box) */}
                  <div className="flex justify-between items-start">
                    <div className={`font-outfit text-xs font-black tracking-widest px-3 py-1.5 rounded-sm transition-colors duration-300 ${
                      isActive ? 'bg-[var(--apt-red)] text-white' : 'bg-[var(--apt-navy)] text-white'
                    }`}>
                      {step.id}
                    </div>
                  </div>

                  {/* Step Details */}
                  <div className="my-6 space-y-2.5">
                    <h3 className={`font-khand text-xl sm:text-2xl font-extrabold tracking-wide uppercase transition-colors duration-300 ${
                      isActive ? 'text-[var(--apt-red)]' : 'text-[#1a1a1a] group-hover:text-[var(--apt-red)]'
                    }`}>
                      {step.title}
                    </h3>
                    <p className="font-montserrat text-xs sm:text-sm text-gray-500 font-medium leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Status Badge */}
                  <div className="pt-2">
                    {getStatusBadge(step.status, step.statusType)}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Step Detailed panel */}
        <div className="mt-12 bg-white border border-gray-150 p-6 sm:p-8 rounded-sm shadow-md max-w-4xl mx-auto relative overflow-hidden transition-all duration-500">
          <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-[var(--apt-red)]" />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4 mb-4">
            <h4 className="font-khand text-xl sm:text-2xl font-extrabold tracking-wide uppercase text-[#1a1a1a]">
              PHASE {activeStepData.id}: {activeStepData.title} SPECIFICATIONS
            </h4>
            {getStatusBadge(activeStepData.status, activeStepData.statusType)}
          </div>
          <p className="font-montserrat text-xs sm:text-sm text-gray-600 font-semibold leading-relaxed">
            {activeStepData.details}
          </p>
        </div>

      </div>
    </section>
  );
}

export default TimelineSection;
