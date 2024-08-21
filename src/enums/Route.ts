const AppRoute = {
  ROOT: '/',
  SMARTPHONES: '/smartphones',
  LAPTOPS: '/laptops',
  VIEWED: '/viewed',
  SINGLE_PRODUCT: '/:smartphone/:title',
};

export type RoutePath = (typeof AppRoute)[keyof typeof AppRoute];

export { AppRoute };
