const AppRoute = {
  ROOT: '/',
  SMARTPHONES: '/smartphones',
  LAPTOPS: '/laptops',
  VIEWED: '/viewed',
  SINGLE_PRODUCT: '/:smartphone/:title',
};

type AppRoute = (typeof AppRoute)[keyof typeof AppRoute];

export default AppRoute;
