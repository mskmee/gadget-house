const AppRoute = {
  ROOT: '/',
  ALL_PRODUCTS: '/all-products',
  SMARTPHONES: '/smartphone',
  LAPTOPS: '/laptop',
  VIEWED: '/viewed',
  PHOTO_VIDEO: '/photo-and-video',
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
  AUTH_FORGOT_PASSWORD: '/changePassword',
  ADMIN_PAGE: '/admin',
  ADMIN_INVOICE: '/admin/:order-id',
  LOGIN_ADMIN: '/auth/login-admin',
} as const;

export type RoutePath = (typeof AppRoute)[keyof typeof AppRoute];

export { AppRoute };
