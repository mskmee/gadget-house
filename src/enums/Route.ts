const AppRoute = {
  ROOT: '/',
  ALL_PRODUCTS: '/all-products',
  SMARTPHONES: '/smartphones',
  LAPTOPS: '/laptops',
  VIEWED: '/viewed',
  PHOTO_VIDEO: '/photo-video',
  AUDIO: '/audio',
  SINGLE_PRODUCT: '/:category/:id/:title',
  SEARCH_RESULTS_FOUND: '/search',
  SEARCH_RESULTS_NOT_FOUND: '/search-results',
  BASKET_PAGE: '/basket',
  SIGN_IN: '/sign-in',
  ORDER: '/order',
  ORDER_SUCCESS: '/order-success/:order-id',
  USER_ACCOUNT: '/dashboard/:user-id',
  USER_FAVORITES: '/dashboard/:user-id/favorites',
  USER_ORDERS: '/dashboard/:user-id/orders',
  TABLET: '/tablets',
  WATCH: '/smartwatches',
  PC: '/pcs',
  TV: '/tvs',
  GAME_CONSOLE: '/consoles',
  KIDS: '/kids',
  SALE: '/sale',
  ADMIN_PAGE: '/admin',
} as const;

export type RoutePath = (typeof AppRoute)[keyof typeof AppRoute];

export { AppRoute };
