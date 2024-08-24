import { createBrowserRouter } from 'react-router-dom';
import AppRoute from './enums/enum';
import Layout from './pages/Layout';
import Main from './pages/Main/Main';
import Smartphones from './pages/Smartphones/Smartphones';
import Laptops from './pages/Laptops/Laptops';
import Viewed from './pages/Viewed/Viewed';
import { Suspense, lazy } from 'react';
import LoadingSpinner from './components/LoadingSpinner';
const SingleProductLazy = lazy(() => import('./pages/SingleProduct/index'));

export const route = createBrowserRouter([
  {
    path: AppRoute?.ROOT,
    element: <Layout />,
    children: [
      { path: AppRoute?.ROOT, element: <Main /> },
      { path: AppRoute?.SMARTPHONES, element: <Smartphones /> },
      { path: AppRoute?.LAPTOPS, element: <Laptops /> },
      { path: AppRoute?.VIEWED, element: <Viewed /> },
      {
        path: AppRoute?.SINGLE_PRODUCT,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <SingleProductLazy />
          </Suspense>
        ),
      },
    ],
  },
]);
