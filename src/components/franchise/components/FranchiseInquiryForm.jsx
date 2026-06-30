import React, { useState, useEffect } from 'react';
import { createEnquiry } from '@/services/postRequest';
import { useToast } from '@/hooks/use-toast';

function FranchiseInquiryForm({ data, selectedModel, setSelectedModel, isModal = false, onSuccess }) {
  const { title, subtitle, modelOptions } = data;
  const { toast } = useToast();

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

    if (name === 'anticipatedModel' && setSelectedModel) {
      setSelectedModel(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.agreeTerms) {
      toast({
        title: 'Consent Required',
        description: 'Please agree to the terms and privacy policy to submit.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const message = `Franchise Inquiry - City: ${form.cityOfInterest}, Model: ${form.anticipatedModel}, Experience: ${form.experience}`;
      await createEnquiry({
        name: form.fullName,
        email: form.emailAddress,
        phone: form.phoneNumber,
        message,
        type: 'distributor',
      });

      toast({
        title: 'Application Submitted',
        description: `Thank you, ${form.fullName}. Our franchise expansion team will contact you in ${form.cityOfInterest} within 24 business hours.`,
      });

      setForm({
        fullName: '',
        phoneNumber: '',
        emailAddress: '',
        cityOfInterest: '',
        anticipatedModel: '',
        experience: '',
        agreeTerms: false,
      });

      if (setSelectedModel) setSelectedModel('');
      if (onSuccess) onSuccess();
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to submit application. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formContent = (
    <>
      <div className="text-center space-y-2 mb-10">
        <h2 className="font-khand text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#1a1a1a] leading-none">
          {title}
        </h2>
        <p className="font-montserrat text-xs sm:text-sm text-gray-500 font-medium">
          {subtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="font-montserrat text-[10px] font-black tracking-wider text-gray-400 uppercase">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              required
              placeholder="John Doe"
              value={form.fullName}
              onChange={handleChange}
              className="w-full bg-[var(--apt-offwhite)] text-[var(--apt-navy)] border border-gray-200 focus:border-gray-400 focus:bg-white focus:outline-none rounded-xl px-4 py-3.5 text-xs font-medium placeholder-gray-400 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-montserrat text-[10px] font-black tracking-wider text-gray-400 uppercase">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phoneNumber"
              required
              placeholder="1234567890"
              value={form.phoneNumber}
              onChange={handleChange}
              className="w-full bg-[var(--apt-offwhite)] text-[var(--apt-navy)] border border-gray-200 focus:border-gray-400 focus:bg-white focus:outline-none rounded-xl px-4 py-3.5 text-xs font-medium placeholder-gray-400 transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="font-montserrat text-[10px] font-black tracking-wider text-gray-400 uppercase">
              Email Address *
            </label>
            <input
              type="email"
              name="emailAddress"
              required
              placeholder="john@example.com"
              value={form.emailAddress}
              onChange={handleChange}
              className="w-full bg-[var(--apt-offwhite)] text-[var(--apt-navy)] border border-gray-200 focus:border-gray-400 focus:bg-white focus:outline-none rounded-xl px-4 py-3.5 text-xs font-medium placeholder-gray-400 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-montserrat text-[10px] font-black tracking-wider text-gray-400 uppercase">
              City of Interest *
            </label>
            <input
              type="text"
              name="cityOfInterest"
              required
              placeholder="Enter City Name"
              value={form.cityOfInterest}
              onChange={handleChange}
              className="w-full bg-[var(--apt-offwhite)] text-[var(--apt-navy)] border border-gray-200 focus:border-gray-400 focus:bg-white focus:outline-none rounded-xl px-4 py-3.5 text-xs font-medium placeholder-gray-400 transition-all"
            />
          </div>
        </div>

        <div className="space-y-1.5 relative">
          <label className="font-montserrat text-[10px] font-black tracking-wider text-gray-400 uppercase">
            Anticipated Model *
          </label>
          <select
            name="anticipatedModel"
            required
            value={form.anticipatedModel}
            onChange={handleChange}
            className="w-full bg-[var(--apt-offwhite)] text-[var(--apt-navy)] border border-gray-200 focus:border-gray-400 focus:bg-white focus:outline-none rounded-xl px-4 py-3.5 text-xs font-bold tracking-wide transition-all appearance-none cursor-pointer"
          >
            {modelOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <svg className="w-4 h-4 text-gray-500 absolute right-4 top-10 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        <div className="space-y-1.5">
          <label className="font-montserrat text-[10px] font-black tracking-wider text-gray-400 uppercase">
            Commercial Space / Experience
          </label>
          <textarea
            name="experience"
            rows="4"
            placeholder="Briefly describe your background, business experience, or available commercial properties..."
            value={form.experience}
            onChange={handleChange}
            className="w-full bg-[var(--apt-offwhite)] text-[var(--apt-navy)] border border-gray-200 focus:border-gray-400 focus:bg-white focus:outline-none rounded-xl px-4 py-3.5 text-xs font-medium placeholder-gray-400 transition-all resize-none"
          />
        </div>

        <div className="flex items-start gap-3 py-2">
          <input
            type="checkbox"
            name="agreeTerms"
            id="agreeTerms"
            required
            checked={form.agreeTerms}
            onChange={handleChange}
            className="mt-0.5 w-4 h-4 accent-[var(--apt-red)] cursor-pointer rounded-xl border-gray-300"
          />
          <label htmlFor="agreeTerms" className="font-montserrat text-[10px] sm:text-xs font-medium text-gray-500 select-none cursor-pointer leading-tight">
            I agree to the terms and privacy policy for franchise evaluation.
          </label>
        </div>

        <div className="pt-2 mx-auto w-full items-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-[50%] bg-[var(--apt-red)] text-white font-montserrat text-xs sm:text-sm font-bold tracking-widest py-2 rounded-sm border border-transparent hover:bg-[var(--apt-navy)] hover:shadow-2xl transition-all duration-300 shadow-md shadow-[var(--apt-red)]/15 uppercase"
          >
            {isSubmitting ? 'SUBMITTING APPLICATION...' : 'SUBMIT APPLICATION'}
          </button>
        </div>

      </form>
    </>
  );

  if (isModal) {
    return (
      <div className="bg-white text-[var(--apt-navy)]">
        {formContent}
      </div>
    );
  }

  return (
    <section id="franchise-inquiry-form" className="bg-white py-16 sm:py-24 text-[var(--apt-navy)]">
      <div className="max-w-[850px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-gray-100 shadow-2xl rounded-2xl overflow-hidden border-t-[5px] border-t-[var(--apt-red)] p-8 sm:p-12">
          {formContent}
        </div>
      </div>
    </section>
  );
}

export default FranchiseInquiryForm;
