import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { actions as productCardsActions } from '../store/shopping_cart/shoppingCart_slice';
import { actions as searchActions } from '../store/search/search_slice';
import { productsActions } from '../store/products';
import { actions as authActions } from '../store/auth/auth-slice';

const rootActions = {
  ...productCardsActions,
  ...searchActions,
  ...productsActions,
  ...authActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return useMemo(() => {
    return bindActionCreators(rootActions, dispatch);
  }, [dispatch]);
};
