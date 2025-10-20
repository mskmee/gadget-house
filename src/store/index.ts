import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as shoppingCartReducer } from './shopping_cart/shoppingCart_slice';
import { reducer as searchReducer } from './search/search_slice';
import { reducer as productsReducer } from './products';
import { reducer as authReducer } from './auth/auth-slice';
import { reducer as filtersReducer } from './filters/filters_slice';
import { reducer as singleProductSlice } from './singleProduct/singleProduct_slice';
import { reducer as orderDtoSlice } from './orders/orderDtoSlice';
import { logger, toastMiddleware } from './middlewares/middlewares';
import { isDevelopment } from '@/constants/IsDevelopment';
import { ordersApi } from './orders/api';
import { routes } from '@/routes';
import { authApi } from './auth/api';
import authPortalsReducer from './auth/authPortalsSlice';

export const extraArgument = {
  routes,
};

const reducers = combineReducers({
  shopping_card: shoppingCartReducer,
  search: searchReducer,
  products: productsReducer,
  auth: authReducer,
  filters: filtersReducer,
  singleProduct: singleProductSlice,
  orderDto: orderDtoSlice,
  [ordersApi.reducerPath]: ordersApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  authPortals: authPortalsReducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware()
      .concat(toastMiddleware)
      .concat(ordersApi.middleware)
      .concat(authApi.middleware);
    return isDevelopment ? middleware.concat(logger) : middleware;
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
