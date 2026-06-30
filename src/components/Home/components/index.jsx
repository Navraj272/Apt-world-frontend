import React from 'react';
import HeroSection from './HeroSection';
import CatalogueSection from './CatalogueSection';
import WhyChooseUsSection from './WhyChooseUsSection';
import TimelineSection from './TimelineSection';
import TrustedClientsSection from './TrustedClientsSection';
import ReadyToEquipSection from './ReadyToEquipSection';

function HomePage() {
  return (
    <div className="w-full min-h-screen bg-[var(--apt-offwhite)]">
      <HeroSection />
      <CatalogueSection />
      <WhyChooseUsSection />
      <TimelineSection />
      <TrustedClientsSection />
      <ReadyToEquipSection />
    </div>
  );
}

export default HomePage;

