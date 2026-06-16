import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { productsData } from '@/components/product/components/productsData';
import { categoriesProducts } from '@/common/categoriesData';
import { useToast } from '@/hooks/use-toast';

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { toast } = useToast();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Enquiry form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;

    // 1. Check in static inventory productsData
    let found = productsData.find((item) => String(item.id) === String(id));

    // 2. Check in static categoriesProducts mapping
    if (!found) {
      for (const catId of Object.keys(categoriesProducts)) {
        const matched = categoriesProducts[catId].find(
          (item) => String(item.id) === String(id)
        );
        if (matched) {
          found = {
            ...matched,
            price: matched.price || 32500,
            subcategory: matched.category || 'POWER TOOLS',
            category: 'POWER TOOLS',
          };
          break;
        }
      }
    }

    if (found) {
      setProduct(found);

      // Initialize enquiry message
      setFormData((prev) => ({
        ...prev,
        message: `Dear APT Sales team, I am interested in ${found.title} (SKU: ${found.sku}). Please send me technical sheets and price details.`,
      }));
    } else {
      setProduct(null);
    }
    setLoading(false);
  }, [id, toast]);

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#F8F9FA] flex items-center justify-center pt-24 font-montserrat">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#E11922] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">
            LOADING PRODUCT...
          </span>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center pt-24 font-montserrat text-[#060F1E]">
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
          className="mt-6 font-montserrat text-xs font-bold tracking-widest bg-[#E11922] text-white px-6 py-3 rounded-sm hover:bg-black transition-colors duration-300"
        >
          BACK TO INVENTORY
        </Link>
      </div>
    );
  }

  // Specifications builder
  const getSpecs = () => {
    const cat = (product.category || product.subcategory || '').toUpperCase();
    const title = product.title.toUpperCase();

    if (cat.includes('DRILL') || title.includes('DRILL')) {
      return [
        {
          label: '0-350/1350',
          sub: 'rpm',
          icon: (
            <svg
              className="w-6 h-6 text-[#E11922]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ),
        },
        {
          label: '18+1',
          sub: 'Setting',
          icon: (
            <svg
              className="w-6 h-6 text-[#E11922]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          ),
        },
        {
          label: '10 mm',
          sub: 'chuck',
          icon: (
            <svg
              className="w-6 h-6 text-[#E11922]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a7 7 0 10-14 0v2m7-7v2"
              />
            </svg>
          ),
        },
        {
          label: 'electric',
          sub: 'brake',
          icon: (
            <svg
              className="w-6 h-6 text-[#E11922]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          ),
        },
        {
          label: 'LED',
          sub: 'light',
          icon: (
            <svg
              className="w-6 h-6 text-[#E11922]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          ),
        },
        {
          label: 'TYPE-C',
          sub: 'charge',
          icon: (
            <svg
              className="w-6 h-6 text-[#E11922]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect
                x="5"
                y="8"
                width="14"
                height="8"
                rx="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6" />
            </svg>
          ),
        },
      ];
    }

    if (cat.includes('WELD') || title.includes('WELD')) {
      return [
        {
          label: '20-250A',
          sub: 'output',
          icon: (
            <svg
              className="w-6 h-6 text-[#E11922]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          ),
        },
        {
          label: '60%',
          sub: 'duty cycle',
          icon: (
            <svg
              className="w-6 h-6 text-[#E11922]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ),
        },
        {
          label: '220V±15%',
          sub: 'voltage',
          icon: (
            <svg
              className="w-6 h-6 text-[#E11922]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14M12 3v10"
              />
            </svg>
          ),
        },
        {
          label: 'IGBT',
          sub: 'inverter',
          icon: (
            <svg
              className="w-6 h-6 text-[#E11922]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 5h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2z"
              />
            </svg>
          ),
        },
        {
          label: 'CLASS F',
          sub: 'insulation',
          icon: (
            <svg
              className="w-6 h-6 text-[#E11922]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          ),
        },
        {
          label: '85%',
          sub: 'efficiency',
          icon: (
            <svg
              className="w-6 h-6 text-[#E11922]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          ),
        },
      ];
    }

    if (cat.includes('HAMMER') || title.includes('HAMMER')) {
      return [
        {
          label: '0-1200',
          sub: 'rpm',
          icon: (
            <svg
              className="w-6 h-6 text-[#E11922]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ),
        },
        {
          label: '0-4800',
          sub: 'bpm',
          icon: (
            <svg
              className="w-6 h-6 text-[#E11922]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          ),
        },
        {
          label: 'SDS-PLUS',
          sub: 'chuck',
          icon: (
            <svg
              className="w-6 h-6 text-[#E11922]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a7 7 0 10-14 0v2m7-7v2"
              />
            </svg>
          ),
        },
        {
          label: '3-mode',
          sub: 'selector',
          icon: (
            <svg
              className="w-6 h-6 text-[#E11922]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
            </svg>
          ),
        },
        {
          label: 'LED',
          sub: 'light',
          icon: (
            <svg
              className="w-6 h-6 text-[#E11922]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          ),
        },
        {
          label: 'safety',
          sub: 'clutch',
          icon: (
            <svg
              className="w-6 h-6 text-[#E11922]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          ),
        },
      ];
    }

    // Generic fallback specifications
    return [
      {
        label: 'Industrial',
        sub: 'grade',
        icon: (
          <svg
            className="w-6 h-6 text-[#E11922]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        ),
      },
      {
        label: '1 Year',
        sub: 'warranty',
        icon: (
          <svg
            className="w-6 h-6 text-[#E11922]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        ),
      },
      {
        label: 'Heavy Duty',
        sub: 'build',
        icon: (
          <svg
            className="w-6 h-6 text-[#E11922]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"
            />
          </svg>
        ),
      },
      {
        label: 'ISO Certified',
        sub: 'standards',
        icon: (
          <svg
            className="w-6 h-6 text-[#E11922]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            />
          </svg>
        ),
      },
      {
        label: 'Ergonomic',
        sub: 'handle',
        icon: (
          <svg
            className="w-6 h-6 text-[#E11922]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
            />
          </svg>
        ),
      },
      {
        label: 'High Efficiency',
        sub: 'motor',
        icon: (
          <svg
            className="w-6 h-6 text-[#E11922]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
          </svg>
        ),
      },
    ];
  };

  const handleEnquirySubmit = (e) => {
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
    // Simulate submission delay
    setTimeout(() => {
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
      setSubmitting(false);
    }, 600);
  };

  return (
    <div className="w-full min-h-screen bg-[#F8F9FA] text-[#060F1E] pt-32 pb-24 font-montserrat">
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 tracking-wider mb-8 uppercase">
          <Link href="/" className="hover:text-[#E11922] transition-colors">
            HOME
          </Link>
          <span>/</span>
          <Link
            href="/products"
            className="hover:text-[#E11922] transition-colors"
          >
            PRODUCTS
          </Link>
          <span>/</span>
          <span className="text-gray-800">
            {product.subcategory || product.category}
          </span>
        </div>

        {/* Product Info Block (Two columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Image Box */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative aspect-square w-full bg-white border border-gray-100 rounded-sm shadow-sm overflow-hidden flex items-center justify-center p-8 sm:p-12 hover:shadow-md transition-shadow duration-300">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-full max-w-full object-contain animate-fade-in"
              />

              {product.badge && (
                <div
                  className="absolute top-4 left-4 px-3 py-1 rounded-sm text-[9px] font-black tracking-widest text-white shadow-sm"
                  style={{
                    backgroundColor:
                      product.badgeType === 'success'
                        ? '#10B981'
                        : product.badgeType === 'warning'
                          ? '#F59E0B'
                          : '#E11922',
                  }}
                >
                  {product.badge}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="font-montserrat text-xs sm:text-sm font-black tracking-[0.2em] text-[#E11922] uppercase block mb-2">
                {product.subcategory || product.category}
              </span>
              <h1 className="font-khand text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-gray-900 leading-none">
                {product.title}
              </h1>
              <span className="font-mono text-xs sm:text-sm text-gray-400 font-bold tracking-widest block mt-3 uppercase">
                SKU: {product.sku}
              </span>
            </div>

            {/* Price (if present) */}
            {product.price && (
              <div className="pb-4 border-b border-gray-200">
                <span className="font-montserrat text-[10px] font-bold text-gray-400 tracking-wider uppercase block">
                  PRICE PER UNIT
                </span>
                <span className="font-outfit text-3xl font-black text-[#E11922] tracking-tight block mt-1">
                  {new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                    maximumFractionDigits: 2,
                  }).format(product.price)}
                </span>
              </div>
            )}

            {/* Tech Specifications Red-Outline Boxes Grid (matches screenshot) */}
            <div className="space-y-4">
              <h3 className="font-montserrat text-[10px] font-bold text-gray-400 tracking-wider uppercase">
                TECHNICAL SPECIFICATIONS
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {getSpecs().map((spec, i) => (
                  <div
                    key={i}
                    className="aspect-square flex flex-col justify-center items-center p-3 border border-red-500/20 hover:border-red-500/60 rounded-sm bg-white transition-all duration-300 shadow-sm"
                  >
                    <div className="mb-2 shrink-0">{spec.icon}</div>
                    <span className="font-outfit text-xs font-black text-gray-800 text-center uppercase tracking-tight leading-none block">
                      {spec.label}
                    </span>
                    <span className="font-montserrat text-[8px] sm:text-[9px] font-bold text-gray-400 text-center uppercase tracking-wide block mt-1">
                      {spec.sub}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Help desk details (matches screenshot) */}
            <div className="bg-gray-50 border border-gray-200 rounded-sm p-5 space-y-2">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="font-montserrat text-xs font-bold text-gray-700 tracking-wide uppercase">
                  Need Help?
                </span>
              </div>
              <p className="font-montserrat text-xs font-semibold text-gray-600">
                Email:{' '}
                <a
                  href="mailto:info@apt-international.com"
                  className="text-[#E11922] hover:underline font-bold"
                >
                  info@apt-international.com
                </a>
              </p>
              <p className="font-montserrat text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Support Hours: Monday - Friday 9:00 - 17:00
              </p>
            </div>

            {/* Enquire CTA Action */}
            <div className="pt-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto font-montserrat text-xs font-bold tracking-widest text-white bg-[#060F1E] hover:bg-[#E11922] px-10 py-4.5 rounded-sm transition-all duration-300 shadow-lg shadow-[#060F1E]/10 uppercase"
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
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#060F1E]/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal Content */}
          <div className="relative w-full max-w-md bg-white border border-gray-200 rounded-sm shadow-2xl overflow-hidden p-6 sm:p-8 z-10 animate-scale-up text-left">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <h3 className="font-khand text-2xl font-black tracking-wide text-gray-900 uppercase">
                SEND PRODUCT ENQUIRY
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-black transition-colors"
                aria-label="Close modal"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleEnquirySubmit} className="space-y-4">
              <div>
                <label className="block font-montserrat text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full bg-[#F8F9FA] text-gray-900 border border-gray-200 focus:border-gray-400 focus:outline-none rounded-sm px-4 py-2.5 text-xs font-semibold placeholder-gray-400 transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block font-montserrat text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="w-full bg-[#F8F9FA] text-gray-900 border border-gray-200 focus:border-gray-400 focus:outline-none rounded-sm px-4 py-2.5 text-xs font-semibold placeholder-gray-400 transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block font-montserrat text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  className="w-full bg-[#F8F9FA] text-gray-900 border border-gray-200 focus:border-gray-400 focus:outline-none rounded-sm px-4 py-2.5 text-xs font-semibold placeholder-gray-400 transition-colors"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div>
                <label className="block font-montserrat text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Message Details
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                  className="w-full bg-[#F8F9FA] text-gray-900 border border-gray-200 focus:border-gray-400 focus:outline-none rounded-sm px-4 py-2.5 text-xs font-semibold placeholder-gray-400 transition-colors resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="font-montserrat text-[10px] font-bold tracking-widest text-gray-500 hover:text-black px-5 py-3 uppercase"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="font-montserrat text-[10px] font-bold tracking-widest text-white bg-[#E11922] hover:bg-black px-6 py-3 rounded-sm transition-all duration-300 disabled:opacity-50 uppercase"
                >
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
