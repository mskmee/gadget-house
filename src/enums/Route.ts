const AppRoute = {
  ROOT: '/',
  SMARTPHONES: '/smartphones',
  LAPTOPS: '/laptops',
  VIEWED: '/viewed',
  SINGLE_PRODUCT: '/:smartphone/:title',
}  as const;

export type RoutePath = (typeof AppRoute)[keyof typeof AppRoute];

export { AppRoute };
