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

  async getPaginatedProducts(categoryId: number | null, page: number, size: number): Promise<ProductsResponseDto> {
    return this.productsApi.getPaginatedProducts(categoryId, page, size);
  }

  async getFilteredProducts(
    params: {
      page: number,
      size: number,
      categoryId?: number,
      brandIds?: number[],
      attributes?: number[],
      minPrice?: number,
      maxPrice?: number,
      minCameraMP?: number,
      maxCameraMP?: number,
      sort?: string
    }
  ): Promise<ProductsResponseDto> {
    return this.productsApi.getFilteredProducts(params);
  }

  async getByCategory(categoryId: number, page: number, size: number): Promise<ProductsResponseDto> {
    return this.productsApi.getByCategory(categoryId, page, size);
  }
}

export { ProductsService };
