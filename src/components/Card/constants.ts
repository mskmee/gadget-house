import {
  PhoneImg,
  LaptopImg,
  LikeIcon,
  LikeIconClick,
  PhonePalette,
  BasketIcon,
  LaptopPalette,
  SamsungImg,
  accessoriesImg1,
  accessoriesImg2,
  accessoriesImg3,
  accessoriesImg4,
} from '@/assets/constants';

export const data = [
  {
    id: 1,
    title: 'Samsung Galaxy A24 6/128Gb Black',
    img: PhoneImg,
    likeIcon: LikeIcon,
    likeIconClick: LikeIconClick,
    colorPalette: PhonePalette,
    price: '19 900 ₴',
    code: '456158',
    rate: 5,
  },
];

export const laptopData = [
  {
    id: 1,
    title: 'Lenovo IdeaPad 1 15ALC7',
    img: LaptopImg,
    likeIcon: LikeIcon,
    likeIconClick: LikeIconClick,
    colorPalette: LaptopPalette,
    price: '16 999 ₴',
    code: '986358',
    rate: 5,
  },
];

export const brandData = [
  {
    id: 1,
    img: SamsungImg,
  },
];

export const productAccessories = [
  {
    id: 1,
    title: 'iPhone 15 Pro Silicone Case with MagSafe',
    img: accessoriesImg1,
    likeIcon: LikeIcon,
    likeIconClick: LikeIconClick,
    basketIcon: BasketIcon,
    hasAnotherColor: false,
    isLiked: false,
    rate: 5,
    price: '2 799 ₴',
    code: '874364',
  },
  {
    id: 2,
    title: 'iPhone 15 Pro Silicone Case with MagSafe',
    img: accessoriesImg2,
    likeIcon: LikeIcon,
    likeIconClick: LikeIconClick,
    basketIcon: BasketIcon,
    hasAnotherColor: false,
    isLiked: false,
    rate: 5,
    price: '2 799 ₴',
    code: '875496',
  },
  {
    id: 3,
    title: 'iPhone 15 Pro Silicone Case with MagSafe',
    img: accessoriesImg3,
    likeIcon: LikeIcon,
    likeIconClick: LikeIconClick,
    basketIcon: BasketIcon,
    hasAnotherColor: ['#FFFF00', '#00820D', '#1C1817', '#FFCBDB', '#00BFFF'],
    isLiked: false,
    rate: 5,
    price: '2 799 ₴',
    code: '456158',
  },
  {
    id: 4,
    title: 'iPhone 15 Pro Silicone Case with MagSafe',
    img: accessoriesImg4,
    likeIcon: LikeIcon,
    likeIconClick: LikeIconClick,
    basketIcon: BasketIcon,
    hasAnotherColor: ['#fff', '#00BFFF', '#3EB489', '#FFCBDB', '#C8A2C8'],
    isLiked: false,
    rate: 5,
    price: '2 799 ₴',
    code: '557769',
  },
  {
    id: 5,
    title: 'iPhone 15 Pro Silicone Case with MagSafe',
    img: accessoriesImg2,
    likeIcon: LikeIcon,
    likeIconClick: LikeIconClick,
    basketIcon: BasketIcon,
    hasAnotherColor: ['#000', '#d84f34', '#236aed', '#FFCBDB', '#C8A2C8'],
    isLiked: false,
    rate: 3,
    price: '3 199 ₴',
    code: '173497',
  },
  {
    id: 6,
    title: 'iPhone 15 Pro Silicone Case with MagSafe',
    img: accessoriesImg4,
    likeIcon: LikeIcon,
    likeIconClick: LikeIconClick,
    basketIcon: BasketIcon,
    hasAnotherColor: false,
    isLiked: false,
    rate: 4,
    price: '2 835 ₴',
    code: '157781',
  },
];
