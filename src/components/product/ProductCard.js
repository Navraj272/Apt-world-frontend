import React from 'react';

const slugify = (text) => {
  if (!text) return '';
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
};

const getName = (obj) => {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  return obj.en || obj.EN || '';
};

const getProductImage = (product) => {
  if (product.images && product.images.length > 0) return product.images[0];
  if (product.thumbnail) return product.thumbnail;
  return '/assets/png/products/rotary_hammer.png';
};

const NEW_BADGE_DAYS = 14;
const isNew = (product) =>
  product.createdAt && Date.now() - new Date(product.createdAt).getTime() < NEW_BADGE_DAYS * 24 * 60 * 60 * 1000;

/**
 * Product tile used on the All Products and category pages.
 * The image fills the whole card; the details sit on a translucent glass panel
 * at the bottom so the product stays visible behind the text.
 */
export default function ProductCard({ product }) {
  const productName = getName(product.name);
  const label = getName(product.subcategory?.name) || getName(product.category?.name);
  const href = `/products/${slugify(productName || product.baseCode)}/${product.id}`;

  return (
    <a
      href={href}
      className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100 border border-gray-200 shadow-[0_2px_14px_rgba(6,15,30,0.08)] hover:shadow-2xl hover:border-[var(--apt-red)]/40 transition-all duration-300"
    >
      <img
        src={getProductImage(product)}
        alt={productName}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
      />

      {product.isFavourite && (
        <span className="absolute top-3 left-3 z-10 flex items-center gap-1 rounded-full bg-white/80 backdrop-blur-md px-2.5 py-1 shadow-sm">
          <svg className="w-3.5 h-3.5 text-amber-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M11.48 3.5a.56.56 0 011.04 0l2.13 5.11a.56.56 0 00.48.35l5.52.44c.5.04.7.66.32.99l-4.2 3.6a.56.56 0 00-.18.56l1.28 5.39a.56.56 0 01-.84.61l-4.73-2.89a.56.56 0 00-.59 0l-4.73 2.89a.56.56 0 01-.84-.61l1.28-5.39a.56.56 0 00-.18-.56l-4.2-3.6a.56.56 0 01.32-.99l5.52-.44a.56.56 0 00.48-.35l2.13-5.11z" />
          </svg>
          <span className="font-montserrat text-[9px] font-black tracking-widest text-[var(--apt-navy)] uppercase">Featured</span>
        </span>
      )}

      {isNew(product) && (
        <span className="absolute top-3 right-3 z-10 rounded-full bg-[var(--apt-red)] px-2.5 py-1 font-montserrat text-[9px] font-black tracking-widest text-white uppercase shadow-sm">
          New
        </span>
      )}

      <div className="absolute inset-x-3 bottom-3 z-10 rounded-xl border border-white/60 bg-white/65 backdrop-blur-md px-4 py-3 shadow-[0_4px_20px_rgba(6,15,30,0.12)] group-hover:bg-white/80 transition-colors duration-300">
        {label && (
          <span className="font-montserrat text-[9px] font-black tracking-widest text-[#404040] uppercase block truncate">
            {label}
          </span>
        )}
        <h3 className="font-khand text-lg sm:text-xl font-bold tracking-wide text-[#1a1a1a] group-hover:text-[var(--apt-red)] transition-colors duration-300 leading-tight uppercase line-clamp-2">
          {productName}
        </h3>
        <div className="mt-2 flex items-center justify-between gap-3">
          <span className="font-mono text-[10px] text-gray-600 tracking-wider truncate">{product.baseCode}</span>
          <span className="shrink-0 bg-[var(--apt-navy)] text-white font-montserrat text-[9px] font-bold tracking-widest px-3.5 py-2 rounded-lg group-hover:bg-[var(--apt-red)] transition-colors duration-300 uppercase">
            Enquire
          </span>
        </div>
      </div>
    </a>
  );
}
