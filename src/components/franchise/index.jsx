import React, { useState } from 'react';
import { franchiseData } from './data/franchiseData';
import FranchiseHero from './components/FranchiseHero';
import FranchiseWhyPartner from './components/FranchiseWhyPartner';
import FranchiseModels from './components/FranchiseModels';
import FranchiseWhoLookingFor from './components/FranchiseWhoLookingFor';
import FranchiseInquiryForm from './components/FranchiseInquiryForm';
import FranchiseModal from './components/FranchiseModal';

function Franchise() {
  const [selectedModel, setSelectedModel] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectModel = (modelId) => {
    setSelectedModel(modelId);
    setIsModalOpen(true);
  };

  return (
    <div id="franchise" className="w-full bg-white overflow-hidden">
      {/* 1. Hero Header Section */}
      <FranchiseHero data={franchiseData.hero} />

      {/* 2. Why Partner With Us Grid Section */}
      <FranchiseWhyPartner data={franchiseData.whyPartner} />

      {/* 3. Choose Your Model Grid Section */}
      <FranchiseModels 
        data={franchiseData.models} 
        onSelectModel={handleSelectModel}
      />

      {/* 4. Target Partner Profiles & Shake Hand Image Section */}
      <FranchiseWhoLookingFor data={franchiseData.targetAudience} />

      {/* 5. Franchise inquiry form Section */}
      <FranchiseInquiryForm 
        data={franchiseData.inquiryForm} 
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
      />

      {/* 6. Popup Modal with Inquiry Form */}
      <FranchiseModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setSelectedModel('');
        }}
      >
        <FranchiseInquiryForm 
          data={franchiseData.inquiryForm} 
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          isModal={true}
          onSuccess={() => {
            setIsModalOpen(false);
            setSelectedModel('');
          }}
        />
      </FranchiseModal>
    </div>
  );
}

export default Franchise;
