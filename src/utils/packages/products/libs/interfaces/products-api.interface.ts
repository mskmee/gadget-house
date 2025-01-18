/* eslint-disable no-unused-vars */
import { CategoryProductsResponseDto, PaginatedProductsResponseDto, ProductItemResponseDto, ProductsResponseDto } from '../types/types';

interface IProductsApi {
  getAll: () => Promise<ProductsResponseDto>;
  getOne: (id: string) => Promise<ProductItemResponseDto>;
  delete: (id: string) => Promise<void>;
  getCategoryProducts: (name: string, categoryId: number, brandIds: number[], price: { from: number; to: number }, attributeValueIds: number[]) => Promise<CategoryProductsResponseDto>;
  getPaginatedProducts: (page: number, size: number, sort: string[]) => Promise<PaginatedProductsResponseDto>;
}

export { type IProductsApi };

