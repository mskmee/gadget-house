/* eslint-disable no-unused-vars */
// import { ProductByCategoryDto } from '../types/product-category-response-dto';
import { PaginatedProductsResponseDto, ProductItemResponseDto, ProductsResponseDto } from '../types/types';

interface IProductsService {
  getAllProducts: (page: number) => Promise<ProductsResponseDto>;
  getPaginatedProducts: (page: number, size: number, sort: string[]) => Promise<PaginatedProductsResponseDto>;
  getByCategoryProducts: (categoryId: number, brandIds: number[], price: { from: number; to: number }, attributeValueIds: number[]) => Promise<ProductsResponseDto>;
  getByCategory: (categoryId: number) => Promise<ProductsResponseDto>;
  getOneProductById: (id: string) => Promise<ProductItemResponseDto>;
  deleteProduct: (id: string) => Promise<void>;
}

export { type IProductsService };
