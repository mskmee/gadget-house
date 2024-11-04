const AppRoute = {
  ROOT: '/',
  SMARTPHONES: '/smartphones',
  LAPTOPS: '/laptops',
  VIEWED: '/viewed',
  SINGLE_PRODUCT: '/:smartphone/:id/:title',
  SEARCH_RESULTS: '/search-results',
  BASKET_PAGE: '/basket',
  SIGN_IN: '/sign-in',
  USER_FAVORITES: '/dashboard/:user-id/favorites',
} as const;

export type RoutePath = (typeof AppRoute)[keyof typeof AppRoute];

export { AppRoute };
