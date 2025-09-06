import { authRoutes } from './../constants/routes';
import { RoutePath } from '@/enums/Route';
export const isAuthRoute = (path: string): path is RoutePath => {
  return (authRoutes as string[]).includes(path);
};
