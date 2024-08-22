import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/globals.css';
import Main from './pages/Main/Main';
import Smartphones from './pages/Smartphones/Smartphones';
import Laptops from './pages/Laptops/Laptops';
import Viewed from './pages/Viewed/Viewed';
import AppRoute from './enums/enum';
import { Layout } from './pages/Layout';
import LoadingSpinner from './components/LoadingSpinner';
const SingleProductLazy = lazy(() => import('./pages/SingleProduct/index'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path={AppRoute.ROOT} element={<Main />} />
          <Route path={AppRoute.SMARTPHONES} element={<Smartphones />} />
          <Route path={AppRoute.LAPTOPS} element={<Laptops />} />
          <Route path={AppRoute.VIEWED} element={<Viewed />} />
          <Route
            path={AppRoute.SINGLE_PRODUCT}
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <SingleProductLazy />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
