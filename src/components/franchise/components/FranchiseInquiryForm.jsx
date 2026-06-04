import React, { useState, useEffect } from 'react';

function FranchiseInquiryForm({ data, selectedModel, setSelectedModel }) {
  const { title, subtitle, modelOptions } = data;

  const [form, setForm] = useState({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    cityOfInterest: '',
    anticipatedModel: '',
    experience: '',
    agreeTerms: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync selectedModel from props when user selects from models cards
  useEffect(() => {
    if (selectedModel) {
      setForm((prev) => ({ ...prev, anticipatedModel: selectedModel }));
    }
  }, [selectedModel]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // If changing the model dropdown manually, sync back to parent
    if (name === 'anticipatedModel' && setSelectedModel) {
      setSelectedModel(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.agreeTerms) {
      alert('Please agree to the terms and privacy policy to submit.');
      return;
    }
    
    setIsSubmitting(true);

    // Mock API Submission - Easily replaceable with standard fetch/axios call
    setTimeout(() => {
      alert(
        `Application Submitted Successfully!\n\nThank you, ${form.fullName}. Our franchise expansion team will contact you in ${form.cityOfInterest} within 24 business hours.\nReference ID: APT-FRAN-${Math.floor(
          100000 + Math.random() * 900000
        )}`
      );

      // Reset form
      setForm({
        fullName: '',
        phoneNumber: '',
        emailAddress: '',
        cityOfInterest: '',
        anticipatedModel: '',
        experience: '',
        agreeTerms: false
      });
      
      if (setSelectedModel) {
        setSelectedModel('');
      }
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="franchise-inquiry-form" className="bg-white py-16 sm:py-24 text-[#050D1A]">
      <div className="max-w-[850px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Form Container Card */}
        <div className="bg-white border border-gray-100 shadow-2xl rounded-sm overflow-hidden border-t-[5px] border-t-[#E11922] p-8 sm:p-12">
          
          {/* Header */}
          <div className="text-center space-y-2 mb-10">
            <h2 className="font-khand text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-gray-900 leading-none">
              {title}
            </h2>
            <p className="font-montserrat text-xs sm:text-sm text-gray-500 font-medium">
              {subtitle}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Full Name & Phone Number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="font-montserrat text-[9px] font-black tracking-wider text-gray-400 uppercase">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="John Doe"
                  value={form.fullName}
                  onChange={handleChange}
                  className="w-full bg-[#F8F9FA] text-[#050D1A] border border-gray-200 focus:border-gray-400 focus:bg-white focus:outline-none rounded-sm px-4 py-3.5 text-xs font-medium placeholder-gray-400 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-montserrat text-[9px] font-black tracking-wider text-gray-400 uppercase">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  required
                  placeholder="+1234567890"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  className="w-full bg-[#F8F9FA] text-[#050D1A] border border-gray-200 focus:border-gray-400 focus:bg-white focus:outline-none rounded-sm px-4 py-3.5 text-xs font-medium placeholder-gray-400 transition-all"
                />
              </div>
            </div>

            {/* Email Address & City of Interest */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="font-montserrat text-[9px] font-black tracking-wider text-gray-400 uppercase">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="emailAddress"
                  required
                  placeholder="john@example.com"
                  value={form.emailAddress}
                  onChange={handleChange}
                  className="w-full bg-[#F8F9FA] text-[#050D1A] border border-gray-200 focus:border-gray-400 focus:bg-white focus:outline-none rounded-sm px-4 py-3.5 text-xs font-medium placeholder-gray-400 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-montserrat text-[9px] font-black tracking-wider text-gray-400 uppercase">
                  City of Interest *
                </label>
                <input
                  type="text"
                  name="cityOfInterest"
                  required
                  placeholder="Enter City Name"
                  value={form.cityOfInterest}
                  onChange={handleChange}
                  className="w-full bg-[#F8F9FA] text-[#050D1A] border border-gray-200 focus:border-gray-400 focus:bg-white focus:outline-none rounded-sm px-4 py-3.5 text-xs font-medium placeholder-gray-400 transition-all"
                />
              </div>
            </div>

            {/* Anticipated Model Dropdown */}
            <div className="space-y-1.5 relative">
              <label className="font-montserrat text-[9px] font-black tracking-wider text-gray-400 uppercase">
                Anticipated Model *
              </label>
              <select
                name="anticipatedModel"
                required
                value={form.anticipatedModel}
                onChange={handleChange}
                className="w-full bg-[#F8F9FA] text-[#050D1A] border border-gray-200 focus:border-gray-400 focus:bg-white focus:outline-none rounded-sm px-4 py-3.5 text-xs font-bold tracking-wide transition-all appearance-none cursor-pointer"
              >
                {modelOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {/* Dropdown Chevron */}
              <svg className="w-4 h-4 text-gray-500 absolute right-4 top-10 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Commercial Space / Experience Textarea */}
            <div className="space-y-1.5">
              <label className="font-montserrat text-[9px] font-black tracking-wider text-gray-400 uppercase">
                Commercial Space / Experience
              </label>
              <textarea
                name="experience"
                rows="4"
                placeholder="Briefly describe your background, business experience, or available commercial properties..."
                value={form.experience}
                onChange={handleChange}
                className="w-full bg-[#F8F9FA] text-[#050D1A] border border-gray-200 focus:border-gray-400 focus:bg-white focus:outline-none rounded-sm px-4 py-3.5 text-xs font-medium placeholder-gray-400 transition-all resize-none"
              />
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="flex items-start gap-3 py-2">
              <input
                type="checkbox"
                name="agreeTerms"
                id="agreeTerms"
                required
                checked={form.agreeTerms}
                onChange={handleChange}
                className="mt-0.5 w-4 h-4 accent-[#E11922] cursor-pointer rounded-sm border-gray-300"
              />
              <label htmlFor="agreeTerms" className="font-montserrat text-[10px] sm:text-xs font-medium text-gray-500 select-none cursor-pointer leading-tight">
                I agree to the terms and privacy policy for franchise evaluation.
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#E11922] text-white font-montserrat text-xs sm:text-sm font-bold tracking-widest py-4.5 rounded-sm border border-transparent hover:bg-[#050D1A] hover:shadow-2xl transition-all duration-300 shadow-md shadow-[#E11922]/15 uppercase"
              >
                {isSubmitting ? 'SUBMITTING APPLICATION...' : 'SUBMIT APPLICATION'}
              </button>
            </div>

          </form>

        </div>
      </div>
    </section>
  );
}

export default FranchiseInquiryForm;
