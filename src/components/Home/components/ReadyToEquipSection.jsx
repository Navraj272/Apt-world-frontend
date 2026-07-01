import React, { useState } from 'react';

function ReadyToEquipSection() {
  const [showForm, setShowForm] = useState(false);
  const [contactVal, setContactVal] = useState('');
  const [submitStatus, setSubmitStatus] = useState('idle'); // idle | loading | success
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!contactVal.trim()) {
      setErrorMessage('Please enter your email or phone number');
      return;
    }
    
    // Quick validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/;
    
    if (!emailRegex.test(contactVal) && !phoneRegex.test(contactVal.replace(/[\s()-]/g, ''))) {
      setErrorMessage('Please enter a valid email address or phone number');
      return;
    }

    setErrorMessage('');
    setSubmitStatus('loading');
    
    // Simulate API request call
    setTimeout(() => {
      setSubmitStatus('success');
    }, 1500);
  };

  return (
    <section id="franchise" className="bg-[var(--apt-offwhite)] py-16 sm:py-24">
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Angled Banner Container */}
        <div 
          className="relative bg-[var(--apt-navy)] text-white p-8 sm:p-12 md:p-16 border border-white/5 shadow-2xl overflow-hidden rounded-3xl transition-all duration-500"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 90%, 98% 100%, 0 100%)'
          }}
        >
          {/* Subtle Industrial Background Grid Lines */}
          <div className="absolute inset-0 opacity-5 pointer-events-none select-none">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
            {/* Left Content */}
            <div className="space-y-4 max-w-[650px]">
              <h2 className="font-khand text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white leading-none">
                READY TO EQUIP YOUR <br className="hidden sm:inline" /> ENTERPRISE?
              </h2>
              <p className="font-montserrat text-xs sm:text-sm text-gray-400 font-medium leading-relaxed">
                Partner with APT WORLD for bulk procurement, customized industrial supply chains, and specialized on-site technical services support.
              </p>
            </div>

            {/* Right Buttons / Interactive Form */}
            <div className="flex items-center justify-start lg:justify-end min-h-[60px] w-full lg:w-auto">
              {!showForm ? (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                  <button
                    onClick={() => setShowForm(true)}
                    className="text-center font-montserrat text-xs font-bold tracking-widest text-white bg-[var(--apt-red)] px-6 py-3 rounded-xl hover:bg-white hover:text-[var(--apt-red)] border border-transparent transition-all duration-300 shadow-lg shadow-[var(--apt-red)]/15 uppercase outline-none"
                  >
                    REQUEST DISCUSSION
                  </button>
                  <a
                    href="/contact"
                    className="text-center font-montserrat text-xs font-bold tracking-widest text-white border border-white/20 px-6 py-3 rounded-xl hover:bg-white hover:text-[var(--apt-navy)] hover:border-white transition-all duration-300 uppercase"
                  >
                    OFFICE LOCATOR
                  </a>
                </div>
              ) : submitStatus === 'success' ? (
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-green-500/10 border border-green-500/35 p-4 rounded-xl text-green-400 font-montserrat text-xs font-bold animate-fadeIn w-full max-w-md">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500 animate-bounce shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>REQUEST RECEIVED! WE WILL CALL YOU BACK.</span>
                  </div>
                  <button
                    onClick={() => { setShowForm(false); setContactVal(''); setSubmitStatus('idle'); }}
                    className="text-white border border-white/20 hover:bg-white hover:text-[var(--apt-navy)] px-3 py-1 rounded-lg ml-auto transition-all duration-300 text-[10px] font-bold"
                  >
                    CLOSE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-3 w-full max-w-md animate-fadeIn">
                  <div className="relative flex-grow">
                    <input
                      type="text"
                      placeholder="Enter Email or Phone Number"
                      value={contactVal}
                      disabled={submitStatus === 'loading'}
                      onChange={(e) => {
                        setContactVal(e.target.value);
                        if (errorMessage) setErrorMessage('');
                      }}
                      className="w-full font-montserrat text-xs font-semibold px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-[var(--apt-red)] focus:ring-1 focus:ring-[var(--apt-red)] text-white placeholder-gray-400 disabled:opacity-50 text-black focus:bg-white/15"
                    />
                    {errorMessage && (
                      <span className="absolute left-1 -bottom-5 text-[9px] font-bold text-[var(--apt-red)] tracking-wider">
                        {errorMessage}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex gap-2 mt-4 sm:mt-0">
                    <button
                      type="submit"
                      disabled={submitStatus === 'loading'}
                      className="font-montserrat text-xs font-bold tracking-widest text-white bg-[var(--apt-red)] px-5 py-3 rounded-xl hover:bg-white hover:text-[var(--apt-red)] transition-all duration-300 disabled:opacity-50 uppercase flex items-center justify-center min-w-[100px] outline-none"
                    >
                      {submitStatus === 'loading' ? (
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        'SUBMIT'
                      )}
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => { setShowForm(false); setErrorMessage(''); }}
                      className="font-montserrat text-xs font-bold tracking-widest text-white border border-white/20 px-4 py-3 rounded-xl hover:bg-white hover:text-[var(--apt-navy)] hover:border-white transition-all duration-300 uppercase outline-none"
                    >
                      CANCEL
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default ReadyToEquipSection;
