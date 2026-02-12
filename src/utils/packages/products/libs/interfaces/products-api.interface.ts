/* eslint-disable no-unused-vars */
import { ProductItemResponseDto, ProductsResponseDto } from '../types/types';

interface IProductsApi {
  getAll: (page: number, size: number) => Promise<ProductsResponseDto>;
  getOne: (id: string) => Promise<ProductItemResponseDto>;
  delete: (id: string) => Promise<void>;
  getByCategory: (
    categoryId: number,
    page: number,
    size: number,
    sort: string | null,
  ) => Promise<ProductsResponseDto>;
  getPaginatedProducts: (
    categoryId: number | null,
    page: number,
    size: number,
  ) => Promise<ProductsResponseDto>;
  getFilteredProducts: (params: {
    page: number;
    size: number;
    name?: string;
    categoryId?: number;
    brandIds?: number[];
    attributeValueIds?: number[];
    minPrice?: number;
    maxPrice?: number;
    minMP?: string;
    maxMP?: string;
    colors?: string[];
    sort?: string[];
  }) => Promise<ProductsResponseDto>;
  getSuggestions(query: string): Promise<string[]>;
  searchProducts(
    query: string,
    page: number,
    size: number,
    sort?: string,
  ): Promise<ProductsResponseDto>;
}

export { type IProductsApi };
