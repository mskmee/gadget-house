import { IProductsService, IProductsApi } from './libs/interfaces/interfaces';
import {
  CategoryProductsResponseDto,
  PaginatedProductsResponseDto,
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

  async getPaginatedProducts(page: number, size: number, sort: string[]): Promise<PaginatedProductsResponseDto> {
    return this.productsApi.getPaginatedProducts(page, size, sort);
  }

  async getCategoryProducts(categoryId: number, brandIds: number[], price: { from: number; to: number }, attributeValueIds: number[]): Promise<CategoryProductsResponseDto> {
    return this.productsApi.getCategoryProducts(categoryId, brandIds, price, attributeValueIds);
  }
}

export { ProductsService };
