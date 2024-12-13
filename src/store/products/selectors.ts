import { createSelector } from 'reselect';
import { RootState } from '@/store';
import { IGadget } from '@/interfaces/interfaces';

export const selectAllProducts = (state: RootState): IGadget[] => state.products.productsData;

// фильтрация по категории
export const selectProductsByCategory = (category: string) =>
  createSelector(selectAllProducts, (products) =>
    products.filter((product) => product.category.toLowerCase() === category.toLowerCase())
);