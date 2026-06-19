/* eslint-disable no-console */
import React, { useState } from 'react';
import { createEnquiry } from '@/services/postRequest';
import { useToast } from '@/hooks/use-toast';

function ContactMain() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
    consent: false,
  });

  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      title: 'PRIMARY LINE',
      value: '9699429699',
      icon: (
        <svg className="w-5 h-5 text-[#E11922]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
    },
    {
      title: 'SALES INQUIRIES',
      value: 'KOC.SALES1@GMAIL.COM',
      icon: (
        <svg className="w-5 h-5 text-[#E11922]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'HEADQUARTERS',
      value: 'INDORE, MP, INDIA',
      icon: (
        <svg className="w-5 h-5 text-[#E11922]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      title: 'OPERATIONAL HOURS',
      value: 'MON-SAT: 09:00 - 19:00',
      icon: (
        <svg className="w-5 h-5 text-[#E11922]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.consent) {
      toast({
        title: 'Consent Required',
        description: 'Please consent to storing data before transmitting.',
        variant: 'destructive',
      });
      return;
    }
    setIsSubmitting(true);
    try {
      await createEnquiry({
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: `${form.subject}: ${form.message}`,
        type: 'general'
      });
      
      toast({
        title: 'Message Sent',
        description: 'Your inquiry has been successfully transmitted.',
      });

      setForm({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: '',
        consent: false,
      });
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      toast({
        title: 'Error',
        description: 'Failed to transmit message. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-white py-16 sm:py-24 text-[#060F1E]">
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Reach Out To Us */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-2">
              <h2 className="font-khand text-3xl sm:text-4xl font-black uppercase tracking-wider text-gray-900">
                REACH OUT TO US
              </h2>
              <div className="w-16 h-[3px] bg-[#E11922]" />
            </div>

            {/* Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-gray-100 p-4 rounded-sm flex items-center gap-5 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-[#060F1E] rounded-sm flex items-center justify-center shrink-0 shadow-md">
                    {info.icon}
                  </div>
                  <div className="space-y-1">
                    <span className="font-montserrat text-[9px] sm:text-[10px] font-black tracking-widest text-gray-400 block">
                      {info.title}
                    </span>
                    <span className="font-khand text-lg sm:text-xl font-bold tracking-wide text-[#060F1E] block uppercase">
                      {info.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Styled Vector SVG Map */}
            <div className="relative w-full aspect-[4/3] bg-[#F1F3F5] rounded-sm border border-gray-200 overflow-hidden shadow-inner group">
              {/* SVG Map Lines */}
              <svg className="w-full h-full opacity-65 grayscale group-hover:opacity-85 transition-opacity duration-300" viewBox="0 0 400 300" fill="none">
                {/* River */}
                <path d="M-10,250 C120,230 180,180 230,110 C270,50 310,20 410,10" stroke="#CBD5E1" strokeWidth="28" strokeLinecap="round" />
                <path d="M-10,250 C120,230 180,180 230,110 C270,50 310,20 410,10" stroke="#E2E8F0" strokeWidth="24" strokeLinecap="round" />
                
                {/* Roads Grid */}
                <line x1="50" y1="0" x2="100" y2="300" stroke="#A1A1AA" strokeWidth="3" />
                <line x1="180" y1="0" x2="220" y2="300" stroke="#A1A1AA" strokeWidth="4.5" />
                <line x1="320" y1="0" x2="280" y2="300" stroke="#A1A1AA" strokeWidth="3" />
                
                <line x1="0" y1="80" x2="400" y2="120" stroke="#A1A1AA" strokeWidth="4" />
                <line x1="0" y1="190" x2="400" y2="160" stroke="#A1A1AA" strokeWidth="5" />
                
                {/* Secondary Roads */}
                <path d="M80,30 Q120,80 200,90 T350,150" stroke="#D4D4D8" strokeWidth="2" strokeDasharray="3 3" />
                <path d="M20,180 C110,200 190,140 280,240" stroke="#D4D4D8" strokeWidth="2" />
                <path d="M120,0 Q180,140 80,300" stroke="#D4D4D8" strokeWidth="1.5" />

                {/* Grid Blocks */}
                <rect x="110" y="20" width="35" height="40" rx="2" fill="#E4E4E7" opacity="0.6" />
                <rect x="250" y="30" width="40" height="35" rx="2" fill="#E4E4E7" opacity="0.6" />
                <rect x="30" y="110" width="50" height="40" rx="2" fill="#E4E4E7" opacity="0.6" />
                <rect x="240" y="200" width="55" height="45" rx="2" fill="#E4E4E7" opacity="0.6" />

                {/* HQ Locator Area */}
                <g transform="translate(202, 114)">
                  {/* Glowing Radar Circle */}
                  <circle cx="0" cy="0" r="16" fill="#E11922" opacity="0.15" className="animate-ping" />
                  <circle cx="0" cy="0" r="8" fill="#E11922" opacity="0.3" />
                  <circle cx="0" cy="0" r="3.5" fill="#E11922" />
                </g>
              </svg>

              {/* Pin Callout Badge */}
              <div className="absolute left-[202px] top-[114px] transform -translate-x-1/2 -translate-y-[120%] select-none pointer-events-none">
                <div className="bg-[#060F1E] border border-[#E11922] px-3 py-1.5 shadow-lg rounded-sm flex items-center gap-1.5 shrink-0">
                  <svg className="w-3 h-3 text-[#E11922] animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <span className="font-khand text-[10px] font-black tracking-widest text-white uppercase shrink-0">
                    APT WORLD HQ
                  </span>
                </div>
                {/* Arrow down tip */}
                <div className="w-2 h-2 bg-[#060F1E] border-r border-b border-[#E11922] transform rotate-45 mx-auto -mt-1" />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Send A Message */}
          <div className="lg:col-span-7" style={{ filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.06))' }}>
            {/* 45-degree Clipped Card Container */}
            <div
              className="bg-white border border-gray-100 p-8 sm:p-10 md:p-12"
              style={{
                clipPath: 'polygon(0 0, 92% 0, 100% 8%, 100% 100%, 0 100%)',
              }}
            >
              <div className="space-y-8">
                {/* Section Title */}
                <div className="space-y-2">
                  <h2 className="font-khand text-3xl font-black uppercase tracking-wider text-gray-900">
                    SEND A MESSAGE
                  </h2>
                  <div className="w-12 h-[3px] bg-[#E11922]" />
                </div>

                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name and Email Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="font-montserrat text-[9px] font-black tracking-wider text-gray-400 uppercase">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-[#F8F9FA] text-[#060F1E] border border-gray-200 focus:border-gray-400 focus:bg-white focus:outline-none rounded-sm px-4 py-3 text-xs font-medium placeholder-gray-400 transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-montserrat text-[9px] font-black tracking-wider text-gray-400 uppercase">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-[#F8F9FA] text-[#060F1E] border border-gray-200 focus:border-gray-400 focus:bg-white focus:outline-none rounded-sm px-4 py-3 text-xs font-medium placeholder-gray-400 transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone and Subject Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="font-montserrat text-[9px] font-black tracking-wider text-gray-400 uppercase">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 0000 000 000"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full bg-[#F8F9FA] text-[#060F1E] border border-gray-200 focus:border-gray-400 focus:bg-white focus:outline-none rounded-sm px-4 py-3 text-xs font-medium placeholder-gray-400 transition-all"
                      />
                    </div>

                    <div className="space-y-1.5 relative">
                      <label className="font-montserrat text-[9px] font-black tracking-wider text-gray-400 uppercase">
                        Subject
                      </label>
                      <select
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full bg-[#F8F9FA] text-[#060F1E] border border-gray-200 focus:border-gray-400 focus:bg-white focus:outline-none rounded-sm px-4 py-3 text-xs font-bold tracking-wide transition-all appearance-none cursor-pointer"
                      >
                        <option>General Inquiry</option>
                        <option>Franchise Partnership</option>
                        <option>Bulk Procurement</option>
                        <option>Technical Support</option>
                      </select>
                      {/* Dropdown Chevron */}
                      <svg className="w-4 h-4 text-gray-500 absolute right-4 top-9.5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-1.5">
                    <label className="font-montserrat text-[9px] font-black tracking-wider text-gray-400 uppercase">
                      Message
                    </label>
                    <textarea
                      required
                      rows="5"
                      placeholder="Describe your requirement in detail.."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-[#F8F9FA] text-[#060F1E] border border-gray-200 focus:border-gray-400 focus:bg-white focus:outline-none rounded-sm px-4 py-3 text-xs font-medium placeholder-gray-400 transition-all resize-none"
                    />
                  </div>

                  {/* Consent Checkbox */}
                  <div className="flex items-start gap-3 py-2">
                    <input
                      type="checkbox"
                      id="consent"
                      required
                      checked={form.consent}
                      onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                      className="mt-0.5 w-4 h-4 accent-[#E11922] cursor-pointer rounded-sm border-gray-300"
                    />
                    <label htmlFor="consent" className="font-montserrat text-[10px] sm:text-xs font-medium text-gray-500 select-none cursor-pointer leading-tight">
                      I consent to APT WORLD storing my data to process this inquiry.
                    </label>
                  </div>

                  {/* Angled Transmit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-[#E11922] text-white font-montserrat text-xs font-bold tracking-widest px-8 py-4 border border-transparent hover:bg-[#060F1E] hover:shadow-lg transition-all duration-300 shadow-md shadow-[#E11922]/15 uppercase"
                      style={{
                        clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0 100%)',
                        minWidth: '220px',
                      }}
                    >
                      {isSubmitting ? 'TRANSMITTING...' : 'TRANSMIT MESSAGE'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default ContactMain;
