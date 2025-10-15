import { AppRoute } from '@/enums/Route';

export const toClientsMenu = [
  { id: 1, menuText: 'About company', href: '/about-us' },
  { id: 2, menuText: 'Career', href: '/career' },
  { id: 3, menuText: 'Customer Service', href: '/customer-service' },
  { id: 4, menuText: 'New items', href: '/new-items' },
  { id: 5, menuText: 'Delivery', href: '/delivery' },
  { id: 6, menuText: 'Payment', href: '/payment' },
  { id: 7, menuText: 'Privacy policy', href: '/privacy-policy' },
];

export const categoriesMenu = [
  { id: 1, menuText: 'Smartphone', href: AppRoute.SMARTPHONES },
  { id: 2, menuText: 'Laptop', href: AppRoute.LAPTOPS },
  // { id: 3, menuText: 'Tablet', href: AppRoute.TABLET },
  // { id: 4, menuText: 'PC', href: AppRoute.PC },
  // {
  //   id: 5,
  //   menuText: 'TVs and Multimedia',
  //   href: AppRoute.TV,
  // },
  // { id: 6, menuText: 'Smart-watch', href: AppRoute.WATCH },
  { id: 7, menuText: 'Audio', href: AppRoute.AUDIO },
  // {
  //   id: 8,
  //   menuText: 'Game console',
  //   href: AppRoute.GAME_CONSOLE,
  // },
  { id: 9, menuText: 'Photo and video', href: AppRoute.PHOTO_VIDEO },
  // { id: 10, menuText: 'KIDS', href: AppRoute.KIDS },
];
