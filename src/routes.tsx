import { createBrowserRouter } from 'react-router-dom';
import { AppRoute } from './enums/enums';
import Layout from './pages/Layout';
import Main from './pages/Main/Main';
import Smartphones from './pages/Smartphones/Smartphones';
import Laptops from './pages/Laptops/Laptops';
import Viewed from './pages/Viewed/Viewed';
import { SingleProductPage } from './pages/SingleProduct';
import { SearchResults } from './pages/SearchResults';
import { UserFavorites } from './pages/Dashboard/Favorites';
import { SignIn } from './pages/SignIn';
import { BasketPage } from './pages/Basket';
import AllProducts from './pages/AllProducts/AllProducts';
import PhotoVideo from './pages/PhotoVideo/PhotoVideo';
import Audio from './pages/Audio/Audio';
import OrderConfirmation from './pages/OrderConfirmation/OrderConfirmation';
import OrderSuccess from './pages/OrderSuccess/OrderSuccess';
import NotFound from './pages/NotFound/NotFound';
import GameConsoles from './pages/GameConsoles/GameConsoles';
import Kids from './pages/Kids/Kids';
import PCs from './pages/PCs/PCs';
import TVs from './pages/TVs/TVs';
import Tablets from './pages/Tablets/Tablets';
import SmartWatches from './pages/SmartWatches/SmartWatches';
import Sale from './pages/Sale/Sale';
import { UserAccount } from './pages/Dashboard/Account';
import { UserOrders } from './pages/Dashboard/Orders';
import { DashboardLayout } from './pages/Dashboard/DashboardLayout/DashboardLayout';
import AdminPage from './pages/AdminPage/AdminPage';
import AdminInvoice from './pages/AdminInvoice/AdminInvoice';
import ForgotPassword from './pages/Auth/ChangePassword';
import LoginAdmin from './pages/Auth/LoginAdmin';

export const routes = createBrowserRouter(
  [
    {
      path: AppRoute.ROOT,
      element: <Layout />,
      children: [
        { path: AppRoute.ROOT, element: <Main /> },
        { path: AppRoute.ALL_PRODUCTS, element: <AllProducts /> },
        { path: AppRoute.SMARTPHONES, element: <Smartphones /> },
        { path: AppRoute.LAPTOPS, element: <Laptops /> },
        { path: AppRoute.VIEWED, element: <Viewed /> },
        { path: AppRoute.PHOTO_VIDEO, element: <PhotoVideo /> },
        { path: AppRoute.AUDIO, element: <Audio /> },
        { path: AppRoute.GAME_CONSOLE, element: <GameConsoles /> },
        { path: AppRoute.KIDS, element: <Kids /> },
        { path: AppRoute.PC, element: <PCs /> },
        { path: AppRoute.TV, element: <TVs /> },
        { path: AppRoute.TABLET, element: <Tablets /> },
        { path: AppRoute.WATCH, element: <SmartWatches /> },
        { path: AppRoute.SALE, element: <Sale /> },
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
