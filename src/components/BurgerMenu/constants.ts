import {
  AllProducts,
  Laptop,
  Smartphone,
  Audio,
  Photo,
  Tablet,
  Watch,
  PC,
  TV,
  GameConsole,
  Kids,
  Sale,
} from '@/assets/constants';
import { AppRoute } from '@/enums/Route';

const items = [
  { key: '0', title: 'All products', img: AllProducts, link: AppRoute.ALL_PRODUCTS, categoryId: null },
  { key: '1', title: 'Smartphone', img: Smartphone, link: AppRoute.SMARTPHONES, categoryId: 1 },
  { key: '2', title: 'Laptop', img: Laptop, link: AppRoute.LAPTOPS, categoryId: 2 },
  { key: '7', title: 'Audio', img: Audio, link: AppRoute.AUDIO, categoryId: 3 },
  { key: '9', title: 'Photo and video', img: Photo, link: AppRoute.PHOTO_VIDEO, categoryId: 4 },
  { key: '3', title: 'Tablet', img: Tablet, link: AppRoute.TABLET, categoryId: 5 },
  { key: '6', title: 'Smart-watch', img: Watch, link: AppRoute.WATCH, categoryId: 6 },
  { key: '4', title: 'PC', img: PC, link: AppRoute.PC, categoryId: 7 },
  { key: '5', title: 'TV and Multimedia', img: TV, link: AppRoute.TV, categoryId: 8 },
  { key: '8', title: 'Game console', img: GameConsole, link: AppRoute.GAME_CONSOLE, categoryId: 9 },
  { key: '10', title: 'For kids', img: Kids, link: AppRoute.KIDS, categoryId: 10 },
  { key: '11', title: 'SALE', img: Sale, link: AppRoute.SALE, categoryId: 11 },
];

export default items;
