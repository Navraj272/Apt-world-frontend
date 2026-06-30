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
    rentalEquipment: '',
    rentalLiftType: '',
    rentalPowerSource: '',
    rentalHeight: '',
    rentalDuration: '',
    rentalQuantity: '1',
  });

  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isRental = form.subject === 'Equipment Rental';

  const contactInfo = [
    {
      title: 'PRIMARY LINE',
      value: '9699429699',
      icon: (
        <svg className="w-5 h-5 text-[var(--apt-red)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
    },
    {
      title: 'SALES INQUIRIES',
      value: 'info.aptworld@gmail.com',
      icon: (
        <svg className="w-5 h-5 text-[var(--apt-red)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'HEADQUARTERS',
      value: 'INDORE, MP, INDIA',
      icon: (
        <svg className="w-5 h-5 text-[var(--apt-red)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      title: 'OPERATIONAL HOURS',
      value: 'MON-SAT: 09:00 - 19:00',
      icon: (
        <svg className="w-5 h-5 text-[var(--apt-red)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
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
      let message = `${form.subject}: ${form.message}`;
      if (isRental) {
        message = [
          `Equipment: ${form.rentalEquipment}`,
          `Lift Type: ${form.rentalLiftType}`,
          `Power Source: ${form.rentalPowerSource}`,
          `Working Height: ${form.rentalHeight}m`,
          `Rental Duration: ${form.rentalDuration}`,
          `Quantity: ${form.rentalQuantity}`,
          '',
          form.message,
        ].join('\n');
      }

      await createEnquiry({
        name: form.name,
        email: form.email,
        phone: form.phone,
        message,
        type: isRental ? 'rental' : 'general'
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
        rentalEquipment: '',
        rentalLiftType: '',
        rentalPowerSource: '',
        rentalHeight: '',
        rentalDuration: '',
        rentalQuantity: '1',
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
    <section className="bg-white py-16 sm:py-24 text-[var(--apt-navy)]">
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Reach Out To Us */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-2">
              <h2 className="font-khand text-3xl sm:text-4xl font-black uppercase tracking-wider text-[#1a1a1a]">
                REACH OUT TO US
              </h2>
              <div className="w-16 h-[3px] bg-[var(--apt-red)]" />
            </div>

            {/* Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-gray-100 p-4 rounded-sm flex items-center gap-5 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-[var(--apt-navy)] rounded-sm flex items-center justify-center shrink-0 shadow-md">
                    {info.icon}
                  </div>
                  <div className="space-y-1">
                    <span className="font-montserrat text-[9px] sm:text-[10px] font-black tracking-widest text-gray-400 block">
                      {info.title}
                    </span>
                    <span className="font-khand text-lg sm:text-xl font-bold tracking-wide text-[var(--apt-navy)] block uppercase">
                      {info.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Industrial Background Card */}
            <div className="relative w-full aspect-[4/3] bg-[var(--apt-navy)] rounded-2xl overflow-hidden shadow-inner group flex items-center justify-center">
              <div className="absolute inset-0 z-0">
                <img
                  src="/assets/png/hero_industrial_bg.png"
                  alt=""
                  className="w-full h-full object-cover object-center opacity-20 grayscale select-none pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--apt-navy)] via-[var(--apt-navy)]/60 to-[var(--apt-navy)]/90" />
              </div>
              <div className="relative z-10 text-center px-6 space-y-4">
                <div className="inline-block bg-[var(--apt-red)] px-3 py-1 rounded-sm">
                  <span className="font-montserrat text-[9px] font-black tracking-widest text-white uppercase">HEADQUARTERS</span>
                </div>
                <p className="font-khand text-2xl sm:text-3xl font-bold text-white uppercase tracking-wide">
                  INDORE, MP, INDIA
                </p>
                <p className="font-montserrat text-[10px] sm:text-xs text-gray-400 font-medium max-w-[250px] mx-auto">
                  Serving industrial excellence across India since 1999
                </p>
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
                  <h2 className="font-khand text-3xl font-black uppercase tracking-wider text-[#1a1a1a]">
                    SEND A MESSAGE
                  </h2>
                  <div className="w-12 h-[3px] bg-[var(--apt-red)]" />
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
                        className="w-full bg-[var(--apt-offwhite)] text-[var(--apt-navy)] border border-gray-200 focus:border-gray-400 focus:bg-white focus:outline-none rounded-xl px-4 py-3 text-xs font-montserrat font-medium placeholder-gray-400 transition-all"
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
                        className="w-full bg-[var(--apt-offwhite)] text-[var(--apt-navy)] border border-gray-200 focus:border-gray-400 focus:bg-white focus:outline-none rounded-xl px-4 py-3 text-xs font-montserrat font-medium placeholder-gray-400 transition-all"
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
                        className="w-full bg-[var(--apt-offwhite)] text-[var(--apt-navy)] border border-gray-200 focus:border-gray-400 focus:bg-white focus:outline-none rounded-xl px-4 py-3 text-xs font-montserrat font-medium placeholder-gray-400 transition-all"
                      />
                    </div>

                    <div className="space-y-1.5 relative">
                      <label className="font-montserrat text-[9px] font-black tracking-wider text-gray-400 uppercase">
                        Subject
                      </label>
                      <select
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full bg-[var(--apt-offwhite)] text-[var(--apt-navy)] border border-gray-200 focus:border-gray-400 focus:bg-white focus:outline-none rounded-xl px-4 py-3 text-xs font-montserrat font-bold tracking-wide transition-all appearance-none cursor-pointer"
                      >
                        <option>General Inquiry</option>
                        <option>Equipment Rental</option>
                        <option>Franchise Partnership</option>
                        <option>Bulk Procurement</option>
                        <option>Technical Support</option>
                      </select>
                      {/* Dropdown Chevron */}
                      <svg className="w-4 h-4 text-gray-500 absolute right-4 top-[2.375rem] pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* Rental-specific fields */}
                  {isRental && (
                    <div className="space-y-4 p-4 bg-[var(--apt-offwhite)] rounded-sm border border-gray-200">
                      <p className="font-montserrat text-[9px] font-black tracking-wider text-[var(--apt-red)] uppercase">
                        Rental Requirements
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="font-montserrat text-[8px] font-bold tracking-wider text-gray-500 uppercase">Equipment Type</label>
                          <select value={form.rentalEquipment} onChange={(e) => setForm({ ...form, rentalEquipment: e.target.value })}
                            className="w-full bg-white text-[var(--apt-navy)] border border-gray-200 focus:border-gray-400 focus:outline-none rounded-xl px-3 py-2.5 text-xs font-montserrat font-semibold transition-all appearance-none cursor-pointer">
                            <option value="">Select Equipment</option>
                            <option>Boom Lift</option>
                            <option>Scissor Lift</option>
                            <option>Vertical Mast Lift</option>
                            <option>Spider Lift</option>
                            <option>Mast Climber</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="font-montserrat text-[8px] font-bold tracking-wider text-gray-500 uppercase">Lift Type</label>
                          <select value={form.rentalLiftType} onChange={(e) => setForm({ ...form, rentalLiftType: e.target.value })}
                            className="w-full bg-white text-[var(--apt-navy)] border border-gray-200 focus:border-gray-400 focus:outline-none rounded-xl px-3 py-2.5 text-xs font-montserrat font-semibold transition-all appearance-none cursor-pointer">
                            <option value="">Select Lift Type</option>
                            <option>Telescopic</option>
                            <option>Articulated</option>
                            <option>Scissor</option>
                            <option>Vertical Mast</option>
                            <option>Spider (Tracked)</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="font-montserrat text-[8px] font-bold tracking-wider text-gray-500 uppercase">Power Source</label>
                          <select value={form.rentalPowerSource} onChange={(e) => setForm({ ...form, rentalPowerSource: e.target.value })}
                            className="w-full bg-white text-[var(--apt-navy)] border border-gray-200 focus:border-gray-400 focus:outline-none rounded-xl px-3 py-2.5 text-xs font-montserrat font-semibold transition-all appearance-none cursor-pointer">
                            <option value="">Select Power Source</option>
                            <option>Diesel</option>
                            <option>Electric</option>
                            <option>Bi-Energy (Diesel / Electric)</option>
                            <option>AC / Diesel</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="font-montserrat text-[8px] font-bold tracking-wider text-gray-500 uppercase">Working Height (m)</label>
                          <input type="number" min="1" placeholder="e.g. 26" value={form.rentalHeight} onChange={(e) => setForm({ ...form, rentalHeight: e.target.value })}
                            className="w-full bg-white text-[var(--apt-navy)] border border-gray-200 focus:border-gray-400 focus:outline-none rounded-xl px-3 py-2.5 text-xs font-montserrat font-semibold transition-all placeholder-gray-400" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="font-montserrat text-[8px] font-bold tracking-wider text-gray-500 uppercase">Rental Duration</label>
                          <select value={form.rentalDuration} onChange={(e) => setForm({ ...form, rentalDuration: e.target.value })}
                            className="w-full bg-white text-[var(--apt-navy)] border border-gray-200 focus:border-gray-400 focus:outline-none rounded-xl px-3 py-2.5 text-xs font-montserrat font-semibold transition-all appearance-none cursor-pointer">
                            <option value="">Select Duration</option>
                            <option>Daily</option>
                            <option>Weekly</option>
                            <option>Monthly</option>
                            <option>Quarterly</option>
                            <option>Yearly</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="font-montserrat text-[8px] font-bold tracking-wider text-gray-500 uppercase">Quantity</label>
                          <input type="number" min="1" placeholder="1" value={form.rentalQuantity} onChange={(e) => setForm({ ...form, rentalQuantity: e.target.value })}
                            className="w-full bg-white text-[var(--apt-navy)] border border-gray-200 focus:border-gray-400 focus:outline-none rounded-xl px-3 py-2.5 text-xs font-montserrat font-semibold transition-all placeholder-gray-400" />
                        </div>
                      </div>
                    </div>
                  )}

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
                      className="w-full bg-[var(--apt-offwhite)] text-[var(--apt-navy)] border border-gray-200 focus:border-gray-400 focus:bg-white focus:outline-none rounded-xl px-4 py-3 text-xs font-montserrat font-medium placeholder-gray-400 transition-all resize-none"
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
                      className="mt-0.5 w-4 h-4 accent-[var(--apt-red)] cursor-pointer rounded-xl border-gray-300"
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
                      className="bg-[var(--apt-red)] text-white font-montserrat text-xs font-bold tracking-widest px-8 py-4 border border-transparent hover:bg-[var(--apt-navy)] hover:shadow-lg transition-all duration-300 shadow-md shadow-[var(--apt-red)]/15 uppercase"
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
