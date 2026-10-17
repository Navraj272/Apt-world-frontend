import React from 'react';
import ProductCard from '@/components/product/ProductCard';
import { equipmentData, RENTAL_CATEGORY_SLUG } from './data/equipmentData';

export const isRentalCategory = (slug) => slug === RENTAL_CATEGORY_SLUG;

// Rental items rendered with the same card as products; each opens its own rental page
export default function RentalCards() {
  return equipmentData.map((eq) => (
    <ProductCard
      key={`rental-${eq.slug}`}
      product={{ id: `rental-${eq.slug}`, name: { en: eq.title }, images: [eq.image], category: { name: { en: 'Aerial Work Platforms' } } }}
      href={`/rental/${eq.slug}`}
      tag="For Rental"
      footerText="Available for rent"
      ctaLabel="View details"
    />
  ));
}
