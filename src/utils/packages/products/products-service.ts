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

  async getAllProducts(page: number, size: number): Promise<ProductsResponseDto> {
    return this.productsApi.getAll(page, size);
  }

  async getOneProductById(id: string): Promise<ProductItemResponseDto> {
    return this.productsApi.getOne(id);
  }

  async deleteProduct(id: string): Promise<void> {
    return this.productsApi.delete(id);
  }

  async getPaginatedProducts(page: number, size: number): Promise<ProductsResponseDto> {
    return this.productsApi.getPaginatedProducts(page, size);
  }

  async getFilteredProducts(categoryId: number, brandIds: number[], price: { from: number; to: number }, attributeValueIds: number[]): Promise<ProductsResponseDto> {
    return this.productsApi.getFilteredProducts(categoryId, brandIds, price, attributeValueIds);
  }

  async getByCategory(categoryId: number, page: number, size: number): Promise<ProductsResponseDto> {
    return this.productsApi.getByCategory(categoryId, page, size);
  }
}

export { ProductsService };
