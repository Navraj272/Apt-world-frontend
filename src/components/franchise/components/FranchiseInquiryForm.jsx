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
        <h2 className="font-khand text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-[var(--apt-navy)] leading-none">
          {title}
        </h2>
        <p className="font-montserrat text-xs sm:text-sm text-gray-500 font-medium">
          {subtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="block font-montserrat text-[10px] font-bold tracking-wider text-gray-500 uppercase mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              required
              placeholder="John Doe"
              value={form.fullName}
              onChange={handleChange}
              className="w-full bg-white text-[var(--apt-navy)] border border-[#dfd9ce] focus:border-[var(--apt-red)] focus:ring-1 focus:ring-[var(--apt-red)] focus:outline-none rounded-xl px-4 py-3 text-xs font-montserrat font-medium placeholder-gray-400 transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block font-montserrat text-[10px] font-bold tracking-wider text-gray-500 uppercase mb-1.5">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phoneNumber"
              required
              placeholder="1234567890"
              value={form.phoneNumber}
              onChange={handleChange}
              className="w-full bg-white text-[var(--apt-navy)] border border-[#dfd9ce] focus:border-[var(--apt-red)] focus:ring-1 focus:ring-[var(--apt-red)] focus:outline-none rounded-xl px-4 py-3 text-xs font-montserrat font-medium placeholder-gray-400 transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="block font-montserrat text-[10px] font-bold tracking-wider text-gray-500 uppercase mb-1.5">
              Email Address *
            </label>
            <input
              type="email"
              name="emailAddress"
              required
              placeholder="john@example.com"
              value={form.emailAddress}
              onChange={handleChange}
              className="w-full bg-white text-[var(--apt-navy)] border border-[#dfd9ce] focus:border-[var(--apt-red)] focus:ring-1 focus:ring-[var(--apt-red)] focus:outline-none rounded-xl px-4 py-3 text-xs font-montserrat font-medium placeholder-gray-400 transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block font-montserrat text-[10px] font-bold tracking-wider text-gray-500 uppercase mb-1.5">
              City of Interest *
            </label>
            <input
              type="text"
              name="cityOfInterest"
              required
              placeholder="Enter City Name"
              value={form.cityOfInterest}
              onChange={handleChange}
              className="w-full bg-white text-[var(--apt-navy)] border border-[#dfd9ce] focus:border-[var(--apt-red)] focus:ring-1 focus:ring-[var(--apt-red)] focus:outline-none rounded-xl px-4 py-3 text-xs font-montserrat font-medium placeholder-gray-400 transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
            />
          </div>
        </div>

        <div className="space-y-1.5 relative">
          <label className="block font-montserrat text-[10px] font-bold tracking-wider text-gray-500 uppercase mb-1.5">
            Anticipated Model *
          </label>
          <select
            name="anticipatedModel"
            required
            value={form.anticipatedModel}
            onChange={handleChange}
            className="w-full bg-white text-[var(--apt-navy)] border border-[#dfd9ce] focus:border-[var(--apt-red)] focus:ring-1 focus:ring-[var(--apt-red)] focus:outline-none rounded-xl px-4 py-3 text-xs font-montserrat font-bold tracking-wide transition-all appearance-none cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
          >
            {modelOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <svg className="w-4 h-4 text-gray-500 absolute right-4 top-[2.35rem] pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        <div className="space-y-1.5">
          <label className="block font-montserrat text-[10px] font-bold tracking-wider text-gray-500 uppercase mb-1.5">
            Commercial Space / Experience
          </label>
          <textarea
            name="experience"
            rows="4"
            placeholder="Briefly describe your background, business experience, or available commercial properties..."
            value={form.experience}
            onChange={handleChange}
            className="w-full bg-white text-[var(--apt-navy)] border border-[#dfd9ce] focus:border-[var(--apt-red)] focus:ring-1 focus:ring-[var(--apt-red)] focus:outline-none rounded-xl px-4 py-3 text-xs font-montserrat font-medium placeholder-gray-400 transition-all resize-none shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
          />
        </div>

        <div className="flex items-start gap-3 py-2 cursor-pointer select-none">
          <input
            type="checkbox"
            name="agreeTerms"
            id="agreeTerms"
            required
            checked={form.agreeTerms}
            onChange={handleChange}
            className="mt-0.5 w-4 h-4 rounded border-[#dfd9ce] text-[var(--apt-red)] focus:ring-[var(--apt-red)] accent-[var(--apt-red)] cursor-pointer"
          />
          <label htmlFor="agreeTerms" className="font-montserrat text-[10px] sm:text-xs font-medium text-gray-500 cursor-pointer leading-tight">
            I agree to the terms and privacy policy for franchise evaluation.
          </label>
        </div>

        <div className="pt-2 flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto min-w-[220px] bg-[var(--apt-red)] text-white font-montserrat text-xs font-bold tracking-widest py-3.5 px-8 rounded-xl border border-transparent hover:bg-[var(--apt-navy)] hover:shadow-lg hover:shadow-[var(--apt-red)]/15 active:scale-[0.98] transition-all duration-300 uppercase"
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
