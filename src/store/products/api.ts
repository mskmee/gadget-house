import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../base-query';

export interface ProductImage {
  link: string;
  order: number;
}

export interface ProductItem {
  id: number;
  name: string;
  href: string;
  price: number;
  images: ProductImage[];
  code: string;
  categoryId: number;
  available: boolean;
  rating: number;
}

export interface ProductsSearchResponse {
  page: ProductItem[];
  totalElements: number;
  currentPage: number;
  totalPages: number;
}

export interface ProductsSearchParams {
  query: string;
  pageable?: {
    size?: number;
    page?: number;
  };
}

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: baseQuery,
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    searchProducts: builder.query<ProductsSearchResponse, ProductsSearchParams>(
      {
        query: ({ query, pageable }) => ({
          url: '/products/search',
          method: 'GET',
          params: {
            query,
            ...pageable,
          },
        }),
        providesTags: ['Product'],
      },
    ),
  }),
});

export const { useSearchProductsQuery } = productsApi;
