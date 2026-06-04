// Content configuration for Franchise page sections to keep it dynamic and modular.
// This structure can easily be replaced by an API fetch later on.

export const franchiseData = {
  hero: {
    badge: 'GLOBAL FRANCHISE PROGRAM',
    title: 'BUILD YOUR INDUSTRIAL EMPIRE',
    description: 'Join APT WORLD, the leader in heavy industrial equipment since 1999. Leverage our proven business model, robust supply chain, and cutting-edge tech platform.',
    primaryBtn: {
      text: 'INQUIRE NOW',
      targetId: 'franchise-inquiry-form'
    },
    secondaryBtn: {
      text: 'VIEW MODELS',
      targetId: 'franchise-models'
    }
  },
  
  whyPartner: {
    title: 'WHY PARTNER WITH US?',
    items: [
      {
        id: 'products',
        title: 'FAST MOVING PRODUCTS',
        description: 'High-demand industrial inventory with rapid turnover rates and established market presence.',
        icon: 'box'
      },
      {
        id: 'margins',
        title: 'SUPERIOR MARGINS',
        description: 'Unlockable profit structures engineered for sustainable growth and ROI within 18-24 months.',
        icon: 'money'
      },
      {
        id: 'marketing',
        title: 'MARKETING SUPPORT',
        description: 'National brand visibility and localized lead-generation campaigns managed by our experts.',
        icon: 'megaphone'
      },
      {
        id: 'ram',
        title: 'DEDICATED RAM',
        description: 'A personal Key Account Manager to guide your operational excellence and solve daily hurdles.',
        icon: 'manager'
      },
      {
        id: 'tech',
        title: 'TECH PLATFORM',
        description: 'Real-time inventory, CRM, and logistics tracking through our proprietary industrial OS.',
        icon: 'tech'
      },
      {
        id: 'brand',
        title: 'PROVEN BRAND',
        description: 'Operate under the APT WORLD banner - trusted by 150000+ industries worldwide.',
        icon: 'shield'
      }
    ]
  },
  
  models: {
    title: 'CHOOSE YOUR MODEL',
    subtitle: 'Strategic investment options tailored for your growth ambitions.',
    items: [
      {
        id: 'silver',
        name: 'SILVER PARTNER',
        level: 'DISTRICT LEVEL',
        investment: '10L*',
        features: [
          'Exclusive District Rights',
          '250+ Product SKUs',
          'Basic Tech Integration',
          'Shared Marketing Pool'
        ],
        buttonText: 'SELECT SILVER',
        isPopular: false,
        theme: 'dark' // Slate/dark blue card
      },
      {
        id: 'platinum',
        name: 'PLATINUM ELITE',
        level: 'REGIONAL LEVEL',
        investment: '20L*',
        features: [
          'Full Regional Monopoly',
          '1000+ Premium SKUs',
          'Custom White-labeled Portal',
          'Dedicated Logistics',
          'On-site Training Team'
        ],
        buttonText: 'GO PLATINUM',
        isPopular: true,
        theme: 'red' // Red card
      }
    ]
  },
  
  targetAudience: {
    title: 'WHO ARE WE LOOKING FOR?',
    items: [
      {
        id: 'dealers',
        title: 'EXISTING TOOL DEALERS',
        description: 'Expand your footprint under a premium global brand and automated inventory.',
        icon: 'dealers'
      },
      {
        id: 'professionals',
        title: 'INDUSTRIAL PROFESSIONALS',
        description: 'Engineers or site managers wanting to transition into the business world.',
        icon: 'hardhat'
      },
      {
        id: 'owners',
        title: 'COMMERCIAL REAL ESTATE OWNERS',
        description: 'Convert your prime commercial space into a high-yielding APT distribution hub.',
        icon: 'building'
      }
    ],
    image: '/assets/png/business_handshake.png'
  },
  
  inquiryForm: {
    title: 'FRANCHISE INQUIRY FORM',
    subtitle: 'Our expansion team will contact you within 24 business hours.',
    modelOptions: [
      { value: '', label: 'Select a Model' },
      { value: 'silver', label: 'Silver Partner - 10L*' },
      { value: 'platinum', label: 'Platinum Elite - 20L*' }
    ]
  }
};
