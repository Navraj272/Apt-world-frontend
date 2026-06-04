import React, { useState } from 'react';
import { franchiseData } from './data/franchiseData';
import FranchiseHero from './components/FranchiseHero';
import FranchiseWhyPartner from './components/FranchiseWhyPartner';
import FranchiseWhoLookingFor from './components/FranchiseWhoLookingFor';
import FranchiseInquiryForm from './components/FranchiseInquiryForm';

function Franchise() {
  const [selectedModel, setSelectedModel] = useState('');

  return (
    <div id="franchise" className="w-full bg-white overflow-hidden">
      {/* 1. Hero Header Section */}
      <FranchiseHero data={franchiseData.hero} />

      {/* 2. Why Partner With Us Grid Section */}
      <FranchiseWhyPartner data={franchiseData.whyPartner} />

      {/* 3. Target Partner Profiles & Shake Hand Image Section */}
      <FranchiseWhoLookingFor data={franchiseData.targetAudience} />

      {/* 4. Franchise inquiry form Section */}
      <FranchiseInquiryForm 
        data={franchiseData.inquiryForm} 
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
      />
    </div>
  );
}

export default Franchise;
