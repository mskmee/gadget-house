import { createSelector } from 'reselect';
import { RootState } from '@/store';
import { IGadget } from '@/mock/products';

export const selectAllProducts = (state: RootState): IGadget[] => state.products.products;

// фильтрация по категории
export const selectProductsByCategory = (category: string) =>
  createSelector(selectAllProducts, (products) =>
    products.filter((product) => product.category.toLowerCase() === category.toLowerCase())
);