const slugify = (text) => {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

export const categoriesTree = [
  {
    name: 'Power Tools',
    subcategories: [
      {
        name: 'Cutting & Grinding',
        slug: slugify('Cutting & Grinding'),
        items: [
          { name: 'Grinders', slug: 'grinders', id: 'sc-1' },
          { name: 'Chopsaws', slug: 'chopsaws', id: 'sc-8' },
          { name: 'Tile Cutters', slug: 'tile-cutters', id: 'sc-9' },
          { name: 'Mitre Saws', slug: 'mitre-saws', id: 'sc-12' },
          { name: 'Angle Polishers', slug: 'angle-polishers', id: 'sc-17' }
        ]
      },
      {
        name: 'Drilling & Breaking',
        slug: slugify('Drilling & Breaking'),
        items: [
          { name: 'Drills', slug: 'drills', id: 'sc-4' },
          { name: 'Rotary Hammers', slug: 'rotary-hammers', id: 'sc-5' },
          { name: 'Demolition Breakers', slug: 'demolition-breakers', id: 'sc-2' },
          { name: 'Diamond Drills / Core Cutters', slug: 'diamond-drills-core-cutters', id: 'sc-3' },
          { name: 'Magnetic Drills', slug: 'magnetic-drills', id: 'sc-11' }
        ]
      },
      {
        name: 'Surface & Woodworking',
        slug: slugify('Surface & Woodworking'),
        items: [
          { name: 'Planers', slug: 'planers', id: 'sc-6' },
          { name: 'Jigsaws', slug: 'jigsaws', id: 'sc-7' },
          { name: 'Woodworking', slug: 'woodworking', id: 'sc-10' },
          { name: 'Electric Planers', slug: 'electric-planers', id: 'sc-18' },
          { name: 'Palm Sanders', slug: 'palm-sanders', id: 'sc-20' }
        ]
      },
      {
        name: 'Specialized',
        slug: slugify('Specialized'),
        items: [
          { name: 'Heat Guns', slug: 'heat-guns', id: 'sc-14' },
          { name: 'Concrete Vibrators', slug: 'concrete-vibrators', id: 'sc-15' },
          { name: 'Paint Mixers', slug: 'paint-mixers', id: 'sc-19' },
          { name: 'Spray Guns', slug: 'spray-guns', id: 'sc-16' },
          { name: 'Automatic Equipment', slug: 'automatic-equipment', id: 'sc-13' }
        ]
      }
    ]
  },
  {
    name: 'Cleaning Solutions',
    subcategories: [
      {
        name: 'Washers & Vacuums',
        slug: slugify('Washers & Vacuums'),
        items: [
          { name: 'Cold Water Pressure Washers', slug: 'cold-water-pressure-washers', id: 'sc-21' },
          { name: 'Ultra High Pressure Washers', slug: 'ultra-high-pressure-washers', id: 'sc-24' },
          { name: 'Wet and Dry Vacuum Cleaners', slug: 'wet-and-dry-vacuum-cleaners', id: 'sc-22' },
          { name: 'Industrial Vacuum Cleaners', slug: 'industrial-vacuum-cleaners', id: 'sc-23' }
        ]
      },
      {
        name: 'Floor Care',
        slug: slugify('Floor Care'),
        items: [
          { name: 'Walk Behind Scrubber Driers', slug: 'walk-behind-scrubber-driers', id: 'sc-25' },
          { name: 'Ride on Scrubber Driers', slug: 'ride-on-scrubber-driers', id: 'sc-26' },
          { name: 'Sweepers', slug: 'sweepers', id: 'sc-27' },
          { name: 'Industrial & Road Sweepers', slug: 'industrial-sweepers-road-sweepers', id: 'sc-28' }
        ]
      },
      {
        name: 'Advanced Cleaning',
        slug: slugify('Advanced Cleaning'),
        items: [
          { name: 'Steam Cleaners', slug: 'steam-cleaners', id: 'sc-29' },
          { name: 'Carpet Care', slug: 'carpet-care', id: 'sc-30' },
          { name: 'Special Application Machines', slug: 'special-application-machines', id: 'sc-31' },
          { name: 'V-Robo', slug: 'v-robo', id: 'sc-32' },
          { name: 'VSD 300 S8+', slug: 'vsd-300-s8', id: 'sc-33' }
        ]
      }
    ]
  },
  {
    name: 'Cordless',
    subcategories: [
      {
        name: 'Cordless Drills',
        slug: slugify('Cordless Drills'),
        items: [
          { name: 'Impact Drills', slug: 'impact-drills', id: 'sc-34' },
          { name: 'Impact Drill Kit Sets', slug: 'impact-drill-kit-sets', id: 'sc-35' },
          { name: 'Cordless Rotary Hammers', slug: 'cordless-rotary-hammers', id: 'sc-40' },
          { name: 'Electric Drills', slug: 'electric-drills', id: 'sc-48' }
        ]
      },
      {
        name: 'Cordless Tools',
        slug: slugify('Cordless Tools'),
        items: [
          { name: 'Cordless Ratchet Wrenches', slug: 'cordless-ratchet-wrenches', id: 'sc-36' },
          { name: 'Cordless Screwdrivers', slug: 'cordless-screwdrivers', id: 'sc-37' },
          { name: 'Cordless Heat Guns', slug: 'cordless-heat-guns', id: 'sc-38' },
          { name: 'Cordless Electric Blowers', slug: 'cordless-electric-blowers', id: 'sc-39' }
        ]
      },
      {
        name: 'Cutting & Heavy Duty',
        slug: slugify('Cutting & Heavy Duty'),
        items: [
          { name: 'Cordless Angle Grinders', slug: 'cordless-angle-grinders', id: 'sc-46' },
          { name: 'Cordless Chainsaws', slug: 'cordless-chainsaws', id: 'sc-43' },
          { name: 'Marble Cutters', slug: 'marble-cutters', id: 'sc-47' },
          { name: 'Demolition Hammers', slug: 'demolition-hammers', id: 'sc-49' },
          { name: 'Cut off Machines', slug: 'cut-off-machines', id: 'sc-50' }
        ]
      },
      {
        name: 'Garden & Specialized',
        slug: slugify('Garden & Specialized'),
        items: [
          { name: 'Cordless Pruners', slug: 'cordless-pruners', id: 'sc-41' },
          { name: 'Iron Sheet Scissors', slug: 'cordless-iron-sheet-scissors', id: 'sc-42' },
          { name: 'Tiled Machines', slug: 'cordless-tiled-machines', id: 'sc-44' },
          { name: 'Combo Kitsets', slug: 'cordless-combo-kitsets', id: 'sc-45' },
          { name: 'Concrete Vibrators', slug: 'concrete-vibrators', id: 'sc-51' }
        ]
      }
    ]
  },
  {
    name: 'Agriculture Machines',
    subcategories: [
      {
        name: 'Land Preparation',
        slug: slugify('Land Preparation'),
        items: [
          { name: 'Weeders', slug: 'weeders', id: 'sc-52' },
          { name: 'Multifunction Cultivators', slug: 'multifunction-cultivators', id: 'sc-53' },
          { name: 'Brush Cutters', slug: 'brush-cutters', id: 'sc-58' },
          { name: 'Earth Augers', slug: 'earth-augers', id: 'sc-59' }
        ]
      },
      {
        name: 'Sprayers & Dusters',
        slug: slugify('Sprayers & Dusters'),
        items: [
          { name: 'Knapsack Power Sprayers', slug: 'knapsack-power-sprayers', id: 'sc-55' },
          { name: 'Mist Dusters', slug: 'mist-dusters', id: 'sc-56' },
          { name: 'Battery Operated Sprayers', slug: 'battery-operated-sprayers', id: 'sc-57' },
          { name: 'Power Sprayers', slug: 'power-sprayers', id: 'sc-61' },
          { name: 'Thermal Fogging Sprayers', slug: 'thermal-fogging-sprayers', id: 'sc-66' }
        ]
      },
      {
        name: 'Harvesting & Care',
        slug: slugify('Harvesting & Care'),
        items: [
          { name: 'Water Pumps & Lawn Mowers', slug: 'water-pumps-lawn-mowers', id: 'sc-54' },
          { name: 'Chainsaws', slug: 'chainsaws', id: 'sc-60' },
          { name: 'Seeders', slug: 'seeders', id: 'sc-62' },
          { name: 'Chaff Cutters & Reapers', slug: 'chaff-cutters-reapers', id: 'sc-63' },
          { name: 'Tea Leaf Harvesters', slug: 'tea-leaf-harvesters', id: 'sc-64' }
        ]
      },
      {
        name: 'Modern Agri Tools',
        slug: slugify('Modern Agri Tools'),
        items: [
          { name: 'Leaf Blowers', slug: 'leaf-blowers', id: 'sc-65' },
          { name: 'Battery Pruning Machines', slug: 'battery-pruning-machines', id: 'sc-67' },
          { name: 'Petrol Hedge Trimmers', slug: 'petrol-hedge-trimmers', id: 'sc-68' },
          { name: 'Wood Chippers', slug: 'wood-chippers', id: 'sc-69' },
          { name: 'Manual Seeders', slug: 'manual-seeders', id: 'sc-70' }
        ]
      }
    ]
  },
  {
    name: 'Lifting Products',
    subcategories: [
      {
        name: 'Hoists & Blocks',
        slug: slugify('Hoists & Blocks'),
        items: [
          { name: 'Chain Blocks', slug: 'chain-blocks', id: 'sc-71' },
          { name: 'Ratchet Lever Hoists', slug: 'ratchet-lever-hoists', id: 'sc-72' },
          { name: 'Electric Chain Hoists', slug: 'electric-chain-hoists', id: 'sc-74' },
          { name: 'PA Hoists', slug: 'pa-hoists', id: 'sc-80' },
          { name: 'CD Hoists', slug: 'cd-hoists', id: 'sc-76' }
        ]
      },
      {
        name: 'Cranes & Winches',
        slug: slugify('Cranes & Winches'),
        items: [
          { name: 'Engine Cranes', slug: 'engine-cranes', id: 'sc-73' },
          { name: 'Electric Trolleys', slug: 'electric-trolleys', id: 'sc-75' },
          { name: 'KCD Winches (Clutch Winches)', slug: 'kcd-winches', id: 'sc-77' },
          { name: 'Iron Stands / Construction Cranes', slug: 'construction-cranes', id: 'sc-78' },
          { name: 'Magnetic Lifters', slug: 'magnetic-lifters', id: 'sc-79' }
        ]
      }
    ]
  },
  {
    name: 'Aerial Work Platforms',
    subcategories: [
      {
        name: 'Scissor Lifts',
        slug: slugify('Scissor Lifts'),
        items: [
          { name: 'Manual Scissor Lifts', slug: 'manual-scissor-lifts', id: 'sc-81' },
          { name: 'Electric Scissor Lifts (Battery)', slug: 'electric-scissor-lifts', id: 'sc-82' }
        ]
      },
      {
        name: 'Masts & Booms',
        slug: slugify('Masts & Booms'),
        items: [
          { name: 'Boom Lifts (Self Propelled)', slug: 'boom-lifts', id: 'sc-83' },
          { name: 'Spider Lifts', slug: 'spider-lifts', id: 'sc-84' },
          { name: 'Aerial Platform (Single Mast)', slug: 'single-mast-platform', id: 'sc-85' },
          { name: 'Aerial Platform (Double Mast)', slug: 'double-mast-platform', id: 'sc-86' },
          { name: 'Vertical Masts', slug: 'vertical-masts', id: 'sc-87' },
          { name: 'Truck Mounted', slug: 'truck-mounted', id: 'sc-88' }
        ]
      }
    ]
  },
  {
    name: 'Construction',
    subcategories: [
      {
        name: 'Rebar & Bending',
        slug: slugify('Rebar & Bending'),
        items: [
          { name: 'Stirrup Bending Machines', slug: 'stirrup-bending-machines', id: 'sc-89' },
          { name: 'Decoiling Machines', slug: 'decoiling-machines', id: 'sc-90' },
          { name: 'Bar Bending Machines', slug: 'bar-bending-machines', id: 'sc-91' },
          { name: 'Bar Cutting Machines', slug: 'bar-cutting-machines', id: 'sc-92' },
          { name: 'Automatic Stirrup Bending', slug: 'automatic-stirrup-bending', id: 'sc-93' }
        ]
      },
      {
        name: 'Straightening & Threading',
        slug: slugify('Straightening & Threading'),
        items: [
          { name: 'Rebar Straightening', slug: 'rebar-straightening-machines', id: 'sc-94' },
          { name: 'Rebar Threading', slug: 'rebar-threading-machines', id: 'sc-95' },
          { name: 'Iron Workers / Multi Cutters', slug: 'iron-workers', id: 'sc-96' },
          { name: 'Rebar Sawing Machines', slug: 'rebar-sawing-machines', id: 'sc-97' }
        ]
      },
      {
        name: 'Compaction & Rolling',
        slug: slugify('Compaction & Rolling'),
        items: [
          { name: 'Plate Compactors', slug: 'plate-compactors', id: 'sc-98' },
          { name: 'Tamping Rammers', slug: 'tamping-rammers', id: 'sc-99' },
          { name: 'Vibrating Rollers', slug: 'vibrating-rollers', id: 'sc-100' }
        ]
      },
      {
        name: 'Concreting & Finishing',
        slug: slugify('Concreting & Finishing'),
        items: [
          { name: 'Concrete Cutters', slug: 'concrete-cutters', id: 'sc-101' },
          { name: 'Concrete Roller Screed', slug: 'concrete-roller-screed', id: 'sc-102' },
          { name: 'Ride on Power Trowels', slug: 'ride-on-power-trowels', id: 'sc-103' },
          { name: 'Walk Behind Power Trowels', slug: 'walk-behind-power-trowels', id: 'sc-104' },
          { name: 'Edge Trowels', slug: 'edge-trowels', id: 'sc-105' },
          { name: 'Laser Levelling Machines', slug: 'laser-levelling-machines', id: 'sc-106' },
          { name: 'Zip-800 Platform', slug: 'zip-800-suspended-platform', id: 'sc-107' }
        ]
      }
    ]
  },
  {
    name: 'Packaging',
    subcategories: [
      {
        name: 'Sealing & Capping',
        slug: slugify('Sealing & Capping'),
        items: [
          { name: 'Capping Machines', slug: 'capping-machines', id: 'sc-108' },
          { name: 'Carton Sealers', slug: 'carton-sealers', id: 'sc-109' },
          { name: 'Cup Sealers', slug: 'cup-sealers', id: 'sc-111' },
          { name: 'Hand Sealers', slug: 'hand-sealers', id: 'sc-114' },
          { name: 'Induction Sealing', slug: 'induction-sealing', id: 'sc-115' },
          { name: 'Pedal Sealers', slug: 'pedal-sealers', id: 'sc-124' }
        ]
      },
      {
        name: 'Filling & Bagger',
        slug: slugify('Filling & Bagger'),
        items: [
          { name: 'FFS (Bagger) Machines', slug: 'ffs-bagger-machines', id: 'sc-112' },
          { name: 'Flow Wrap Machines', slug: 'flow-wrap-machines', id: 'sc-113' },
          { name: 'Liquid Filler Machines', slug: 'liquid-filler-machines', id: 'sc-119' },
          { name: 'Paste Filler Machines', slug: 'paste-filler-machines', id: 'sc-123' },
          { name: 'Tube Filler with Printer', slug: 'tube-filler-with-printer', id: 'sc-130' }
        ]
      },
      {
        name: 'Labeling & Weighing',
        slug: slugify('Labeling & Weighing'),
        items: [
          { name: 'Labeling Machines', slug: 'labeling-machines', id: 'sc-117' },
          { name: 'Multi Head Weighers', slug: 'multi-head-weighers', id: 'sc-121' },
          { name: 'Printers & Cartridges', slug: 'printers-cartridges', id: 'sc-126' },
          { name: 'PFS Fully Automatic', slug: 'pfs-fully-automatic', id: 'sc-125' },
          { name: 'Pad Printers', slug: 'pad-printers', id: 'sc-122' }
        ]
      },
      {
        name: 'Handling & Shrink',
        slug: slugify('Handling & Shrink'),
        items: [
          { name: 'Conveyors', slug: 'conveyors', id: 'sc-110' },
          { name: 'Material Handling Machines', slug: 'material-handling-machines', id: 'sc-118' },
          { name: 'L Sealer & Side Sealer', slug: 'l-sealer-side-sealer', id: 'sc-116' },
          { name: 'Shrink Tunnels', slug: 'shrink-tunnels', id: 'sc-127' },
          { name: 'Strapping Machines', slug: 'strapping-machines', id: 'sc-128' }
        ]
      }
    ]
  },
  {
    name: 'Welding Machines',
    subcategories: [
      {
        name: 'Arc & Gas Welding',
        slug: slugify('Arc & Gas Welding'),
        items: [
          { name: 'ARC Welding Machines', slug: 'arc-welding-machines', id: 'sc-132' },
          { name: 'MIG and MAG Welding', slug: 'mig-and-mag-welding-machines', id: 'sc-135' },
          { name: 'TIG Welding Machines', slug: 'tig-welding-machines', id: 'sc-137' }
        ]
      },
      {
        name: 'Advanced Cutting',
        slug: slugify('Advanced Cutting'),
        items: [
          { name: 'CNC Cutting Machines', slug: 'cnc-cutting-machines', id: 'sc-133' },
          { name: 'Laser Welding Machines', slug: 'laser-welding-machines', id: 'sc-134' },
          { name: 'Plasma Cutter Machines', slug: 'plasma-cutter-machines', id: 'sc-136' },
          { name: 'Hutong Series Welding', slug: 'hutong-series-welding-machines', id: 'sc-131' }
        ]
      }
    ]
  },
  {
    name: 'MHE Equipment',
    subcategories: [
      {
        name: 'Pallet Trucks',
        slug: slugify('Pallet Trucks'),
        items: [
          { name: 'Hand Pallet Trucks', slug: 'hand-pallet-trucks', id: 'sc-138' },
          { name: 'Battery Pallet Trucks (BOPT)', slug: 'battery-pallet-trucks', id: 'sc-139' },
          { name: 'Electric Pallet Trucks', slug: 'electric-pallet-trucks', id: 'sc-144' },
          { name: 'Scale Pallet Trucks', slug: 'scale-pallet-trucks', id: 'sc-147' },
          { name: 'Scissor Pallet Trucks', slug: 'scissor-pallet-trucks', id: 'sc-148' }
        ]
      },
      {
        name: 'Stackers & Forklifts',
        slug: slugify('Stackers & Forklifts'),
        items: [
          { name: 'Manual Stackers', slug: 'manual-stackers', id: 'sc-142' },
          { name: 'Semi Electric Stackers', slug: 'semi-electric-stackers', id: 'sc-150' },
          { name: 'Electric Walkie Stackers', slug: 'electric-walkie-stackers', id: 'sc-152' },
          { name: 'Electric Stackers with Hoist', slug: 'electric-stackers-with-hoist', id: 'sc-153' },
          { name: 'Forklifts', slug: 'forklifts', id: 'sc-143' },
          { name: 'Drum Stackers', slug: 'drum-stackers', id: 'sc-140' }
        ]
      },
      {
        name: 'Storage & Access',
        slug: slugify('Storage & Access'),
        items: [
          { name: 'Roller Conveyors', slug: 'roller-conveyors', id: 'sc-141' },
          { name: 'Mobile Loading Docks', slug: 'mobile-loading-dock-ramps', id: 'sc-145' },
          { name: 'Order Pickers', slug: 'order-pickers', id: 'sc-146' },
          { name: 'Scissor Tables', slug: 'scissor-tables', id: 'sc-149' },
          { name: 'U Tables', slug: 'u-tables', id: 'sc-151' }
        ]
      }
    ]
  }
];

export const categoriesProducts = {};
