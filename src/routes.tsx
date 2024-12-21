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
          path: AppRoute.SEARCH_RESULTS,
          element: <SearchResults />,
        },
        {
          path: AppRoute.USER_FAVORITES,
          element: <UserFavorites />,
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
