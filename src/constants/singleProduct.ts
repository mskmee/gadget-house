import {
  productImg1,
  productImg2,
  productImg3,
  productImg4,
  productImg5,
  productImg6,
} from '@/assets/constants';

export const menuItems = [
  { id: 1, title: 'About the product', href: '#product' },
  { id: 2, title: 'Characteristics', href: '#product-characteristics' },
  { id: 3, title: 'Reviews', href: '#product-reviews' },
  { id: 4, title: 'Photos', href: '#product-photos' },
  { id: 5, title: 'Accessories', href: '#product-accessories' },
];

export const staticCurrentProduct = [
  {
    otherModels: [
      { id: 1, model: 'Apple iPhone 15 Pro' },
      { id: 2, model: 'Apple iPhone 15 Pro Max' },
    ],
    memoryCards: [
      { id: 1, memory: '128GB' },
      { id: 2, memory: '256GB' },
      { id: 3, memory: '512GB' },
      { id: 4, memory: '1TB' },
    ],

    characteristics: {
      screen: [
        { id: 1, name: 'Display diagonal', value: `6,1"` },
        { id: 2, name: 'Screen resolution', value: '2556x1179' },
        { id: 3, name: 'Screen type', value: 'Super Retina XDR' },
        { id: 4, name: 'Screen refresh rate', value: '120 Hz' },
        { id: 5, name: 'Glass protection technology', value: 'Ceramic Shield' },
      ],
      communication: [
        { id: 1, name: 'Communication standards', value: '3G, 4G, 5G' },
        {
          id: 2,
          name: 'Number of SIM cards',
          value: '1 SIM + e-SIM',
        },
        { id: 3, name: 'SIM card size', value: 'Nano-SIM' },
      ],

      os: [{ id: 1, name: 'Operating system', value: 'Apple iOS 17' }],
      camera: [
        {
          id: 1,
          name: 'Main camera',
          value: '48MP Main, 12MP Ultra Wide, 12MP 2x Telephoto',
        },
        {
          id: 2,
          name: 'Selfie camera',
          value: '12 MP',
        },
      ],
    },
    reviews: [
      {
        id: 1,
        author: 'Julia',
        rate: 5,
        created_date: 1712899540111,
        review_text:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore, magna aliqua. Ut enim ad minim veniam, quis nostrud, exercitation ullamco laboris nisi ut aliquip ex ea commodo, consequat. Ut enim ad minim veniam, quis nostrud,exercitation ullamco laboris nisi ut aliquip ex ea commodo,consequat. ',
      },
      {
        id: 2,
        author: 'Max',
        rate: 5,
        created_date: 1712459540111,
        review_text:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore, magna aliqua. Ut enim ad minim veniam, quis nostrud, exercitation ullamco laboris nisi ut aliquip ex ea commodo, consequat. Ut enim ad minim veniam, quis nostrud,exercitation ullamco laboris nisi ut aliquip ex ea commodo,consequat. ',
      },
      {
        id: 3,
        author: 'Katya',
        rate: 3,
        created_date: 1719899540111,
        review_text:
          'empor incididunt ut labore et dolore, magna aliqua. Ut enim ad minim veniam, quis nostrud, exercitation ullamco laboris nisi ut aliquip ex ea commodo, consequat. Ut enim ad minim veniam, quis nostrud,exercitation ullamco laboris nisi ut aliquip ex ea commodo,consequat. ',
      },
      {
        id: 4,
        author: 'Adam',
        rate: 4,
        created_date: 1715899540111,
        review_text:
          'Ut enim ad minim veniam, quis nostrud, exercitation ullamco laboris nisi ut aliquip ex ea commodo, consequat. Ut enim ad minim veniam, quis nostrud,exercitation ullamco laboris nisi ut aliquip ex ea commodo,consequat. ',
      },
    ],
  },
];

export const productImages = [
  { id: 1, img: productImg1 },
  { id: 2, img: productImg2 },
  { id: 3, img: productImg3 },
  { id: 4, img: productImg4 },
  { id: 5, img: productImg5 },
  { id: 6, img: productImg6 },
];
