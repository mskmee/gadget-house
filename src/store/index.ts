import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as shoppingCartReducer } from './shopping_cart/shoppingCart_slice';
import { reducer as searchReducer } from './search/search_slice';
import { reducer as productsReducer } from './products';
import { reducer as authReducer } from './auth/auth-slice';
import { reducer as filtersReducer } from './filters/filters_slice';
import { reducer as orderReducer } from './orders/order_slice';
import { reducer as singleProductSlice} from './singleProduct/singleProduct_slice';
import { logger, toastMiddleware } from './middlewares/middlewares';
import { isDevelopment } from '@/constants/IsDevelopment';


const reducers = combineReducers({
  shopping_card: shoppingCartReducer,
  search: searchReducer,
  products: productsReducer,
  auth: authReducer,
  filters: filtersReducer,
  order: orderReducer,
  singleProduct: singleProductSlice
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware().concat(toastMiddleware);
    return isDevelopment ? middleware.concat(logger) : middleware;
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
