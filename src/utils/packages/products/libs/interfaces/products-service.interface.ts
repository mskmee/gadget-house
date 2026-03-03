/* eslint-disable no-unused-vars */
import { ProductItemResponseDto, ProductsResponseDto } from '../types/types';
import { SearchProductsPayload } from '@/utils/helpers/filters-search-kit';

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
    attributeValueIds?: number[];
    minPrice?: number;
    maxPrice?: number;
    minCameraMP?: number;
    maxCameraMP?: number;
    sort?: string;
  }) => Promise<ProductsResponseDto>;
  getOneProductById: (id: string) => Promise<ProductItemResponseDto>;
  deleteProduct: (id: string) => Promise<void>;
  getSuggestions(query: string): Promise<string[]>;
  searchProducts(params: SearchProductsPayload): Promise<ProductsResponseDto>;
}

export { type IProductsService };
