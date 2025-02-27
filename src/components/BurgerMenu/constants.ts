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
  { key: '0', title: 'All products', img: AllProducts, link: AppRoute.ALL_PRODUCTS },
  { key: '1', title: 'Smartphone', img: Smartphone, link: AppRoute.SMARTPHONES },
  { key: '2', title: 'Laptop', img: Laptop, link: AppRoute.LAPTOPS },
  { key: '7', title: 'Audio', img: Audio, link: AppRoute.AUDIO },
  { key: '9', title: 'Photo and video', img: Photo, link: AppRoute.PHOTO_VIDEO },
  { key: '3', title: 'Tablet', img: Tablet, link: AppRoute.TABLET },
  { key: '6', title: 'Smart-watch', img: Watch, link: AppRoute.WATCH },
  { key: '4', title: 'PC', img: PC, link: AppRoute.PC },
  { key: '5', title: 'TVs and Multimedia', img: TV, link: AppRoute.TV },
  { key: '8', title: 'Game console', img: GameConsole, link: AppRoute.GAME_CONSOLE },
  { key: '10', title: 'KIDS', img: Kids, link: AppRoute.KIDS },
  {
    key: '11',
    title: 'SALE',
    img: Sale,
    link: AppRoute.SALE,
  },
];

export default items;
