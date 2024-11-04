import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { actions as productCardsActions } from '../store/shopping_cart/shoppingCart_slice';
import { actions as searchActions } from '../store/search/search_slice';

const rootActions = {
  ...productCardsActions,
  ...searchActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return useMemo(() => {
    return bindActionCreators(rootActions, dispatch);
  }, [dispatch]);
};
