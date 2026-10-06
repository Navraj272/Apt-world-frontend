import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';

function WhyChooseUsSection() {
  const [activeId, setActiveId] = useState('reliability');
  const containerRef = useRef(null);

  // Mouse tracking motion values for 3D tilt (-0.5 to 0.5 range)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // rotation limits
  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);

  // parallax translations
  const badgeX = useTransform(x, [-0.5, 0.5], [12, -12]);
  const badgeY = useTransform(y, [-0.5, 0.5], [12, -12]);

  const borderX = useTransform(x, [-0.5, 0.5], [-8, 8]);
  const borderY = useTransform(y, [-0.5, 0.5], [-8, 8]);

  // smooth springs
  const springRotateX = useSpring(rotateX, { stiffness: 120, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 120, damping: 20 });
  const springBadgeX = useSpring(badgeX, { stiffness: 120, damping: 20 });
  const springBadgeY = useSpring(badgeY, { stiffness: 120, damping: 20 });
  const springBorderX = useSpring(borderX, { stiffness: 120, damping: 20 });
  const springBorderY = useSpring(borderY, { stiffness: 120, damping: 20 });

  const handleMouseMove = (event) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = (event.clientX - rect.left) / width - 0.5;
    const mouseY = (event.clientY - rect.top) / height - 0.5;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const features = [
    {
      id: 'reliability',
      title: 'RELIABILITY',
      description: 'Built to withstand the hardest environments.',
      details: [
        'Extreme temperature tested (-20°C to +60°C)',
        'Heavy-duty drop-proof and dust-resistant casing',
        'IP56 rating for weather and water protection'
      ],
      // Target/shield check icon
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      id: 'quality',
      title: 'QUALITY',
      description: 'Strict adherence to international ISO standards.',
      details: [
        '100% factory calibration and load certification',
        'ISO 9001:2015 certified production processes',
        'Triple-stage quality inspection standard'
      ],
      // Quality badge/stamp icon
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    },
    {
      id: 'value',
      title: 'VALUE',
      description: 'Superior performance-to-cost ratio for owners.',
      details: [
        'Up to 40% reduction in lifetime maintenance costs',
        'Extended operational lifetime vs leading brands',
        'Premium features at a highly competitive local price'
      ],
      // Tag/currency icon
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2zM9 16a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" />
        </svg>
      )
    },
    {
      id: 'innovation',
      title: 'INNOVATION',
      description: 'Continuous R&D to use next-gen tool tech.',
      details: [
        'Smart torque control and speed feedback sensors',
        'Next-generation energy-efficient brushless motor',
        'Integrated thermal overload protection circuits'
      ],
      // Lightbulb/idea icon
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    }
  ];

  // Scroll animations variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 90,
        damping: 14
      }
    }
  };

  const imageVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 70,
        damping: 15
      }
    }
  };

  const activeFeature = features.find((f) => f.id === activeId) || features[0];

  return (
    <section id="about" className="bg-[var(--apt-navy)] text-white py-20 sm:py-28 overflow-hidden border-b border-white/5">
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center"
        >

          {/* Left Column: Welder Image with overlap badge */}
          <motion.div
            variants={imageVariants}
            className="lg:col-span-5 relative flex justify-center lg:justify-start"
          >
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-full max-w-[420px] lg:max-w-none cursor-pointer"
              style={{ perspective: 1000 }}
            >
              {/* Outer decorative border decoration */}
              <motion.div
                className="absolute -inset-3 border border-white/10 rounded-[0.675rem] pointer-events-none select-none -z-10"
                style={{
                  x: springBorderX,
                  y: springBorderY
                }}
              />

              {/* Main grayscale image */}
              <motion.img
                src="/assets/png/welder_industrial.png"
                alt="Industrial Welder Working"
                className="w-full h-auto object-cover rounded-[0.675rem] grayscale contrast-125 border border-white/10 shadow-2xl transition-all duration-700 hover:grayscale-0 hover:contrast-100 !opacity-100"
                style={{
                  rotateX: springRotateX,
                  rotateY: springRotateY,
                  transformStyle: 'preserve-3d'
                }}
              />

              {/* Red overlapping badge */}
              <motion.div
                className="absolute -bottom-6 -right-4 sm:-right-6 lg:-right-8 bg-[var(--apt-red)] text-white p-6 sm:p-8 rounded-sm shadow-xl z-10 flex flex-col justify-center items-center text-center min-w-[150px] sm:min-w-[170px]"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%)',
                  x: springBadgeX,
                  y: springBadgeY,
                  transformStyle: 'preserve-3d'
                }}
              >
                <span className="font-outfit text-4xl sm:text-5xl font-black tracking-tight leading-none">
                  25+
                </span>
                <span className="font-montserrat text-[9px] sm:text-[10px] font-black tracking-[0.2em] uppercase mt-2 leading-none">
                  YEARS OF
                </span>
                <span className="font-montserrat text-[9px] sm:text-[10px] font-black tracking-[0.2em] uppercase mt-1 leading-none">
                  EXCELLENCE
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Title and 2x2 Feature Grid */}
          <motion.div variants={containerVariants} className="lg:col-span-7 space-y-6">
            <div className="space-y-4">
              <motion.span variants={itemVariants} className="block font-montserrat text-xs sm:text-sm font-black tracking-[0.2em] text-[var(--apt-red)] uppercase">
                OUR FOUNDATION
              </motion.span>
              <motion.h2 variants={itemVariants} className="font-khand text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white leading-none">
                BUILT ON RIGOR & PRECISION
              </motion.h2>
              <motion.p variants={itemVariants} className="font-montserrat text-xs sm:text-sm md:text-base text-gray-300 font-medium leading-relaxed max-w-[620px] pt-1">
                Born from a legacy that includes leadership roles at Stanley Black & Decker, APT WORLD brings a global standard of industrial quality to the Indian market. We don't just sell tools; we engineer success.
              </motion.p>
            </div>

            {/* 2x2 Feature Grid (Compact Uniform Height Tabs) */}
            <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature) => {
                const isActive = activeId === feature.id;
                return (
                  <motion.div
                    key={feature.id}
                    variants={itemVariants}
                    onClick={() => setActiveId(feature.id)}
                    className={`cursor-pointer flex items-start gap-4 p-4 rounded-sm border transition-all duration-300 relative group overflow-hidden ${isActive
                      ? 'bg-white/[0.06] border-[var(--apt-red)] shadow-[0_4px_20px_rgba(238,43,46,0.15)]'
                      : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/10'
                      }`}
                  >
                    {/* Icon container */}
                    <div className={`p-2 rounded-sm shrink-0 transition-all duration-300 ${isActive
                      ? 'bg-[var(--apt-red)] text-white'
                      : 'bg-white/5 text-[var(--apt-red)] group-hover:bg-[var(--apt-red)] group-hover:text-white'
                      }`}>
                      {feature.icon}
                    </div>

                    <div className="space-y-1 w-full">
                      <div className="flex items-center justify-between">
                        <h4 className="font-khand text-base sm:text-lg font-bold tracking-wide uppercase text-white">
                          {feature.title}
                        </h4>
                      </div>

                      <p className="font-montserrat text-xs text-gray-200 font-medium leading-snug">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Shared Specifications Detail Panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="p-5 bg-white/[0.03] border border-white/10 rounded-sm relative overflow-hidden"
              >
                {/* Accent line on left */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--apt-red)]" />

                <div className="pl-2 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="font-montserrat text-[12px] font-black tracking-[0.2em] text-[var(--apt-red)] uppercase">
                      SPECIFICATIONS // {activeFeature.title}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                    {activeFeature.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        {/* Custom tiny check icon */}
                        <svg className="w-3.5 h-3.5 text-[var(--apt-red)] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-montserrat text-[12px] text-gray-200 font-medium leading-relaxed">
                          {detail}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}

export default WhyChooseUsSection;

