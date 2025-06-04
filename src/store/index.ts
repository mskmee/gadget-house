import { combineReducers, configureStore, Middleware } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { reducer as shoppingCartReducer } from './shopping_cart/shoppingCart_slice';
import { reducer as searchReducer } from './search/search_slice';
import { reducer as productsReducer } from './products';
import { reducer as authReducer } from './auth/auth-slice';
import { reducer as filtersReducer } from './filters/filters_slice';
import { reducer as orderReducer } from './orders/order_slice';
import { reducer as singleProductSlice} from './singleProduct/singleProduct_slice';

const reducers = combineReducers({
  shopping_card: shoppingCartReducer,
  search: searchReducer,
  products: productsReducer,
  auth: authReducer,
  filters: filtersReducer,
  order: orderReducer,
  singleProduct: singleProductSlice
});

const logger: Middleware = createLogger({ collapsed: true });

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
