/* eslint-disable no-unused-vars */
import { ProductItemResponseDto, ProductsResponseDto } from '../types/types';

interface IProductsService {
  getAllProducts: (page: number, size: number) => Promise<ProductsResponseDto>;
  getPaginatedProducts: (page: number, size: number) => Promise<ProductsResponseDto>;
  getFilteredProducts: (categoryId: number, brandIds: number[], price: { from: number; to: number }, attributeValueIds: number[]) => Promise<ProductsResponseDto>;
  getByCategory: (categoryId: number, page: number, size: number) => Promise<ProductsResponseDto>;
  getOneProductById: (id: string) => Promise<ProductItemResponseDto>;
  deleteProduct: (id: string) => Promise<void>;
}

export { type IProductsService };
