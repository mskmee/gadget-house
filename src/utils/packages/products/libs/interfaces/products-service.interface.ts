/* eslint-disable no-unused-vars */
import { ProductItemResponseDto, ProductsResponseDto } from '../types/types';

interface IProductsService {
  getAllProducts: (page: number, size: number) => Promise<ProductsResponseDto>;
  getPaginatedProducts: (categoryId: number | null, page: number, size: number) => Promise<ProductsResponseDto>;
  getByCategory: (categoryId: number, page: number, size: number) => Promise<ProductsResponseDto>;
  getOneProductById: (id: string) => Promise<ProductItemResponseDto>;
  deleteProduct: (id: string) => Promise<void>;
}

export { type IProductsService };
