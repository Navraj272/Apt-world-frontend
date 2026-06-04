import React from 'react';

function TimelineSection() {
  const steps = [
    {
      id: '01',
      title: 'WESTERN HUB',
      description: 'Established headquarters and primary logistics in Mumbai/Pune corridor.',
      status: 'OPERATIONAL',
      statusType: 'success'
    },
    {
      id: '02',
      title: 'NORTHERN PUSH',
      description: 'Expansion into Delhi NCR and industrial zones of Haryana and Rajasthan.',
      status: 'OPERATIONAL',
      statusType: 'success'
    },
    {
      id: '03',
      title: 'SOUTHERN REACH',
      description: 'Distribution centers launched in Bengaluru, Chennai, and Hyderabad.',
      status: 'ACTIVE TEAM SET-UP',
      statusType: 'warning'
    },
    {
      id: '04',
      title: 'EASTERN FRONTIER',
      description: 'Entering Kolkata and the mineral-rich belts of Odisha and Jharkhand.',
      status: 'SOON',
      statusType: 'info'
    },
    {
      id: '05',
      title: 'NE CORRIDOR',
      description: 'Final phase connecting the 7 sisters to the industrial supply chain.',
      status: 'ON THE HORIZON',
      statusType: 'muted'
    }
  ];

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

  return (
    <section id="services" className="bg-[#F8F9FA] text-black py-20 sm:py-28 overflow-hidden">
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center space-y-3 pb-16 sm:pb-20">
          <span className="font-montserrat text-xs sm:text-sm font-black tracking-[0.2em] text-[#E11922] uppercase">
            SCALING OPERATIONS
          </span>
          <h2 className="font-khand text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-gray-900 leading-none">
            EXPANSION TIMELINE
          </h2>
        </div>

        {/* Horizontal Timeline Scroll Container */}
        <div className="relative pt-6">
          {/* Connecting horizontal line */}
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gray-200 -translate-y-1/2 hidden xl:block z-0" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 xl:gap-4 relative z-10">
            {steps.map((step) => (
              <div
                key={step.id}
                className="group bg-white p-6 sm:p-8 border border-gray-100 rounded-sm shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between min-h-[260px] relative hover:-translate-y-1 hover:border-[#E11922]/20"
              >
                {/* Timeline connector visual dots for large screens */}
                <div className="absolute top-1/2 -right-2 w-4 h-4 rounded-full border-4 border-white bg-gray-300 z-20 -translate-y-1/2 hidden xl:group-hover:bg-[#E11922] transition-colors duration-300 xl:block" />

                {/* Card Header (Step Number Box) */}
                <div className="flex justify-between items-start">
                  <div className="bg-[#050D1A] text-white font-outfit text-xs font-black tracking-widest px-3 py-1.5 rounded-sm">
                    {step.id}
                  </div>
                </div>

                {/* Step Details */}
                <div className="my-6 space-y-2.5">
                  <h3 className="font-khand text-xl sm:text-2xl font-extrabold tracking-wide text-gray-900 group-hover:text-[#E11922] transition-colors duration-300">
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
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default TimelineSection;
