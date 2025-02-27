/* eslint-disable no-unused-vars */
import { ProductItemResponseDto, ProductsResponseDto } from '../types/types';

interface IProductsApi {
  getAll: (page: number, size: number) => Promise<ProductsResponseDto>;
  getOne: (id: string) => Promise<ProductItemResponseDto>;
  delete: (id: string) => Promise<void>;
  getByCategory: (categoryId: number, page: number, size: number) => Promise<ProductsResponseDto>;
  getPaginatedProducts: (categoryId: number | null, page: number, size: number) => Promise<ProductsResponseDto>;
}

export { type IProductsApi };
