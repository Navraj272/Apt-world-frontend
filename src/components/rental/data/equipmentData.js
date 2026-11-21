// Rental equipment shown on /rental and as cards on the Aerial Work Platforms page.
// Each item has its own page at /rental/<slug>.
export const RENTAL_CATEGORY_SLUG = 'aerial-work-platforms';

export const equipmentData = [
  {
    id: 1,
    slug: 'boom-lift',
    title: 'Boom Lift',
    image: '/assets/images/rental/boom-lift.jpg',
    description: `Boom lifts provide exceptional reach and flexibility for working at height. Their platforms can be elevated vertically, shifted laterally, and extended horizontally, allowing operators to safely work over obstacles.

Diesel boom lifts are designed for rugged outdoor environments and rough terrain. These self-propelled machines allow operators to move around the job site even while elevated.

Electric boom lifts are ideal for indoor applications, maintenance work, and cleaning. Their compact size, lightweight construction, non-marking tyres, and excellent manoeuvrability make them suitable for delicate flooring and confined spaces.`,
    specs: {
      head: ['Lift Type', 'Power Source', 'Working Height (m)', 'Safe Working Load (kg)'],
      rows: [
        ['Telescopic', 'Diesel', '58.25', '230'],
        ['Telescopic', 'Diesel', '47.75', '230'],
        ['Telescopic', 'Diesel', '43.30', '230'],
        ['Telescopic', 'Diesel', '38.73', '230'],
        ['Telescopic', 'Diesel', '27.91', '227'],
        ['Articulated', 'Diesel', '26.46', '230'],
        ['Telescopic', 'Diesel', '22.31', '230'],
        ['Articulated', 'Diesel', '20.47', '230'],
        ['Telescopic', 'Diesel', '20.30', '227'],
        ['Articulated', 'Diesel', '17.81', '230'],
        ['Articulated', 'Diesel', '16.25', '230'],
        ['Telescopic', 'Diesel', '16.02', '230'],
        ['Articulated', 'Electric', '20.22', '227'],
        ['Articulated', 'Electric', '15.94', '227'],
        ['Articulated', 'Electric', '15.72', '230'],
        ['Articulated', 'Bi-Energy (Diesel / Electric)', '12.52', '227'],
        ['Articulated', 'Bi-Energy (Diesel / Electric)', '12.00', '200'],
      ],
    },
  },
  {
    id: 2,
    slug: 'scissor-lift',
    title: 'Scissor Lift',
    image: '/assets/images/rental/scissor-lift.jpg',
    description: `Scissor lifts are vertical access platforms that operate using a criss-cross "X" lifting mechanism. They provide spacious work platforms with extending bridge decks for improved access. Designed for lifting multiple workers and equipment safely, they offer high load capacities of up to 1000 kg. Electric models feature non-marking tyres, making them suitable for indoor environments.`,
    specs: {
      head: ['Lift Type', 'Power Source', 'Working Height (m)', 'Safe Working Load (kg)'],
      rows: [
        ['Scissor', 'Diesel', '26.00', '750'],
        ['Scissor', 'Diesel', '18.00', '681'],
        ['Scissor', 'Diesel', '17.03', '400'],
        ['Scissor', 'Diesel', '14.00', '681'],
        ['Scissor', 'Electric', '13.90', '340'],
        ['Scissor', 'Electric', '12.06', '340'],
        ['Scissor', 'Electric', '9.92', '340'],
        ['Scissor', 'Electric', '8.00', '340'],
        ['Scissor', 'Electric', '6.00', '340'],
        ['Scissor', 'Electric', '5.00', '340'],
      ],
    },
  },
  {
    id: 3,
    slug: 'vertical-mast-lift',
    title: 'Vertical Mast Lift',
    image: '/assets/images/rental/vertical-mast-lift.jpg',
    description: `Vertical mast lifts are compact access platforms designed for maintenance and indoor work. They offer excellent manoeuvrability, intuitive controls, maintenance-free components, and automatic battery charging, ensuring reliable performance in confined spaces.`,
    specs: {
      head: ['Lift Type', 'Power Source', 'Working Height (m)', 'Safe Working Load (kg)'],
      rows: [
        ['Vertical Mast', 'Electric', '10.30', '200'],
        ['Vertical Mast', 'Electric', '8.00', '227'],
        ['Vertical Mast', 'Electric', '5.00', '227'],
      ],
    },
  },
  {
    id: 4,
    slug: 'spider-lift',
    title: 'Spider Lift',
    image: '/assets/images/rental/spider-lift.jpg',
    description: `Spider lifts are tracked aerial work platforms designed for reaching difficult and elevated work areas. Their extendable tracks provide stability on uneven terrain, while compact dimensions allow access through narrow spaces. Suitable for indoor and outdoor use, they can operate on steep inclines within manufacturer limits. Available with AC, Diesel, and optional DC power configurations.`,
    specs: {
      head: ['Lift Type', 'Power Source', 'Working Height (m)', 'Safe Working Load (kg)'],
      rows: [
        ['Articulated', 'AC / Diesel (Optional DC)', '52.40', '230'],
        ['Telescopic', 'AC / Diesel (Optional DC)', '41.40', '230'],
        ['Telescopic', 'AC / Diesel (Optional DC)', '35.40', '230'],
        ['Telescopic', 'AC / Diesel (Optional DC)', '30.50', '230'],
        ['Articulated', 'AC / Diesel (Optional DC)', '30.20', '230'],
        ['Telescopic', 'AC / Diesel (Optional DC)', '26.20', '230'],
        ['Articulated', 'AC / Diesel (Optional DC)', '26.00', '230'],
        ['Articulated', 'AC / Diesel (Optional DC)', '23.50', '230'],
        ['Telescopic', 'AC / Diesel (Optional DC)', '21.20', '200'],
        ['Telescopic', 'AC / Diesel (Optional DC)', '18.50', '200'],
        ['Telescopic', 'AC / Diesel (Optional DC)', '17.60', '200'],
        ['Telescopic', 'AC / Diesel (Optional DC)', '15.60', '200'],
        ['Articulated', 'AC / Diesel (Optional DC)', '15.00', '230'],
        ['Telescopic', 'AC / Diesel (Optional DC)', '12.20', '200'],
      ],
    },
  },
  {
    id: 5,
    slug: 'mast-climber',
    title: 'Mast Climber',
    image: '/assets/images/rental/mast-climber.jpg',
    description: `Mast Climbers (MCWP – Mast Climbing Work Platforms) provide a safe and efficient solution for accessing elevated work areas on construction sites, façades, and maintenance projects. Unlike traditional scaffolding, mast climbers offer adjustable working platforms that can reach heights of up to 300 metres. Multiple attachments and configurations are available to meet specific project requirements.`,
    specs: {
      head: ['Product Code', 'Power Source', 'Maximum Working Height (m)', 'Single Mast SWL (kg)', 'Twin Mast SWL (kg)'],
      rows: [
        ['RE MC4000', 'Electric', 'Up to 300', 'Up to 2000', 'Up to 4200'],
        ['RE MC8000', 'Electric', 'Up to 300', 'Up to 4500', 'Up to 8000'],
      ],
    },
    note: 'Available with multiple attachments and can be customized according to site requirements.',
  },
  {
    id: 6,
    slug: 'tower-crane',
    title: 'Tower Crane',
    categoryLabel: 'Construction Equipment',
    image: '/assets/images/rental/tower-crane.jpg',
    gallery: [
      { src: '/assets/images/rental/tower-crane-site.jpg', label: 'On site' },
      { src: '/assets/images/rental/tower-crane-configuration.png', label: 'Jib configuration' },
    ],
    description: `Tower cranes are the backbone of high-rise and large-scale construction, lifting building materials, formwork, and heavy components to any point within their working radius. Our rental range covers flat-head (top-less) and hammer-head jib types, available as freestanding stationary cranes or internal-climbing cranes that rise with the building.

The TC-HS-2510 flat-head crane lifts up to 2.5 tonnes with a working range of 2.5 to 25 m and can reach up to 150 m with internal climbing. The compact TC-HS-1070 hammer-head crane handles up to 1 tonne and is suited to smaller sites and lower-rise projects.

Jib length can be configured to the site: the stationary flat-head crane is available with jibs from 25 m to 55 m, trading reach against tip load (see the jib configuration table below).`,
    specs: {
      head: ['Description', 'Unit', 'TC-HS-2510 (Flat Head)', 'TC-HS-1070 (Hammer Head)'],
      rows: [
        ['Model', '-', '2510', '1070'],
        ['Working Range', 'm', '2.5 ~ 25', '0.5 - 8.5'],
        ['Max Lifting Capacity', 'kg', '2500', '1000'],
        ['Tip Load', 'kg', '1000', '700'],
        ['Jib Type', '-', 'Flat Head', 'Hammer Head'],
        ['Lifting Height (Fixed)', 'm', '17.5', '10'],
        ['Lifting Height (Internal Climbing)', 'm', '150', '90'],
        ['Trolley Speed', 'm/min', '20 - 40', '9.33'],
        ['Slewing Speed', 'r/min', '0 - 0.67', '0 - 09'],
        ['Climbing Speed', 'm/min', '0.5', '22'],
        ['Standard Section Size (L x W x H)', 'm x m x m', '1.05 x 1.05 x 3', '550 x 550 x 1.25'],
        ['Lifting Mechanism', 'KW', '11', '3 / 4.5'],
        ['Slewing Mechanism', 'KW', '2.2', '1.5'],
        ['Trolley Mechanism', 'KW', '3.3 / 2.2', '0.25'],
        ['Total Power', 'KW', '16.5', '6.25'],
        ['Maximum Operating Wind Speed', 'm/s', '10.8 - 13.8', '10.8 - 13.8'],
        ['Operating Ambient Temperature', '°C', '-20 to 40', '-20 to 40'],
      ],
    },
    extraTables: [
      {
        title: 'Stationary Flat-Head Crane: Jib Configuration (Max Load 5 t at 2.5 - 15.7 m, Counter Jib 11.8 m)',
        head: ['Jib Length (m)', 'Jib Sections', 'Tip Load (t)'],
        rows: [
          ['55', '9', '1.2'],
          ['49', '8', '1.48'],
          ['43', '7', '1.78'],
          ['37', '6', '2.15'],
          ['31', '5', '2.55'],
          ['25', '4', '3.1'],
        ],
      },
    ],
    note: 'Crane configuration, jib length, and height are provided as per site requirement.',
  },
  {
    id: 7,
    slug: 'pm-hoist',
    title: 'PM Hoist',
    categoryLabel: 'Construction Equipment',
    image: '/assets/images/rental/pm-hoist.jpg',
    description: `PM Hoists (Passenger-cum-Material Hoists) are rack-and-pinion construction elevators that move workers and materials quickly and safely between floors of high-rise buildings, saving time and reducing manual handling on site.

Our range runs from the SC-100 (1000 kg rated load, 13 passengers, up to 80 m) to the SC-350 (3500 kg rated load, 25 passengers, up to 400 m). Variable frequency drives (VFD) give smooth starts and stops, and lifting speeds go up to 54 m/min on the higher-capacity models.

Twin-cage installations are available to suit site requirements.`,
    specs: {
      head: ['Parameter', 'SC-100', 'SC-150', 'SC-200', 'SC-250', 'SC-300', 'SC-350'],
      rows: [
        ['Rated Load (kg)', '1000', '1500', '2000', '2500', '3000', '3500'],
        ['Safe Working Load (kg)', '800', '1200', '1600', '2000', '2650', '3000'],
        ['Rated Passengers (Nos)', '13', '17', '20', '20', '25', '25'],
        ['Gear Motors with Brake (KW)', '1 x 11', '2 x 7.5', '2 x 11', '2 x 15/26', '3 x 15/26', '3 x 15/26'],
        ['Rated Lifting Speed (m/min)', '0 - 30', '0 - 30', '0 - 30', '0 - 54', '0 - 54', '0 - 54'],
        ['Max Lifting Height (m)', '80', '200', '200', '400', '400', '400'],
        ['Cage Dimension (L x W x H, m)', '2.2 x 1.5 x 2.4 (Roof with Canopy)', '2.7 x 1.5 x 2.4', '3.0 x 1.5 x 2.4', '3.2 x 1.5 x 2.4', '4.0 x 1.7 x 2.4', '4.0 x 1.7 x 2.4'],
        ['Mast Section (L x W x H, mm)', '450 x 450 x 1508 (Triangle)', '450 x 450 x 1508', '450 x 450 x 1508', '650 x 650 x 1508', '650 x 650 x 1508', '650 x 650 x 1508'],
        ['VFD (KW)', '15', '22', '30', '75', '90', '90'],
      ],
    },
    note: 'SC 200 / 200, SC 250 / 250, and SC 320 / 320 twin cage provided as per site requirement.',
  },
  {
    id: 8,
    slug: 'multifunctional-hoist',
    title: 'Multifunctional Hoist',
    categoryLabel: 'Construction Equipment',
    image: '/assets/images/rental/multifunctional-hoist.jpg',
    description: `The Multifunctional Hoist (Rambo 1 Ton) is a mast-mounted material hoist built for lifting construction materials to upper floors quickly and safely. A winch-driven bucket travels along the mast and is protected by up and down limit switches.

It can be fitted with attachments such as vertical or horizontal rebar carriers and special trolleys for carrying plywood, doors, windows and other materials.`,
    specs: {
      head: ['Specification', 'Details'],
      rows: [
        ['Model', 'Rambo 1 Ton'],
        ['Pay Load Capacity', '750 kg'],
        ['Motor Capacity', '10 HP'],
        ['Trolley Speed', '25 m/min'],
        ['Bucket Size (L x W x H)', '1450 mm x 900 mm x 2100 mm'],
        ['Wire Rope', '10 mm'],
        ['Mast Dimension', '400 mm x 500 mm x 1500 mm'],
        ['Safety Control', 'Up & Down Limit Switches'],
        ['Winch Dimensions', '2300 mm x 870 mm x 750 mm'],
        ['Optional Features', 'Rebar attachment (vertical / horizontal), special trolleys to carry various materials (plywood, doors, windows, etc.)'],
      ],
    },
  },
  {
    id: 9,
    slug: 'suspended-rope-platform',
    title: 'Suspended Rope Platform',
    categoryLabel: 'Construction Equipment',
    image: '/assets/images/rental/suspended-rope-platform.jpg',
    description: `Suspended Rope Platforms (SRP) give workers a stable, adjustable working platform on the face of a building or structure, without the need for conventional scaffolding. They are widely used for facade work, painting, cladding, glazing and maintenance at height.

Our SRP range comes in three models (CMAC 250, CMAC 800 and CMAC 1000) with rated capacities from 250 kg to 1 tonne and lifting heights up to 200 metres.`,
    specs: {
      head: ['Parameter', 'CMAC 250', 'CMAC 800', 'CMAC 1000'],
      rows: [
        ['Rated Capacity (kg)', '250', '800', '1000 (1 Ton)'],
        ['Rated Speed (m/min)', '8 - 9', '8 - 10', '8 - 11'],
        ['Rated Power (KW)', '1 x 1.8', '2 x 1.8', '2 x 2.2'],
        ['Hoist Model', 'LTD 6.3', 'LTD 80', 'LTD 100'],
        ['Safety Model', 'LSB 30', 'LSB 30 ii', 'LSF 310'],
        ['Platform Dimensions L x W x H (mm)', '1200 x 810 x 970', '690 x 7500 x 1200', '690 x 7500 x 1200'],
        ['Weight of Suspension Mechanism (kg)', '200', '400', '400'],
        ['Counter Weight (kg)', '500', '1000', '1200'],
        ['Lifting Height Up To (m)', '100', '200', '200'],
        ['Steel Wire Rope Dia (mm)', '8.6', '8.6', '10.2'],
      ],
    },
  },
  {
    id: 10,
    slug: 'goods-lift',
    title: 'Goods Lift',
    categoryLabel: 'Construction Equipment',
    image: '/assets/images/rental/goods-lift.jpg',
    description: `Goods Lifts move materials between floors of factories, warehouses and commercial buildings. This 400 kg goods lift is winch operated from a control panel with a variable frequency drive (VFD) for smooth starts and stops, and is protected by multiple safety limits.

The lift can be customized to suit the capacity, size and site conditions of your project.`,
    specs: {
      head: ['Specification', 'Details'],
      rows: [
        ['Capacity', '400 kg'],
        ['Winch', 'Operated from control panel with VFD'],
        ['Safety Features', 'Rotary Limit, Gravity Limit & Limit Switches'],
        ['Customization', 'Customizable as per site requirement'],
      ],
    },
  },
  {
    id: 11,
    slug: 'curved-hoist',
    title: 'Curved Hoist',
    categoryLabel: 'Construction Equipment',
    image: '/assets/images/rental/curved-hoist.jpg',
    description: `Curved hoists carry men and material vertically in challenging heights and confined spaces, where a standard straight-line hoist is impractical. They are used on chimneys, cooling towers, bridges, tunnels and similar structures.

Curved hoists can be installed under concrete slabs, on existing steel structures, or as standalone frameworks, with attachment systems including hangers, jack stands, wall brackets and custom ceiling mounts. Safety systems include braking and overload protection.`,
    specs: {
      head: ['Specification', 'Details'],
      rows: [
        ['Cage Type', 'Single cage'],
        ['Carries', 'Men & material vertically'],
        ['Rated Load', '1 to 2 Ton'],
        ['Rated Passengers', '10 - 16 Nos'],
        ['Rated Lifting Speed', '33 m/min'],
        ['Speed Options', 'Fixed speed / varied speed (30 m/min; 0-60 m/min; 0-90 m/min)'],
        ['Power Consumption', '15 KW to 78 KW (regular hoists)'],
        ['Max. Lifting Height', '400 m'],
        ['Cage Dimension', '1.5 x 3.0 x 2.1 m'],
        ['Mast Dimension', '650 x 650 x 1508 mm'],
      ],
    },
  },
  {
    id: 12,
    slug: 'bridge-inspection-platform',
    title: 'Bridge Inspection Platform',
    categoryLabel: 'Construction Equipment',
    image: '/assets/images/rental/bridge-inspection-platform.jpg',
    description: `Bridge Inspection Platforms provide safe working access beneath bridge decks and along girders for inspection, maintenance, painting and repair work, even over deep valleys, rivers and railway lines.

Platform size, capacity and configuration are customized to the bridge and site. Contact our team with your project details for a suitable solution.`,
    note: 'Specifications are provided as per bridge and site requirement.',
  },
  {
    id: 13,
    slug: 'circular-srp',
    title: 'Circular SRP',
    categoryLabel: 'Construction Equipment',
    image: '/assets/images/rental/circular-srp.jpg',
    description: `The Circular SRP is a ring-shaped suspended rope platform designed for work inside circular structures such as chimneys, cooling towers, silos and shafts. The platform is suspended from hoisting chains or ropes and gives workers a safe working deck all around the structure.

Platform diameter, capacity and lifting arrangement are customized to the structure. Contact our team with your project details for a suitable solution.`,
    note: 'Specifications are provided as per site requirement.',
  },
];

export const getRentalItem = (slug) => equipmentData.find((eq) => eq.slug === slug);
