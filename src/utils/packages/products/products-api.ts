import { IProductsApi } from './libs/interfaces/interfaces';
import { ApiEndpoint, HttpMethod, request } from '../http';
import {
  PaginatedProductsResponseDto,
  PriceDTO,
  ProductItemResponseDto,
  ProductsResponseDto,
} from './libs/types/types';

class ProductsApi implements IProductsApi {
  async getAll(page: number): Promise<ProductsResponseDto> {
    return request({
      method: HttpMethod.GET,
      url: ApiEndpoint.PRODUCTS,
      query: { page },
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

  async getPaginatedProducts(page: number,
    size: number = 10,
    sort: string[] = []): Promise<PaginatedProductsResponseDto> {
    return request({
      method: HttpMethod.GET,
      url: `${ApiEndpoint.PRODUCTS}`,
      query: { page, size, sort },
    });
  }

  async getByCategoryProducts(
    categoryId: number,
    brandIds: number[] = [],
    price: PriceDTO = { from: 0, to: Infinity },
    attributeValueIds: number[] = []): Promise<ProductsResponseDto> {
    return request({
      method: HttpMethod.GET,
      url: `${ApiEndpoint.PRODUCTS}`,
      query: {
        categoryId,
        brandIds: brandIds.join(','),
        priceFrom: price.from,
        priceTo: price.to,
        attributeValueIds: attributeValueIds.join(','),
      },
    });
  }
}

export { ProductsApi };
