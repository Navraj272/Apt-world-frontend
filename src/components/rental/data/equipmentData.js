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
];

export const getRentalItem = (slug) => equipmentData.find((eq) => eq.slug === slug);
