import img1 from '../assets/single_product/product_pictures/1.png';
import img2 from '../assets/single_product/product_pictures/2.png';
import img3 from '../assets/single_product/product_pictures/3.png';
import img4 from '../assets/single_product/product_pictures/4.png';
import img5 from '../assets/single_product/product_pictures/5.png';

export const currentProduct = [
  {
    id: 1,
    title: 'Apple iPhone 15 Pro 256Gb Blue Titanium',
    price: '48 499',
    rating: 5,
    code: 874524,
    productColors: [
      { id: 1, color: 'blue', inStock: true },
      { id: 2, color: 'gray', inStock: true },
      { id: 3, color: 'black', inStock: true },
      { id: 4, color: 'white', inStock: false },
    ],
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
    images: [
      { id: 1, img: img1 },
      { id: 2, img: img2 },
      { id: 3, img: img3 },
      { id: 4, img: img4 },
      { id: 5, img: img5 },
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
