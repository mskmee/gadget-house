import { RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import './styles/globals.scss';
import { StorageProvider } from './providers/providers';
import { LocaleProvider } from './context/localeContext.tsx';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from './store';
import { useTypedSelector } from './hooks/useTypedSelector';
import { useEffect } from 'react';
// import { getUserData } from './store/auth/actions';
// import { getAllProducts } from './store/products/actions';
import { DEFAULT_PAGE, DEFAULT_SIZE_ALL } from './constants/pagination';
import { useGetUserProfileQuery } from './store/auth/api';
import { setUser } from './store/auth/auth-slice';
import { useGetAllProductsQuery } from './store/products/api';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, userToken } = useTypedSelector(
    (state: RootState) => state.auth,
  );

  const { loaded: productsLoaded } = useTypedSelector(
    (state: RootState) => state.products,
  );

  const { data: userProfile } = useGetUserProfileQuery(undefined, {
    skip: !userToken || !!user,
  });

  const { data: allProducts } = useGetAllProductsQuery(
    { page: DEFAULT_PAGE, size: DEFAULT_SIZE_ALL },
    { skip: productsLoaded }
  );

  useEffect(() => {
    if (userProfile) {
      dispatch(setUser(userProfile));
    }
  }, [userProfile, dispatch]);

  useEffect(() => {
    if (allProducts) {
      // Dispatch action to update Redux state with RTK Query data
      dispatch({
        type: 'products/getAllProducts/fulfilled',
        payload: allProducts,
      });
    }
  }, [allProducts, dispatch]);

  return (
    <StorageProvider>
      <LocaleProvider>
        <RouterProvider router={routes} future={{ v7_startTransition: true }} />
      </LocaleProvider>
    </StorageProvider>
  );
}

export default App;
