import React, { useState, useEffect, useCallback } from 'react';
import {
  getAllFranchiseLocations,
  getFranchiseLocationCities,
  getAllCategories,
  getAllSubcategories,
} from '@/services/getRequests';
import { createFranchiseProductEnquiry } from '@/services/postRequest';
import { INDIAN_STATES } from '@/constants/indianStates';

const inputClass = 'w-full bg-[var(--apt-offwhite)] text-[var(--apt-navy)] border border-gray-200 focus:border-gray-400 focus:bg-white focus:outline-none rounded-xl px-4 py-3.5 text-xs font-medium placeholder-gray-400 transition-all';
const labelClass = 'font-montserrat text-[10px] font-black tracking-wider text-gray-400 uppercase';

function FranchiseLocator() {
  // Listing + filters
  const [filterState, setFilterState] = useState('');
  const [filterCities, setFilterCities] = useState([]);
  const [filterCity, setFilterCity] = useState('');
  const [franchises, setFranchises] = useState([]);
  const [franchisesLoading, setFranchisesLoading] = useState(true);

  // Enquiry flow (entered by clicking "Enquire for Product" on a card)
  const [selectedFranchise, setSelectedFranchise] = useState(null);
  const [step, setStep] = useState(1); // 1 = your details, 2 = product enquiry

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [subcategoryId, setSubcategoryId] = useState('');

  const [message, setMessage] = useState('');
  const [photos, setPhotos] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const fetchFranchises = useCallback(async () => {
    setFranchisesLoading(true);
    try {
      const params = { isActive: true, limit: 100 };
      if (filterState) params.state = filterState;
      if (filterCity) params.city = filterCity;
      const res = await getAllFranchiseLocations(params);
      setFranchises(res?.franchiseLocations || []);
    } catch {
      setFranchises([]);
    } finally {
      setFranchisesLoading(false);
    }
  }, [filterState, filterCity]);

  useEffect(() => {
    fetchFranchises();
  }, [fetchFranchises]);

  useEffect(() => {
    if (!filterState) {
      setFilterCities([]);
      setFilterCity('');
      return;
    }
    setFilterCity('');
    getFranchiseLocationCities(filterState)
      .then((res) => setFilterCities(res?.cities || []))
      .catch(() => setFilterCities([]));
  }, [filterState]);

  useEffect(() => {
    getAllCategories({ limit: 100 })
      .then((res) => setCategories(res?.categories || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!categoryId) {
      setSubcategories([]);
      setSubcategoryId('');
      return;
    }
    setSubcategoryId('');
    getAllSubcategories({ categoryId, limit: 100 })
      .then((res) => setSubcategories(res?.subcategories || []))
      .catch(() => {});
  }, [categoryId]);

  const resetEnquiryForm = () => {
    setStep(1);
    setName('');
    setEmail('');
    setPhone('');
    setCategoryId('');
    setSubcategoryId('');
    setMessage('');
    setPhotos([]);
    setSubmitted(false);
    setSubmitError('');
  };

  const openEnquiry = (franchise) => {
    resetEnquiryForm();
    setSelectedFranchise(franchise);
  };

  const closeEnquiry = () => {
    setSelectedFranchise(null);
  };

  const step1Valid = name.trim() && email.trim() && phone.trim();

  const handleStep1Submit = (e) => {
    e.preventDefault();
    if (!step1Valid) return;
    setStep(2);
  };

  const handlePhotoChange = (e) => {
    const incoming = Array.from(e.target.files);
    setPhotos((prev) => [...prev, ...incoming].slice(0, 5));
    e.target.value = '';
  };

  const removePhoto = (idx) => {
    setPhotos((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedFranchise) return;
    setSubmitting(true);
    setSubmitError('');
    try {
      const categoryName = categories.find((c) => String(c.id) === String(categoryId))?.name?.en;
      const subcategoryName = subcategories.find((s) => String(s.id) === String(subcategoryId))?.name?.en;
      let finalMessage = message.trim();
      if (categoryName || subcategoryName) {
        const tagLine = [categoryName && `Category: ${categoryName}`, subcategoryName && `Subcategory: ${subcategoryName}`]
          .filter(Boolean)
          .join(' | ');
        finalMessage = `${tagLine}\n\n${finalMessage}`;
      }

      const formData = new FormData();
      formData.append('name', name.trim());
      formData.append('email', email.trim());
      formData.append('phone', phone.trim());
      formData.append('type', 'franchise_product');
      formData.append('franchiseLocationId', selectedFranchise.id);
      formData.append('message', finalMessage);
      photos.forEach((file) => formData.append('images', file));

      await createFranchiseProductEnquiry(formData);
      setSubmitted(true);
    } catch {
      setSubmitError('Something went wrong submitting your enquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // ---------- Enquiry panel (shown after clicking "Enquire for Product") ----------
  if (selectedFranchise) {
    if (submitted) {
      return (
        <div className="w-full min-h-screen bg-[var(--apt-offwhite)] text-[var(--apt-navy)] pt-32 pb-24 font-montserrat flex items-center justify-center px-4">
          <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-10 sm:p-14 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="font-khand text-3xl font-extrabold uppercase tracking-tight text-[var(--apt-navy)]">Enquiry Sent</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Thank you, {name}. Your product enquiry has been sent to the <strong className="text-[var(--apt-navy)]">{selectedFranchise.city}, {selectedFranchise.state}</strong> franchise as well as the APT World head office. They will reach out to you shortly.
            </p>
            <button
              onClick={closeEnquiry}
              className="inline-block font-montserrat text-xs font-bold tracking-widest text-white bg-[var(--apt-red)] px-8 py-3.5 rounded-xl hover:bg-[var(--apt-navy)] transition-all duration-300 uppercase"
            >
              Back to Franchise List
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full min-h-screen bg-[var(--apt-offwhite)] text-[var(--apt-navy)] pt-28 pb-20 font-montserrat">
        <div className="max-w-[700px] mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={closeEnquiry}
            className="font-montserrat text-[10px] font-bold tracking-widest text-gray-500 hover:text-[var(--apt-red)] uppercase mb-6 flex items-center gap-1.5"
          >
            ← Back to Franchise List
          </button>

          <div className="bg-white border border-gray-100 shadow-xl rounded-2xl overflow-hidden border-t-[5px] border-t-[var(--apt-red)] p-8 sm:p-12">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center font-khand text-xs font-bold ${step === 1 ? 'bg-[var(--apt-red)] text-white' : 'bg-[var(--apt-navy)] text-white'}`}>
                {step > 1 ? '✓' : 1}
              </div>
              <div className={`w-10 h-[2px] ${step > 1 ? 'bg-[var(--apt-navy)]' : 'bg-gray-200'}`} />
              <div className={`w-7 h-7 rounded-full flex items-center justify-center font-khand text-xs font-bold ${step === 2 ? 'bg-[var(--apt-red)] text-white' : 'bg-gray-200 text-gray-500'}`}>
                2
              </div>
            </div>
            <p className="text-xs text-gray-400 mb-8">
              Enquiring at <strong className="text-[var(--apt-red)]">{selectedFranchise.city}, {selectedFranchise.state}</strong>
            </p>

            {step === 1 && (
              <form onSubmit={handleStep1Submit} className="space-y-6">
                <h2 className="font-khand text-2xl sm:text-3xl font-extrabold uppercase tracking-tight">Your Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className={labelClass}>Full Name *</label>
                    <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className={inputClass} />
                  </div>
                  <div className="space-y-1.5">
                    <label className={labelClass}>Phone Number *</label>
                    <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="1234567890" className={inputClass} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className={labelClass}>Email Address *</label>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" className={inputClass} />
                </div>
                <button
                  type="submit"
                  disabled={!step1Valid}
                  className="w-full bg-[var(--apt-red)] text-white font-montserrat text-xs sm:text-sm font-bold tracking-widest py-3.5 rounded-xl border border-transparent hover:bg-[var(--apt-navy)] transition-all duration-300 shadow-md shadow-[var(--apt-red)]/15 uppercase disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-khand text-2xl sm:text-3xl font-extrabold uppercase tracking-tight">Product Enquiry</h2>
                  <button type="button" onClick={() => setStep(1)} className="font-montserrat text-[10px] font-bold tracking-widest text-gray-500 hover:text-[var(--apt-red)] uppercase shrink-0">
                    ← Edit Details
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5 relative">
                    <label className={labelClass}>Category (optional)</label>
                    <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className={`${inputClass} appearance-none cursor-pointer font-bold`}>
                      <option value="">Not Necessary</option>
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.name?.en || c.slug}</option>
                      ))}
                    </select>
                    <svg className="w-4 h-4 text-gray-500 absolute right-4 top-10 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <div className="space-y-1.5 relative">
                    <label className={labelClass}>Subcategory (optional)</label>
                    <select disabled={!categoryId} value={subcategoryId} onChange={(e) => setSubcategoryId(e.target.value)} className={`${inputClass} appearance-none cursor-pointer font-bold disabled:opacity-50 disabled:cursor-not-allowed`}>
                      <option value="">{categoryId ? 'Not Necessary' : 'Select category first'}</option>
                      {subcategories.map((s) => (
                        <option key={s.id} value={s.id}>{s.name?.en || s.slug}</option>
                      ))}
                    </select>
                    <svg className="w-4 h-4 text-gray-500 absolute right-4 top-10 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className={labelClass}>What product do you need? *</label>
                  <textarea
                    required
                    rows="5"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe the product you're looking for and what it will be used for..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className={labelClass}>Photos (optional, up to 5)</label>
                  <p className="text-[10px] text-gray-400 mb-2">Add photos of the product or its intended use to help the franchise understand your requirement.</p>
                  <div className="flex flex-wrap gap-3">
                    {photos.map((file, idx) => (
                      <div key={idx} className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-200 group">
                        <img src={URL.createObjectURL(file)} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removePhoto(idx)}
                          className="absolute top-1 right-1 w-5 h-5 bg-black/60 hover:bg-[var(--apt-red)] rounded-full flex items-center justify-center text-white transition-colors"
                        >
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                    {photos.length < 5 && (
                      <label className="w-20 h-20 rounded-xl border-2 border-dashed border-gray-300 hover:border-[var(--apt-red)]/50 flex items-center justify-center cursor-pointer transition-colors">
                        <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        <input type="file" accept="image/*" multiple onChange={handlePhotoChange} className="hidden" />
                      </label>
                    )}
                  </div>
                </div>

                {submitError && (
                  <p className="text-xs text-red-600 font-medium bg-red-50 border border-red-100 rounded-xl px-4 py-3">{submitError}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting || !message.trim()}
                  className="w-full bg-[var(--apt-red)] text-white font-montserrat text-xs sm:text-sm font-bold tracking-widest py-3.5 rounded-xl border border-transparent hover:bg-[var(--apt-navy)] transition-all duration-300 shadow-md shadow-[var(--apt-red)]/15 uppercase disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Sending Enquiry...' : 'Send Enquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ---------- Listing view (default) ----------
  return (
    <div className="w-full min-h-screen bg-[var(--apt-offwhite)] text-[var(--apt-navy)] pt-24 font-montserrat">
      {/* Hero */}
      <section className="relative bg-[var(--apt-navy)] text-white py-14 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none select-none">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="locator-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#locator-grid)" />
          </svg>
        </div>
        <div className="relative z-10 max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="font-montserrat text-xs font-black tracking-[0.25em] text-[var(--apt-red)] uppercase block">
            FIND YOUR NEAREST PARTNER
          </span>
          <h1 className="font-khand text-4xl sm:text-6xl font-black uppercase tracking-tight leading-none">
            FRANCHISE <span className="text-[var(--apt-red)]">LOCATOR</span>
          </h1>
          <p className="font-montserrat text-sm text-gray-300 max-w-[600px] mx-auto leading-relaxed">
            Browse our franchise network and send a product enquiry directly to your nearest partner.
          </p>
        </div>
      </section>

      <section className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Filter bar */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 sm:p-6 mb-10 flex flex-col sm:flex-row items-stretch sm:items-end gap-4">
          <div className="flex-1 space-y-1.5 relative">
            <label className={labelClass}>State</label>
            <select value={filterState} onChange={(e) => setFilterState(e.target.value)} className={`${inputClass} appearance-none cursor-pointer font-bold`}>
              <option value="">All States</option>
              {INDIAN_STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <svg className="w-4 h-4 text-gray-500 absolute right-4 top-10 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div className="flex-1 space-y-1.5 relative">
            <label className={labelClass}>City</label>
            <select disabled={!filterState} value={filterCity} onChange={(e) => setFilterCity(e.target.value)} className={`${inputClass} appearance-none cursor-pointer font-bold disabled:opacity-50 disabled:cursor-not-allowed`}>
              <option value="">{filterState ? 'All Cities' : 'Select state first'}</option>
              {filterCities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <svg className="w-4 h-4 text-gray-500 absolute right-4 top-10 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          {(filterState || filterCity) && (
            <button
              onClick={() => { setFilterState(''); setFilterCity(''); }}
              className="font-montserrat text-[10px] font-bold tracking-widest text-gray-500 hover:text-[var(--apt-red)] uppercase shrink-0 px-2 py-3.5"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Franchise grid */}
        {franchisesLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse h-36" />
            ))}
          </div>
        ) : franchises.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {franchises.map((f) => (
              <div key={f.id} className="bg-white rounded-2xl border border-gray-100 hover:border-[var(--apt-red)]/30 hover:shadow-lg p-6 transition-all duration-300 flex flex-col">
                <h3 className="font-khand text-lg font-bold uppercase tracking-wide text-[var(--apt-navy)] mb-2">
                  {f.city}, {f.state}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-3 flex-1">{f.address}</p>
                {f.contactName && <p className="text-[11px] font-bold text-gray-700 mb-0.5">{f.contactName}</p>}
                <p className="text-[11px] text-gray-400 mb-4">{f.phone}</p>
                <button
                  onClick={() => openEnquiry(f)}
                  className="w-full font-montserrat text-[10px] font-bold tracking-widest text-white bg-[var(--apt-red)] hover:bg-[var(--apt-navy)] px-4 py-3 rounded-xl transition-all duration-300 uppercase"
                >
                  Enquire for Product
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center space-y-4">
            <svg className="w-10 h-10 text-gray-300 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h3 className="font-khand text-xl font-bold uppercase tracking-wide text-gray-700">No Franchise Found</h3>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              {filterState || filterCity
                ? 'We have no partner matching this filter yet. Try a different state/city or contact our head office directly.'
                : 'We are still expanding our franchise network. Check back soon or contact our head office.'}
            </p>
            <a href="/contact" className="inline-block font-montserrat text-xs font-bold tracking-widest text-white bg-[var(--apt-navy)] px-6 py-3 rounded-xl hover:bg-[var(--apt-red)] transition-all duration-300 uppercase">
              Contact Head Office
            </a>
          </div>
        )}
      </section>
    </div>
  );
}

export default FranchiseLocator;
