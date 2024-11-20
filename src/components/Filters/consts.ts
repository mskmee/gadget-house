import Smart_1 from '../../assets/images/smartphones/1.png';
import Smart_2 from '../../assets/images/smartphones/2.png';
import Smart_3 from '../../assets/images/smartphones/3.png';
import Smart_4 from '../../assets/images/smartphones/4.png';

// import Laptop_1 from '../../assets/images/laptops/1.png';
// import Laptop_2 from '../../assets/images/laptops/2.png';
// import Laptop_3 from '../../assets/images/laptops/3.png';
// import Laptop_4 from '../../assets/images/laptops/4.png';


export const filters = {
  'categories': ['Smartphones', 'Laptops', 'Tablets'],
  'brands': [
    'Apple',
    'Samsung',
    'Huawei',
    'Xiaomi',
    'Sony',
    'LG',
    'OnePlus',
    'Google',
    'OPPO',
    'Realme',
    'Honor',
    'Nokia',
  ],
  'builtInMemory': [
    '16GB',
    '32GB',
    '64GB',
    '128GB',
    '256GB',
    '512GB and more',
  ],
  'rams': ['1GB', '2GB', '3GB', '4GB', '8GB', '12GB', '16GB'],
  'colors': ['Black', 'White', 'Red', 'Blue', 'Green', 'Purple ', 'Yellow', 'Gold', 'Orange', 'Pink'],
  'cores': ['10 Cores', '8 Cores', '6 Cores', '4 + 4 Cores', '4 Cores'],
  'screens': [
    'LTPS',
    'LCD',
    'TFT',
    'Super Retina XDR',
    'Retina',
    'PLS',
    'AMOLED',
    'OLED',
    'pOLED',
    'Super Amoled',
    'Fluid Amoled',
    'Dynamic Amoled 2x',
  ],
  'images': [Smart_1, Smart_2, Smart_3, Smart_4],
}

import {
  BasketIcon,
  accessoriesImg1,
  accessoriesImg2,
  accessoriesImg3,
  accessoriesImg4,
  laptopImg_1,
  laptopImg_2,
  laptopImg_3,
  laptopImg_4,
  previouslyViewed_1,
  previouslyViewed_2,
  previouslyViewed_3,
} from '@/assets/constants';
import { IProduct } from '@/interfaces/interfaces';

export const smartData: IProduct[] = [
  {
    id: 1,
    title: 'iPhone 15 Pro Silicone Case with MagSafe',
    img: [accessoriesImg1],
    basketIcon: BasketIcon,
    anotherColors: [],
    isLiked: false,
    rate: 5,
    price: 2799,
    brand: 'Apple',
    ram: 8,
    builtInMemory: 32,
    code: '874364',
    category: 'smartphone',
    cameraMP: 15
  },
  {
    id: 2,
    title: 'iPhone 15 Pro Silicone Case with MagSafe',
    img: [accessoriesImg2],
    basketIcon: BasketIcon,
    anotherColors: [],
    isLiked: false,
    rate: 5,
    price: 799,
    brand: 'Apple',
    ram: 8,
    builtInMemory: 128, // ГБ встроенной памяти
    code: '875496',
    category: 'smartphone',
    cameraMP: 15
  },
  {
    id: 3,
    title: 'iPhone 15 Pro Silicone Case with MagSafe',
    img: [accessoriesImg3],
    basketIcon: BasketIcon,
    anotherColors: ['#FFFF00', '#00820D', '#1C1817', '#FFCBDB', '#00BFFF'],
    isLiked: false,
    rate: 5,
    price: 5799,
    brand: 'Apple',
    ram: 8,
    builtInMemory: 32,
    code: '456158',
    category: 'smartphone',
    cameraMP: 45
  },
  {
    id: 4,
    title: 'iPhone 15 Pro Silicone Case with MagSafe',
    img: [accessoriesImg4],
    basketIcon: BasketIcon,
    anotherColors: ['#ffffff', '#00BFFF', '#3EB489', '#FFCBDB', '#C8A2C8'],
    isLiked: false,
    rate: 5,
    price: 6799,
    brand: 'Apple',
    ram: 8,
    builtInMemory: 32,
    code: '557769',
    category: 'smartphone',
    cameraMP: 45
  },
  {
    id: 5,
    title: 'iPhone 15 Pro Silicone Case with MagSafe',
    img: [accessoriesImg2],
    basketIcon: BasketIcon,
    anotherColors: ['#000', '#d84f34', '#236aed', '#FFCBDB', '#C8A2C8'],
    isLiked: false,
    rate: 3,
    price: 7199,
    brand: 'Apple',
    ram: 8,
    builtInMemory: 128,
    code: '173497',
    category: 'smartphone',
    cameraMP: 25
  },
  {
    id: 6,
    title: 'iPhone 15 Pro Silicone Case with MagSafe',
    img: [accessoriesImg4],
    basketIcon: BasketIcon,
    anotherColors: [],
    isLiked: false,
    rate: 4,
    price: 8835,
    brand: 'Apple',
    ram: 8,
    builtInMemory: 128,
    code: '157781',
    category: 'smartphone',
    cameraMP: 15
  },
]

export const productsData = [
  {
    id: 1,
    title: 'iPhone 15 Pro Silicone Case with MagSafe',
    img: accessoriesImg1,
    basketIcon: BasketIcon,
    anotherColors: [],
    isLiked: false,
    rate: 5,
    price: '2 799 ₴',
    brand: 'Apple',
    ram: 8, // ГБ оперативной памяти
    builtInMemory: 128, // ГБ встроенной памяти
    code: '874364',
    category: 'smartphone',
    cameraMP: 15
  },
  {
    id: 2,
    title: 'iPhone 15 Pro Silicone Case with MagSafe',
    img: accessoriesImg2,
    basketIcon: BasketIcon,
    anotherColors: [],
    isLiked: false,
    rate: 5,
    price: '2 799 ₴',
    brand: 'Apple',
    ram: 8, // ГБ оперативной памяти
    builtInMemory: 128, // ГБ встроенной памяти
    code: '875496',
    category: 'smartphone',
    cameraMP: 15
  },
  {
    id: 3,
    title: 'iPhone 15 Pro Silicone Case with MagSafe',
    img: accessoriesImg3,
    basketIcon: BasketIcon,
    anotherColors: ['#FFFF00', '#00820D', '#1C1817', '#FFCBDB', '#00BFFF'],
    isLiked: false,
    rate: 5,
    price: '2 799 ₴',
    brand: 'Apple',
    ram: 8, // ГБ оперативной памяти
    builtInMemory: 128, // ГБ встроенной памяти
    code: '456158',
    category: 'smartphone',
    cameraMP: 15
  },
  {
    id: 4,
    title: 'iPhone 15 Pro Silicone Case with MagSafe',
    img: accessoriesImg4,
    basketIcon: BasketIcon,
    anotherColors: ['#ffffff', '#00BFFF', '#3EB489', '#FFCBDB', '#C8A2C8'],
    isLiked: false,
    rate: 5,
    price: '2 799 ₴',
    code: '557769',
    category: 'smartphone',
    cameraMP: 15
  },
  {
    id: 5,
    title: 'iPhone 15 Pro Silicone Case with MagSafe',
    img: accessoriesImg2,
    basketIcon: BasketIcon,
    anotherColors: ['#000', '#d84f34', '#236aed', '#FFCBDB', '#C8A2C8'],
    isLiked: false,
    rate: 3,
    price: '3 199 ₴',
    brand: 'Apple',
    ram: 8, // ГБ оперативной памяти
    builtInMemory: 128, // ГБ встроенной памяти
    code: '173497',
    category: 'smartphone',
    cameraMP: 15
  },
  {
    id: 6,
    title: 'iPhone 15 Pro Silicone Case with MagSafe',
    img: accessoriesImg4,

    basketIcon: BasketIcon,
    anotherColors: [],
    isLiked: false,
    rate: 4,
    price: '2 835 ₴',
    brand: 'Apple',
    ram: 8, // ГБ оперативной памяти
    builtInMemory: 128, // ГБ встроенной памяти
    code: '157781',
    category: 'smartphone',
    cameraMP: 15
  },
  {
    id: 7,
    title: 'Apple MacBook Air 13.6 M3 8GB 256GB',
    img: laptopImg_1,
    price: '59 490 ₴',
    code: '847687',
    rate: 5,
    anotherColors: ['#1C1817', '#F5F5DC', '#808080'],
    isLiked: false,
    category: 'laptop'
  },
  {
    id: 8,
    title: 'Lenovo IdeaPad 1 15ALC7',
    img: laptopImg_2,
    price: '16 999 ₴',
    code: '256462',
    rate: 5,
    anotherColors: ['#808080'],
    isLiked: false,
    category: 'laptop'
  },
  {
    id: 9,
    title: 'Asus TUF Gaming A15',
    img: laptopImg_3,
    price: '32 900 ₴',
    code: '458688',
    rate: 5,
    anotherColors: ['#1C1817'],
    isLiked: false,
    category: 'laptop'
  },
  {
    id: 10,
    title: 'Apple MacBook Air 15.3 M3 8GB 256GB',
    img: laptopImg_4,
    price: '61 999 ₴',
    code: '594898',
    rate: 5,
    anotherColors: ['#1C1817', '#F5F5DC', '#808080', '#1C1817'],
    isLiked: false,
    category: 'laptop'
  },
  {
    id: 11,
    title: 'Canon RF 24-70mm f/2.8 L IS USM',
    img: previouslyViewed_1,
    price: '95 999 ₴',
    code: '874364',
    rate: 5,
    anotherColors: [],
    isLiked: false,
    category: 'photo'
  },
  {
    id: 12,
    title: 'Canon EOS 4000D 18-55 DC III',
    img: previouslyViewed_2,
    price: '16 699 ₴',
    code: '875496',
    rate: 5,
    anotherColors: [],
    isLiked: false,
    category: 'photo'
  },
  {
    id: 14,
    title: 'Fujifilm INSTAX MINI 12 Lilac Purple',
    img: previouslyViewed_3,
    price: '3 900 ₴',
    code: '557769',
    rate: 5,
    anotherColors: ['#ffffff', '#00BFFF', '#3EB489', '#FFCBDB', '#C8A2C8'],
    isLiked: false,
    category: 'photo'
  },
];