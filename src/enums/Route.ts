const AppRoute = {
  ROOT: '/',
  SMARTPHONES: '/smartphones',
  LAPTOPS: '/laptops',
  VIEWED: '/viewed',
};

type AppRoute = (typeof AppRoute)[keyof typeof AppRoute];

export default AppRoute;
