import { ApiEndpoint, HttpMethod, request } from '../http';
import { IProductsService } from './libs/interfaces/interfaces';
import {
  ProductItemResponseDto,
  ProductsResponseDto,
} from './libs/types/types';

class ProductsService implements IProductsService {
  constructor() {}

  async getAll(): Promise<ProductsResponseDto> {
    return request({
      method: HttpMethod.GET,
      url: ApiEndpoint.PRODUCTS,
    });
  }

  async getOne(id: string): Promise<ProductItemResponseDto> {
    return request({
      method: HttpMethod.GET,
      url: `${ApiEndpoint.PRODUCTS}/${id}`,
    });
  }

  async delete(id: string): Promise<void> {
    return request({
      method: HttpMethod.DELETE,
      url: `${ApiEndpoint.PRODUCTS}/${id}`,
    });
  }
}

export { ProductsService };
