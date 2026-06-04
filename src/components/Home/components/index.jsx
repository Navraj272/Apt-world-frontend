import React from 'react';
import HeroSection from './HeroSection';
import CatalogueSection from './CatalogueSection';
import WhyChooseUsSection from './WhyChooseUsSection';
import TimelineSection from './TimelineSection';
import ReadyToEquipSection from './ReadyToEquipSection';

function HomePage() {
  return (
    <div className="w-full min-h-screen bg-white">
      <HeroSection />
      <CatalogueSection />
      <WhyChooseUsSection />
      <TimelineSection />
      <ReadyToEquipSection />
    </div>
  );
}

export default HomePage;

