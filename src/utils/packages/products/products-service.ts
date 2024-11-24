import { IProductsService, IProductsApi } from './libs/interfaces/interfaces';
import {
  ProductItemResponseDto,
  ProductsResponseDto,
} from './libs/types/types';

class ProductsService implements IProductsService {
  private productsApi: IProductsApi;
  constructor(productsApi: IProductsApi) {
    this.productsApi = productsApi;
  }

  async getAllProducts(): Promise<ProductsResponseDto> {
    return this.productsApi.getAll();
  }

  async getOneProductById(id: string): Promise<ProductItemResponseDto> {
    return this.productsApi.getOne(id);
  }

  async deleteProduct(id: string): Promise<void> {
    return this.productsApi.delete(id);
  }
}

export { ProductsService };
