const AppRoute = {
  ROOT: '/',
  ALL_PRODUCTS: '/all-products',
  SMARTPHONES: '/smartphones',
  LAPTOPS: '/laptops',
  VIEWED: '/viewed',
  PHOTO_VIDEO: '/photo-video',
  AUDIO: '/audio',
  SINGLE_PRODUCT: '/:smartphone/:id/:title',
  SEARCH_RESULTS: '/search-results',
  BASKET_PAGE: '/basket',
  SIGN_IN: '/sign-in',
  ORDER: '/order',
  USER_FAVORITES: '/dashboard/:user-id/favorites',
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
