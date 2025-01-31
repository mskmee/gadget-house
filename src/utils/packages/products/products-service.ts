import { IProductsService, IProductsApi } from './libs/interfaces/interfaces';
import {
  PaginatedProductsResponseDto,
  ProductItemResponseDto,
  ProductsResponseDto,
} from './libs/types/types';

class ProductsService implements IProductsService {
  private productsApi: IProductsApi;
  constructor(productsApi: IProductsApi) {
    this.productsApi = productsApi;
  }

  async getAllProducts(page: number): Promise<ProductsResponseDto> {
    return this.productsApi.getAll(page);
  }

  async getOneProductById(id: string): Promise<ProductItemResponseDto> {
    return this.productsApi.getOne(id);
  }

  async deleteProduct(id: string): Promise<void> {
    return this.productsApi.delete(id);
  }

  async getPaginatedProducts(page: number, size: number, sort: string[]): Promise<PaginatedProductsResponseDto> {
    return this.productsApi.getPaginatedProducts(page, size, sort);
  }

  async getByCategoryProducts(categoryId: number, brandIds: number[], price: { from: number; to: number }, attributeValueIds: number[]): Promise<ProductsResponseDto> {
    return this.productsApi.getByCategoryProducts(categoryId, brandIds, price, attributeValueIds);
  }

  async getByCategory(categoryId: number): Promise<ProductsResponseDto> {
    return this.productsApi.getByCategory(categoryId);
  }
}

export { ProductsService };
