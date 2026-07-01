/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { createEnquiry, createFranchiseProductEnquiry } from '@/services/postRequest';
import { getAllFranchiseLocations, getAllCategories, getAllSubcategories } from '@/services/getRequests';
import { useToast } from '@/hooks/use-toast';
import { INDIAN_STATES } from '@/constants/indianStates';

const fieldClass = 'w-full bg-[var(--apt-offwhite)] text-[var(--apt-navy)] border border-gray-200 focus:border-gray-400 focus:bg-white focus:outline-none rounded-xl px-4 py-3 text-xs font-montserrat font-medium placeholder-gray-400 transition-all';
const smallFieldClass = 'w-full bg-white text-[var(--apt-navy)] border border-gray-200 focus:border-gray-400 focus:outline-none rounded-xl px-3 py-2.5 text-xs font-montserrat font-semibold transition-all';
const labelClass = 'font-montserrat text-[9px] font-black tracking-wider text-gray-400 uppercase';
const smallLabelClass = 'font-montserrat text-[8px] font-bold tracking-wider text-gray-500 uppercase';

function ContactMain() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Product Enquiry',
    message: '',
    consent: false,
    // Rental fields
    rentalEquipment: '',
    rentalLiftType: '',
    rentalPowerSource: '',
    rentalHeight: '',
    rentalSwl: '',
    rentalState: '',
    rentalCity: '',
    rentalDuration: '',
    rentalQuantity: '1',
  });

  // Product enquiry fields
  const [productCity, setProductCity] = useState('');
  const [nearbyFranchises, setNearbyFranchises] = useState([]);
  const [nearbyFranchisesLoading, setNearbyFranchisesLoading] = useState(false);
  const [selectedFranchiseId, setSelectedFranchiseId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [productCategoryId, setProductCategoryId] = useState('');
  const [productSubcategoryId, setProductSubcategoryId] = useState('');
  const [productPhotos, setProductPhotos] = useState([]);

  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isRental = form.subject === 'Equipment Rental';
  const isProductEnquiry = form.subject === 'Product Enquiry';

  useEffect(() => {
    getAllCategories({ limit: 100 })
      .then((res) => setCategories(res?.categories || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!productCategoryId) {
      setSubcategories([]);
      setProductSubcategoryId('');
      return;
    }
    setProductSubcategoryId('');
    getAllSubcategories({ categoryId: productCategoryId, limit: 100 })
      .then((res) => setSubcategories(res?.subcategories || []))
      .catch(() => {});
  }, [productCategoryId]);

  useEffect(() => {
    if (!isProductEnquiry || productCity.trim().length < 3) {
      setNearbyFranchises([]);
      setSelectedFranchiseId(null);
      return;
    }
    const timer = setTimeout(async () => {
      setNearbyFranchisesLoading(true);
      try {
        const res = await getAllFranchiseLocations({ city: productCity.trim(), isActive: true, limit: 10 });
        setNearbyFranchises(res?.franchiseLocations || []);
      } catch {
        setNearbyFranchises([]);
      } finally {
        setNearbyFranchisesLoading(false);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [productCity, isProductEnquiry]);

  const handlePhotoChange = (e) => {
    const incoming = Array.from(e.target.files);
    setProductPhotos((prev) => [...prev, ...incoming].slice(0, 5));
    e.target.value = '';
  };

  const removePhoto = (idx) => {
    setProductPhotos((prev) => prev.filter((_, i) => i !== idx));
  };

  const resetForm = () => {
    setForm({
      name: '',
      email: '',
      phone: '',
      subject: 'Product Enquiry',
      message: '',
      consent: false,
      rentalEquipment: '',
      rentalLiftType: '',
      rentalPowerSource: '',
      rentalHeight: '',
      rentalSwl: '',
      rentalState: '',
      rentalCity: '',
      rentalDuration: '',
      rentalQuantity: '1',
    });
    setProductCity('');
    setNearbyFranchises([]);
    setSelectedFranchiseId(null);
    setProductCategoryId('');
    setProductSubcategoryId('');
    setProductPhotos([]);
  };

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
      if (isProductEnquiry) {
        const categoryName = categories.find((c) => String(c.id) === String(productCategoryId))?.name?.en;
        const subcategoryName = subcategories.find((s) => String(s.id) === String(productSubcategoryId))?.name?.en;
        let finalMessage = form.message;
        const tags = [
          productCity.trim() && `City: ${productCity.trim()}`,
          categoryName && `Category: ${categoryName}`,
          subcategoryName && `Subcategory: ${subcategoryName}`,
        ].filter(Boolean);
        if (tags.length) finalMessage = `${tags.join(' | ')}\n\n${finalMessage}`;

        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('email', form.email);
        formData.append('phone', form.phone);
        formData.append('type', 'franchise_product');
        if (selectedFranchiseId) formData.append('franchiseLocationId', selectedFranchiseId);
        formData.append('message', finalMessage);
        productPhotos.forEach((file) => formData.append('images', file));

        await createFranchiseProductEnquiry(formData);
      } else {
        let message = `${form.subject}: ${form.message}`;
        if (isRental) {
          message = [
            `Equipment: ${form.rentalEquipment}`,
            `Lift Type: ${form.rentalLiftType}`,
            `Power Source: ${form.rentalPowerSource}`,
            `Working Height: ${form.rentalHeight}m`,
            `Safe Working Load: ${form.rentalSwl}kg`,
            `State: ${form.rentalState}`,
            `City: ${form.rentalCity}`,
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
          type: isRental ? 'rental' : 'general',
        });
      }

      toast({
        title: 'Message Sent',
        description: isProductEnquiry && selectedFranchiseId
          ? 'Your product enquiry has been sent to the selected franchise and our head office.'
          : 'Your inquiry has been successfully transmitted.',
      });

      resetForm();
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
              <p className="font-montserrat text-xs sm:text-sm text-gray-500 leading-relaxed max-w-[420px]">
                Whether you need bulk procurement, equipment on rent, or have a question about a product — our team typically responds within one business day. Find our full contact details at the top of this page.
              </p>
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
                      <label className={labelClass}>Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={fieldClass}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className={labelClass}>Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={fieldClass}
                      />
                    </div>
                  </div>

                  {/* Phone and Subject Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className={labelClass}>Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 0000 000 000"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className={fieldClass}
                      />
                    </div>

                    <div className="space-y-1.5 relative">
                      <label className={labelClass}>Subject</label>
                      <select
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className={`${fieldClass} font-bold tracking-wide appearance-none cursor-pointer`}
                      >
                        <option>Product Enquiry</option>
                        <option>Equipment Rental</option>
                        <option>Bulk Procurement</option>
                      </select>
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
                          <label className={smallLabelClass}>Equipment Type</label>
                          <select value={form.rentalEquipment} onChange={(e) => setForm({ ...form, rentalEquipment: e.target.value })} className={`${smallFieldClass} appearance-none cursor-pointer`}>
                            <option value="">Select Equipment</option>
                            <option>Boom Lift</option>
                            <option>Scissor Lift</option>
                            <option>Vertical Mast Lift</option>
                            <option>Spider Lift</option>
                            <option>Mast Climber</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className={smallLabelClass}>Lift Type</label>
                          <select value={form.rentalLiftType} onChange={(e) => setForm({ ...form, rentalLiftType: e.target.value })} className={`${smallFieldClass} appearance-none cursor-pointer`}>
                            <option value="">Select Lift Type</option>
                            <option>Telescopic</option>
                            <option>Articulated</option>
                            <option>Scissor</option>
                            <option>Vertical Mast</option>
                            <option>Spider (Tracked)</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className={smallLabelClass}>Power Source</label>
                          <select value={form.rentalPowerSource} onChange={(e) => setForm({ ...form, rentalPowerSource: e.target.value })} className={`${smallFieldClass} appearance-none cursor-pointer`}>
                            <option value="">Select Power Source</option>
                            <option>Diesel</option>
                            <option>Electric</option>
                            <option>Bi-Energy (Diesel / Electric)</option>
                            <option>AC / Diesel</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className={smallLabelClass}>Working Height (m)</label>
                          <input type="number" min="1" placeholder="e.g. 26" value={form.rentalHeight} onChange={(e) => setForm({ ...form, rentalHeight: e.target.value })} className={`${smallFieldClass} placeholder-gray-400`} />
                        </div>
                        <div className="space-y-1.5">
                          <label className={smallLabelClass}>Safe Working Load (kg)</label>
                          <input type="number" min="1" placeholder="e.g. 230" value={form.rentalSwl} onChange={(e) => setForm({ ...form, rentalSwl: e.target.value })} className={`${smallFieldClass} placeholder-gray-400`} />
                        </div>
                        <div className="space-y-1.5">
                          <label className={smallLabelClass}>Rental Duration</label>
                          <select value={form.rentalDuration} onChange={(e) => setForm({ ...form, rentalDuration: e.target.value })} className={`${smallFieldClass} appearance-none cursor-pointer`}>
                            <option value="">Select Duration</option>
                            <option>Daily</option>
                            <option>Weekly</option>
                            <option>Monthly</option>
                            <option>Quarterly</option>
                            <option>Yearly</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className={smallLabelClass}>State</label>
                          <select value={form.rentalState} onChange={(e) => setForm({ ...form, rentalState: e.target.value })} className={`${smallFieldClass} appearance-none cursor-pointer`}>
                            <option value="">Select State</option>
                            {INDIAN_STATES.map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className={smallLabelClass}>City</label>
                          <input type="text" placeholder="e.g. Indore" value={form.rentalCity} onChange={(e) => setForm({ ...form, rentalCity: e.target.value })} className={`${smallFieldClass} placeholder-gray-400`} />
                        </div>
                        <div className="space-y-1.5">
                          <label className={smallLabelClass}>Quantity</label>
                          <input type="number" min="1" placeholder="1" value={form.rentalQuantity} onChange={(e) => setForm({ ...form, rentalQuantity: e.target.value })} className={`${smallFieldClass} placeholder-gray-400`} />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Product Enquiry-specific fields */}
                  {isProductEnquiry && (
                    <div className="space-y-4 p-4 bg-[var(--apt-offwhite)] rounded-sm border border-gray-200">
                      <p className="font-montserrat text-[9px] font-black tracking-wider text-[var(--apt-red)] uppercase">
                        Product Requirements
                      </p>

                      <div className="space-y-1.5">
                        <label className={smallLabelClass}>Your City</label>
                        <input
                          type="text"
                          placeholder="Type your city to find a nearby franchise..."
                          value={productCity}
                          onChange={(e) => setProductCity(e.target.value)}
                          className={`${smallFieldClass} placeholder-gray-400`}
                        />
                      </div>

                      {productCity.trim().length >= 3 && (
                        <div className="space-y-2">
                          <p className="text-[9px] font-bold tracking-wider text-gray-500 uppercase">Nearby Franchises</p>
                          {nearbyFranchisesLoading ? (
                            <div className="text-[11px] text-gray-400">Searching...</div>
                          ) : nearbyFranchises.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {nearbyFranchises.map((f) => (
                                <button
                                  type="button"
                                  key={f.id}
                                  onClick={() => setSelectedFranchiseId(selectedFranchiseId === f.id ? null : f.id)}
                                  className={`text-left p-3 rounded-xl border transition-all ${
                                    selectedFranchiseId === f.id
                                      ? 'border-[var(--apt-red)] bg-red-50/40'
                                      : 'border-gray-200 bg-white hover:border-gray-300'
                                  }`}
                                >
                                  <div className="font-khand text-sm font-bold uppercase text-[var(--apt-navy)]">{f.city}, {f.state}</div>
                                  <div className="text-[10px] text-gray-500 truncate">{f.address}</div>
                                  {f.contactName && <div className="text-[10px] text-gray-400">{f.contactName} &middot; {f.phone}</div>}
                                </button>
                              ))}
                            </div>
                          ) : (
                            <p className="text-[11px] text-gray-400">No franchise found nearby — your enquiry will go directly to our head office.</p>
                          )}
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className={smallLabelClass}>Category (optional)</label>
                          <select value={productCategoryId} onChange={(e) => setProductCategoryId(e.target.value)} className={`${smallFieldClass} appearance-none cursor-pointer`}>
                            <option value="">Not Necessary</option>
                            {categories.map((c) => (
                              <option key={c.id} value={c.id}>{c.name?.en || c.slug}</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className={smallLabelClass}>Subcategory (optional)</label>
                          <select disabled={!productCategoryId} value={productSubcategoryId} onChange={(e) => setProductSubcategoryId(e.target.value)} className={`${smallFieldClass} appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}>
                            <option value="">{productCategoryId ? 'Not Necessary' : 'Select category first'}</option>
                            {subcategories.map((s) => (
                              <option key={s.id} value={s.id}>{s.name?.en || s.slug}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className={smallLabelClass}>Photos (optional, up to 5)</label>
                        <p className="text-[10px] text-gray-400 mb-1">Add photos of the product or its intended use.</p>
                        <div className="flex flex-wrap gap-3">
                          {productPhotos.map((file, idx) => (
                            <div key={idx} className="relative w-16 h-16 rounded-xl overflow-hidden border border-gray-200 group">
                              <img src={URL.createObjectURL(file)} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => removePhoto(idx)}
                                className="absolute top-0.5 right-0.5 w-4 h-4 bg-black/60 hover:bg-[var(--apt-red)] rounded-full flex items-center justify-center text-white transition-colors"
                              >
                                <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          ))}
                          {productPhotos.length < 5 && (
                            <label className="w-16 h-16 rounded-xl border-2 border-dashed border-gray-300 hover:border-[var(--apt-red)]/50 flex items-center justify-center cursor-pointer transition-colors bg-white">
                              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                              </svg>
                              <input type="file" accept="image/*" multiple onChange={handlePhotoChange} className="hidden" />
                            </label>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Message Field */}
                  <div className="space-y-1.5">
                    <label className={labelClass}>
                      {isProductEnquiry ? 'What product do you need? Where will it be used?' : 'Message'}
                    </label>
                    <textarea
                      required
                      rows="5"
                      placeholder={isProductEnquiry ? 'Describe the product you are looking for and what it will be used for...' : 'Describe your requirement in detail..'}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className={`${fieldClass} resize-none`}
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
