/* eslint-disable no-unused-vars */
import { ProductItemResponseDto, ProductsResponseDto } from '../types/types';

interface IProductsService {
  getAllProducts: () => Promise<ProductsResponseDto>;
  getOneProductById: (id: string) => Promise<ProductItemResponseDto>;
  deleteProduct: (id: string) => Promise<void>;
}

export { type IProductsService };
