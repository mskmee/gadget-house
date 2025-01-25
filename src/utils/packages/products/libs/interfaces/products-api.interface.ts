/* eslint-disable no-unused-vars */
import { PaginatedProductsResponseDto, ProductItemResponseDto, ProductsResponseDto } from '../types/types';

interface IProductsApi {
  getAll: (page: number) => Promise<ProductsResponseDto>;
  getOne: (id: string) => Promise<ProductItemResponseDto>;
  delete: (id: string) => Promise<void>;
  getByCategoryProducts: (categoryId: number, brandIds: number[], price: { from: number; to: number }, attributeValueIds: number[]) => Promise<ProductsResponseDto>;
  getPaginatedProducts: (page: number, size: number, sort: string[]) => Promise<PaginatedProductsResponseDto>;
}

export { type IProductsApi };

