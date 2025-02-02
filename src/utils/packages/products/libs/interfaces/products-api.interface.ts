/* eslint-disable no-unused-vars */
import { ProductItemResponseDto, ProductsResponseDto } from '../types/types';

interface IProductsApi {
  getAll: (page: number, size: number) => Promise<ProductsResponseDto>;
  getOne: (id: string) => Promise<ProductItemResponseDto>;
  delete: (id: string) => Promise<void>;
  getFilteredProducts: (categoryId: number, brandIds: number[], price: { from: number; to: number }, attributeValueIds: number[]) => Promise<ProductsResponseDto>;
  getByCategory: (categoryId: number, page: number, size: number) => Promise<ProductsResponseDto>;
  getPaginatedProducts: (page: number, size: number) => Promise<ProductsResponseDto>;
}

export { type IProductsApi };

