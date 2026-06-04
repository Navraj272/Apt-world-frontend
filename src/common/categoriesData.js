// Structured category data for dropdown navigation and category product pages.
// ESLint compliant with single quotes.

export const categoriesTree = [
  {
    name: 'Power Tools',
    subcategories: [
      {
        name: 'Cordless',
        items: [
          { name: 'Drill Driver', slug: 'drill-driver', id: '23' },
          { name: 'Impact Drill', slug: 'impact-drill', id: '24' },
          { name: 'Mitre Saw', slug: 'mitre-saw', id: '25' },
          { name: 'Grinders', slug: 'grinders', id: '26' },
          { name: 'Polisher', slug: 'polisher', id: '27' },
          { name: 'Mini Craft', slug: 'mini-craft', id: '28' },
          { name: 'Cut Off Saw', slug: 'cut-off-saw', id: '29' },
          { name: 'Multi Tool', slug: 'multi-tool', id: '30' },
          { name: 'Chain Saw', slug: 'chain-saw', id: '31' }
        ]
      },
      {
        name: 'Drilling',
        items: [
          { name: 'Rotary Hammer', slug: 'rotary-hammer', id: '32' },
          { name: 'Demolition Hammer', slug: 'demolition-hammer', id: '33' }
        ]
      },
      {
        name: 'Construction',
        items: [
          { name: 'Concrete Mixer', slug: 'concrete-mixer', id: '34' }
        ]
      },
      {
        name: 'Woodworking',
        items: [
          { name: 'Electric Planer', slug: 'electric-planer', id: '35' },
          { name: 'Jig Saw', slug: 'jig-saw', id: '36' }
        ]
      },
      {
        name: 'Grinders & Metalworking',
        items: [
          { name: 'Angle Grinder', slug: 'angle-grinder', id: '37' }
        ]
      },
      {
        name: 'Laser Levels',
        items: [
          { name: 'Line Laser', slug: 'line-laser', id: '38' }
        ]
      },
      {
        name: 'Other Tools',
        items: [
          { name: 'Blow Gun', slug: 'blow-gun', id: '39' }
        ]
      }
    ]
  },
  {
    name: 'Hand Tools',
    subcategories: [
      {
        name: 'Wrenches',
        items: [
          { name: 'Adjustable Wrench', slug: 'adjustable-wrench', id: '40' }
        ]
      }
    ]
  },
  {
    name: 'Measuring & Layout',
    subcategories: [
      {
        name: 'Lasers',
        items: [
          { name: 'Laser Measurer', slug: 'laser-measurer', id: '41' }
        ]
      }
    ]
  },
  {
    name: 'Accessories',
    subcategories: [
      {
        name: 'Drill Bits',
        items: [
          { name: 'Masonry Bits', slug: 'masonry-bits', id: '42' }
        ]
      }
    ]
  },
  {
    name: 'Compressors',
    subcategories: [
      {
        name: 'Piston Compressors',
        items: [
          { name: 'Reciprocating Compressor', slug: 'reciprocating-compressor', id: '43' }
        ]
      }
    ]
  },
  {
    name: 'Air Tools',
    subcategories: [
      {
        name: 'Impact Wrenches',
        items: [
          { name: 'Pneumatic Impact Wrench', slug: 'pneumatic-impact-wrench', id: '44' }
        ]
      }
    ]
  },
  {
    name: 'Automotive & Garage Equipment',
    subcategories: [
      {
        name: 'Lifts',
        items: [
          { name: 'Hydraulic Jack', slug: 'hydraulic-jack', id: '45' }
        ]
      }
    ]
  },
  {
    name: 'Hydraulic Equipment',
    subcategories: [
      {
        name: 'Pumps',
        items: [
          { name: 'Hydraulic Hand Pump', slug: 'hydraulic-hand-pump', id: '46' }
        ]
      }
    ]
  },
  {
    name: 'Water Pumps',
    subcategories: [
      {
        name: 'Submersible',
        items: [
          { name: 'Submersible Pump', slug: 'submersible-pump', id: '47' }
        ]
      }
    ]
  },
  {
    name: 'Welding Machine',
    subcategories: [
      {
        name: 'Inverter',
        items: [
          { name: 'Arc Welder', slug: 'arc-welder', id: '48' },
          { name: 'MIG Welder', slug: 'mig-welder', id: '49' }
        ]
      }
    ]
  },
  {
    name: 'High Pressure Washers',
    subcategories: [
      {
        name: 'Electric Washers',
        items: [
          { name: 'Pressure Washer', slug: 'pressure-washer', id: '50' }
        ]
      }
    ]
  },
  {
    name: 'Construction',
    subcategories: [
      {
        name: 'Compactors',
        items: [
          { name: 'Plate Compactor', slug: 'plate-compactor', id: '51' }
        ]
      }
    ]
  }
];

export const categoriesProducts = {
  // Drill Driver Category Products (matching screenshot 3)
  '23': [
    {
      id: 101,
      title: '12V Cordless Brushed Drill 20 Nm',
      sku: 'DW0110020',
      category: 'Drill Driver',
      image: '/assets/png/products/cordless_drill.png',
      badge: 'IN STOCK',
      badgeType: 'success'
    },
    {
      id: 102,
      title: '12V Cordless Brushed Drill 20 Nm',
      sku: 'DW0210020',
      category: 'Drill Driver',
      image: '/assets/png/products/cordless_drill.png',
      badge: 'BEST SELLER',
      badgeType: 'warning'
    },
    {
      id: 103,
      title: '20V Compact Cordless Brushless Drill 50 Nm',
      sku: 'DW0611045',
      category: 'Drill Driver',
      image: '/assets/png/products/cordless_drill.png',
      badge: 'IN STOCK',
      badgeType: 'success'
    },
    {
      id: 104,
      title: '20V Compact Cordless Brushless Drill 50 Nm',
      sku: 'DW0614045',
      category: 'Drill Driver',
      image: '/assets/png/products/cordless_drill.png',
      badge: 'IN STOCK',
      badgeType: 'success'
    },
    {
      id: 105,
      title: '20V Compact Cordless Brushless Drill',
      sku: 'DW0614040',
      category: 'Drill Driver',
      image: '/assets/png/products/cordless_drill.png',
      badge: 'NEW ARRIVAL',
      badgeType: 'danger'
    }
  ],
  // Fallbacks for other category items
  'default': [
    {
      id: 201,
      title: 'Premium Industrial Rotary Hammer',
      sku: 'IND-RH-720',
      category: 'General Tools',
      image: '/assets/png/products/rotary_hammer.png',
      badge: 'IN STOCK',
      badgeType: 'success'
    },
    {
      id: 202,
      title: 'High-Performance Angle Grinder',
      sku: 'IND-AG-950',
      category: 'General Tools',
      image: '/assets/png/products/angle_grinder.png',
      badge: 'BEST SELLER',
      badgeType: 'warning'
    }
  ]
};
