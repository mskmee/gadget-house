import { RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import { StorageProvider } from './providers/providers';
import { LocaleProvider } from './context/localeContext.tsx';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from './store';
import { useTypedSelector } from './hooks/useTypedSelector';
import { useEffect } from 'react';
import { getUserData } from './store/auth/actions';
import { getAllProducts } from './store/products/actions';
import { DEFAULT_PAGE, DEFAULT_SIZE_ALL } from './constants/pagination';
import './styles/globals.scss';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, userToken } = useTypedSelector(
    (state: RootState) => state.auth,
  );

  const { loaded: productsLoaded } = useTypedSelector(
    (state: RootState) => state.products,
  );

  useEffect(() => {
    if (!productsLoaded && window.location.pathname === '/') {
      dispatch(getAllProducts({ page: DEFAULT_PAGE, size: DEFAULT_SIZE_ALL }));
    }
  }, [dispatch, productsLoaded]);

  useEffect(() => {
    if (!user && userToken) {
      dispatch(getUserData());
    }
  }, [dispatch, user, userToken]);

  return (
    <StorageProvider>
      <LocaleProvider>
        <RouterProvider router={routes} future={{ v7_startTransition: true }} />
      </LocaleProvider>
    </StorageProvider>
  );
}

export default App;
