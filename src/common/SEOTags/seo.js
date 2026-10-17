export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://aptworld.in').replace(/\/$/, '');
export const SITE_NAME = 'APT WORLD';
export const DEFAULT_DESCRIPTION =
  'APT WORLD supplies industrial tools, material handling equipment, welding machines and aerial work platform rentals across India, with a franchise network and on-site technical support.';
export const DEFAULT_IMAGE = '/assets/png/products/rotary_hammer.png';

// Static page metadata, keyed by Next.js pathname. Pages with data (products, categories) set pageProps.seo instead.
export const STATIC_SEO = {
  '/': {
    title: 'APT WORLD | Industrial Tools, Material Handling & Welding Equipment in India',
    description: DEFAULT_DESCRIPTION,
  },
  '/products': {
    title: 'Industrial Equipment & Tools - Products | APT WORLD',
    description:
      'Browse APT WORLD products: material handling equipment, welding machines, hoists, winches and industrial tools. Enquire online for specifications and pricing.',
  },
  '/rental': {
    title: 'Equipment Rental - Boom Lifts, Scissor Lifts & More | APT WORLD',
    description:
      'Rent boom lifts, scissor lifts, vertical mast lifts, spider lifts and mast climbers across India. Short-term and long-term aerial work platform rental from APT WORLD.',
  },
  '/franchise': {
    title: 'Become an APT WORLD Franchise Partner',
    description:
      'Partner with APT WORLD for industrial supply, bulk procurement and on-site technical support. Learn how to become a franchise partner.',
  },
  '/franchise/locator': {
    title: 'Franchise Locator | APT WORLD',
    description: 'Find an APT WORLD franchise location near you for industrial tools and equipment support.',
  },
  '/about-us': {
    title: 'About APT WORLD | Industrial Excellence Since 1989',
    description:
      'For over two decades APT WORLD has bridged global industrial innovation and local execution, serving manufacturing, construction and infrastructure clients in India.',
  },
  '/contact': {
    title: 'Contact APT WORLD | Enquiries & Support',
    description: 'Contact APT WORLD for product enquiries, rental requirements, franchise opportunities and technical support.',
  },
  '/admin': { title: 'Admin | APT WORLD', description: 'Admin', noindex: true },
};

export const absoluteUrl = (value) => {
  if (!value) return '';
  if (/^https?:\/\//i.test(value)) return value;
  if (value.startsWith('/uploads/')) return `${(process.env.NEXT_PUBLIC_BASE_URL || '').replace(/\/$/, '')}${value}`;
  return `${SITE_URL}${value.startsWith('/') ? '' : '/'}${value}`;
};

export const slugify = (text) =>
  (text || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

export const nameOf = (obj) => {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  return obj.en || obj.EN || '';
};

export const truncate = (text, max = 158) => {
  const clean = (text || '').replace(/\s+/g, ' ').trim();
  return clean.length > max ? `${clean.slice(0, max - 1).trimEnd()}…` : clean;
};

// Server-side API read for getServerSideProps; never throws, gives up after a few seconds
export async function apiGet(path, timeoutMs = 8000) {
  const base = (process.env.NEXT_PUBLIC_BASE_URL || '').replace(/\/$/, '');
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(`${base}/api/v1${path}`, { signal: controller.signal });
    if (!res.ok) return null;
    const json = await res.json();
    return json && json.data ? json.data : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}
