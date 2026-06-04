import React from 'react';
import ContactHero from './ContactHero';
import ContactMain from './ContactMain';
import BottomBanner from './BottomBanner';

function ContactPage() {
  return (
    <div className="w-full min-h-screen bg-white">
      <ContactHero />
      <ContactMain />
      <BottomBanner />
    </div>
  );
}

export default ContactPage;
