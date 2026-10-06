import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getProduct } from '@/services/getRequests';
import { createEnquiry } from '@/services/postRequest';
import { useToast } from '@/hooks/use-toast';

const getProductName = (product) => {
  if (!product.name) return '';
  if (typeof product.name === 'string') return product.name;
  return product.name.en || product.name.EN || '';
};

const getProductImage = (product) => {
  if (product.images && product.images.length > 0) {
    return product.images[0];
  }
  if (product.thumbnail) return product.thumbnail;
  return '/assets/png/products/rotary_hammer.png';
};

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { toast } = useToast();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [enquiryType, setEnquiryType] = useState('product');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const found = await getProduct(id);
        if (found) {
          setProduct(found);
          const productName = getProductName(found);
          setFormData((prev) => ({
            ...prev,
            message: `Dear APT Sales team, I am interested in ${productName} (SKU: ${found.baseCode}). Please send me technical sheets and price details.`,
          }));
        } else {
          setProduct(null);
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch product:', err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[var(--apt-offwhite)] flex items-center justify-center pt-24 font-montserrat">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[var(--apt-red)] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">
            LOADING PRODUCT...
          </span>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full min-h-screen bg-[var(--apt-offwhite)] flex flex-col items-center justify-center pt-24 font-montserrat text-[var(--apt-navy)]">
        <svg
          className="w-16 h-16 text-gray-300 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h2 className="font-khand text-3xl font-black uppercase tracking-wider text-gray-800">
          Product Not Found
        </h2>
        <p className="text-xs text-gray-400 mt-2">
          The product you are trying to view does not exist or has been removed.
        </p>
        <Link
          href="/products"
          className="mt-6 font-montserrat text-xs font-bold tracking-widest bg-[var(--apt-red)] text-white px-6 py-3 rounded-sm hover:bg-black transition-colors duration-300"
        >
          BACK TO INVENTORY
        </Link>
      </div>
    );
  }

  const productName = getProductName(product);
  const imageUrl = getProductImage(product);
  const catName = product.category && (product.category.name?.en || product.category.name?.EN || '');
  const subName = product.subcategory && (product.subcategory.name?.en || product.subcategory.name?.EN || '');

  const specEntries = product.specs && typeof product.specs === 'object' && Object.keys(product.specs).length > 0
    ? Object.entries(product.specs)
    : [];

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      toast({
        title: 'Validation Error',
        description: 'Name, Email, and Message are required.',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);
    try {
      await createEnquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        type: enquiryType,
        productId: enquiryType === 'product' ? Number(id) : undefined,
      });

      toast({
        title: 'Enquiry Received',
        description:
          'Thank you! Your enquiry has been received and our team will get back to you soon.',
      });
      setIsModalOpen(false);
      setFormData((prev) => ({
        ...prev,
        name: '',
        email: '',
        phone: '',
      }));
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to submit enquiry. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[var(--apt-offwhite)] text-[var(--apt-navy)] pt-32 pb-24 font-montserrat">
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 tracking-wider mb-8 uppercase">
          <Link href="/" className="hover:text-[var(--apt-red)] transition-colors">
            HOME
          </Link>
          <span>/</span>
          <Link
            href="/products"
            className="hover:text-[var(--apt-red)] transition-colors"
          >
            PRODUCTS
          </Link>
          <span>/</span>
          <span className="text-gray-800">
            {subName || catName}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative aspect-square w-full bg-white border border-gray-100 rounded-sm shadow-sm overflow-hidden flex items-center justify-center p-8 sm:p-12 hover:shadow-md transition-shadow duration-300">
              <img
                src={imageUrl}
                alt={productName}
                className="max-h-full max-w-full object-contain animate-fade-in"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="font-montserrat text-xs sm:text-sm font-black tracking-[0.2em] text-[var(--apt-red)] uppercase block mb-2">
                {subName || catName}
              </span>
              <h1 className="font-khand text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#1a1a1a] leading-none">
                {productName}
              </h1>
              <span className="font-mono text-xs sm:text-sm text-gray-400 font-bold tracking-widest block mt-3 uppercase">
                SKU: {product.baseCode}
              </span>
            </div>

            <div className="pb-4 border-b border-gray-200">
              <span className="font-montserrat text-[10px] font-bold text-gray-400 tracking-wider uppercase block">
                PRICE PER UNIT
              </span>
              <span className="font-outfit text-3xl font-black text-[var(--apt-red)] tracking-tight block mt-1">
                {product.price
                  ? new Intl.NumberFormat('en-IN', {
                      style: 'currency',
                      currency: 'INR',
                      maximumFractionDigits: 0,
                    }).format(product.price)
                  : 'CONTACT FOR PRICE'}
              </span>
            </div>

            {specEntries.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-montserrat text-[10px] font-bold text-gray-400 tracking-wider uppercase">
                  TECHNICAL SPECIFICATIONS
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {specEntries.map(([key, value]) => (
                    <div
                      key={key}
                      className="flex flex-col p-3 border border-gray-200 rounded-sm bg-white shadow-sm"
                    >
                      <span className="font-montserrat text-[9px] font-bold text-gray-400 uppercase tracking-wide">
                        {key}
                      </span>
                      <span className="font-outfit text-sm font-black text-gray-800 mt-1">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-gray-50 border border-gray-200 rounded-sm p-5 space-y-2">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span className="font-montserrat text-xs font-bold text-gray-700 tracking-wide uppercase">
                  Need Help?
                </span>
              </div>
              <p className="font-montserrat text-xs font-semibold text-gray-600">
                Email:{' '}
                <a href="mailto:info.aptworld@gmail.com" className="text-[var(--apt-red)] hover:underline font-bold">
                  info.aptworld@gmail.com
                </a>
              </p>
              <p className="font-montserrat text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Support Hours: Monday - Friday 9:00 - 17:00
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto font-montserrat text-xs font-bold tracking-widest text-white bg-[var(--apt-navy)] hover:bg-[var(--apt-red)] px-10 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-[var(--apt-navy)]/10 uppercase"
              >
                ENQUIRE NOW
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enquiry Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-[var(--apt-navy)]/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />

          <div className="relative w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8 z-10 animate-scale-up text-left border-t-[5px] border-t-[var(--apt-red)]">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                <h3 className="font-khand text-2xl font-black tracking-wide text-[#1a1a1a] uppercase">
                SEND ENQUIRY
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-black transition-colors" aria-label="Close modal">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <form onSubmit={handleEnquirySubmit} className="space-y-4">
              <div>
                <label className="block font-montserrat text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Enquiry Type</label>
                <div className="relative">
                  <select
                    value={enquiryType}
                    onChange={(e) => setEnquiryType(e.target.value)}
                    className="w-full bg-white text-[var(--apt-navy)] border border-[#dfd9ce] focus:border-[var(--apt-red)] focus:ring-1 focus:ring-[var(--apt-red)] focus:outline-none rounded-xl px-4 py-3 text-xs font-montserrat font-semibold tracking-wide transition-all appearance-none cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                  >
                    <option value="product">Purchase Enquiry</option>
                    <option value="rental">Rental Enquiry</option>
                  </select>
                  <svg className="w-4 h-4 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <div>
                <label className="block font-montserrat text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Full Name</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))} className="w-full bg-white text-[var(--apt-navy)] border border-[#dfd9ce] focus:border-[var(--apt-red)] focus:ring-1 focus:ring-[var(--apt-red)] focus:outline-none rounded-xl px-4 py-3 text-xs font-montserrat font-medium placeholder-gray-400 transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)]" placeholder="John Doe" />
              </div>
              <div>
                <label className="block font-montserrat text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Email Address</label>
                <input type="email" required value={formData.email} onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))} className="w-full bg-white text-[var(--apt-navy)] border border-[#dfd9ce] focus:border-[var(--apt-red)] focus:ring-1 focus:ring-[var(--apt-red)] focus:outline-none rounded-xl px-4 py-3 text-xs font-montserrat font-medium placeholder-gray-400 transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)]" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block font-montserrat text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Phone Number (Optional)</label>
                <input type="tel" value={formData.phone} onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))} className="w-full bg-white text-[var(--apt-navy)] border border-[#dfd9ce] focus:border-[var(--apt-red)] focus:ring-1 focus:ring-[var(--apt-red)] focus:outline-none rounded-xl px-4 py-3 text-xs font-montserrat font-medium placeholder-gray-400 transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)]" placeholder="+91 XXXXX XXXXX" />
              </div>
              <div>
                <label className="block font-montserrat text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Message Details</label>
                <textarea rows={4} required value={formData.message} onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))} className="w-full bg-white text-[var(--apt-navy)] border border-[#dfd9ce] focus:border-[var(--apt-red)] focus:ring-1 focus:ring-[var(--apt-red)] focus:outline-none rounded-xl px-4 py-3 text-xs font-montserrat font-medium placeholder-gray-400 transition-all resize-none shadow-[0_1px_2px_rgba(0,0,0,0.02)]" />
              </div>
              <div className="pt-2 flex items-center justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="font-montserrat text-[10px] font-bold tracking-widest text-gray-500 hover:text-black px-5 py-3 uppercase">CANCEL</button>
                <button type="submit" disabled={submitting} className="font-montserrat text-[10px] font-bold tracking-widest text-white bg-[var(--apt-red)] hover:bg-[var(--apt-navy)] px-6 py-3.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[var(--apt-red)]/15 active:scale-[0.98] disabled:opacity-50 uppercase">
                  {submitting ? 'SENDING...' : 'SUBMIT ENQUIRY'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
