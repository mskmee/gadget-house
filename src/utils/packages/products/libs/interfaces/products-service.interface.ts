/* eslint-disable no-unused-vars */
import { ProductItemResponseDto, ProductsResponseDto } from '../types/types';

interface IProductsService {
  getAll: () => Promise<ProductsResponseDto>;
  getOne: (id: string) => Promise<ProductItemResponseDto>;
  delete: (id: string) => Promise<any>;
}

export { type IProductsService };
