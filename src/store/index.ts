import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { reducer as shoppingCartReducer } from './shopping_cart/shoppingCart_slice';
import { reducer as searchReducer } from './search/search_slice';
import { reducer as productsReducer } from './products';

const reducers = combineReducers({
  shopping_card: shoppingCartReducer,
  search: searchReducer,
  products: productsReducer,
});

const logger = createLogger({ collapsed: true });

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
