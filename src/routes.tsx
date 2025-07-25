import { createBrowserRouter } from 'react-router-dom';
import { AppRoute } from './enums/enums';
import Layout from './pages/Layout';
import Main from './pages/Main/Main';

import { SingleProductPage } from './pages/SingleProduct';
import { SearchResults } from './pages/SearchResults';
import { UserFavorites } from './pages/Dashboard/Favorites';
import { SignIn } from './pages/SignIn';
import { BasketPage } from './pages/Basket';
import AllProducts from './pages/AllProducts/AllProducts';

import OrderConfirmation from './pages/OrderConfirmation/OrderConfirmation';
import OrderSuccess from './pages/OrderSuccess/OrderSuccess';
import NotFound from './pages/NotFound/NotFound';

import { UserAccount } from './pages/Dashboard/Account';
import { UserOrders } from './pages/Dashboard/Orders';
import { DashboardLayout } from './pages/Dashboard/DashboardLayout/DashboardLayout';
import AdminPage from './pages/AdminPage/AdminPage';
import AdminInvoice from './pages/AdminInvoice/AdminInvoice';
import ForgotPassword from './pages/Auth/ChangePassword';
import LoginAdmin from './pages/Auth/LoginAdmin';
import Category from './pages/Category/Category';

export const routes = createBrowserRouter(
  [
    {
      path: AppRoute.ROOT,
      element: <Layout />,
      children: [
        { path: AppRoute.ROOT, element: <Main /> },
        { path: AppRoute.CATEGORY, element: <Category /> },
        {
          path: AppRoute.SINGLE_PRODUCT,
          element: <SingleProductPage />,
        },
        {
          path: AppRoute.SEARCH_RESULTS_FOUND,
          element: <AllProducts />,
        },
        {
          path: AppRoute.SEARCH_RESULTS_NOT_FOUND,
          element: <SearchResults />,
        },
        {
          path: AppRoute.USER_ACCOUNT,
          element: <DashboardLayout />,
          children: [
            {
              index: true,
              element: <UserAccount />,
            },
            {
              path: AppRoute.USER_FAVORITES,
              element: <UserFavorites />,
            },
            {
              path: AppRoute.USER_ORDERS,
              element: <UserOrders />,
            },
          ],
        },

        {
          path: AppRoute.SIGN_IN,
          element: <SignIn />,
        },
        {
          path: AppRoute.BASKET_PAGE,
          element: <BasketPage />,
        },

        {
          path: AppRoute.ORDER,
          element: <OrderConfirmation />,
        },

        {
          path: AppRoute.ORDER_SUCCESS,
          element: <OrderSuccess />,
        },

        {
          path: AppRoute.AUTH_FORGOT_PASSWORD,
          element: <ForgotPassword />,
        },
        {
          path: AppRoute.ADMIN_PAGE,
          element: <AdminPage />,
        },
        {
          path: AppRoute.ADMIN_INVOICE,
          element: <AdminInvoice />,
        },
        {
          path: AppRoute.LOGIN_ADMIN,
          element: <LoginAdmin />,
        },
        {
          path: '*',
          element: <NotFound />,
        },
      ],
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  },
);
