/* eslint-disable no-unused-vars */
import { ProductItemResponseDto, ProductsResponseDto } from '../types/types';

interface IProductsService {
  getAllProducts: (page: number, size: number) => Promise<ProductsResponseDto>;
  getPaginatedProducts: (
    categoryId: number | null,
    page: number,
    size: number,
  ) => Promise<ProductsResponseDto>;
  getByCategory: (
    categoryId: number,
    page: number,
    size: number,
    sort: string | null,
  ) => Promise<ProductsResponseDto>;
  getFilteredProducts: (params: {
    page: number;
    size: number;
    categoryId?: number;
    brandIds?: number[];
    attributes?: number[];
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
  }) => Promise<ProductsResponseDto>;
  getOneProductById: (id: string) => Promise<ProductItemResponseDto>;
  deleteProduct: (id: string) => Promise<void>;
  getSuggestions(query: string): Promise<string[]>;
  searchProducts(
    query: string,
    page: number,
    size: number,
    sort?: string,
  ): Promise<ProductsResponseDto>;
}

export { type IProductsService };
