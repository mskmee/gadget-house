// src/hooks/rootActions.ts
import { actions as productCardsActions } from '../store/shopping_cart/shoppingCart_slice';
import { actions as searchActions } from '../store/search/search_slice';
import { productsActions } from '../store/products';
import { actions as authActions } from '../store/auth/auth-slice';
import { actions as filtersActions } from '@/store/filters/filters_slice';
import { actions as singleProductSlice } from '../store/singleProduct/singleProduct_slice';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/store';

export const rootActions = {
  ...productCardsActions,
  ...searchActions,
  ...productsActions,
  ...authActions,
  ...filtersActions,
  ...singleProductSlice,
} as const;

export type RootActions = typeof rootActions;




export const useActions = (): RootActions => {
  const dispatch = useDispatch<AppDispatch>();

 
  return useMemo(
    () =>
      bindActionCreators(
        rootActions as unknown as Record<string, any>,
        dispatch
      ) as RootActions, 
    [dispatch]
  );
};