import { RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import './styles/globals.scss';
import { StorageProvider } from './providers/providers';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from './store';
import { useTypedSelector } from './hooks/useTypedSelector';
import { useEffect } from 'react';
import { getUserData } from './store/auth/actions';
import { getAllProducts } from './store/products/actions';
import { DEFAULT_PAGE, DEFAULT_SIZE } from './constants/pagination';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, userToken } = useTypedSelector(
    (state: RootState) => state.auth,
  );
  // ---------------
  const { loaded: productsLoaded } = useTypedSelector(
    (state: RootState) => state.products,
  );

  useEffect(() => {
    if (!productsLoaded && window.location.pathname === '/') {
      dispatch(getAllProducts({ page: DEFAULT_PAGE, size: DEFAULT_SIZE }));
    }
  }, [dispatch, productsLoaded]);
  // ---------------
  useEffect(() => {
    if (!user && userToken) {
      dispatch(getUserData());
    }
  }, [dispatch, user, userToken]);

  return (
    <StorageProvider>
      <RouterProvider router={routes} future={{ v7_startTransition: true }} />
    </StorageProvider>
  );
}

export default App;
