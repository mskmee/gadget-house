import { IProductsApi } from './libs/interfaces/interfaces';
import { ApiEndpoint, HttpMethod, request } from '../http';
import {
  PriceDTO,
  ProductItemResponseDto,
  ProductsResponseDto,
} from './libs/types/types';

class ProductsApi implements IProductsApi {
  async getAll(page: number, size: number): Promise<ProductsResponseDto> {
    return request({
      method: HttpMethod.GET,
      url: ApiEndpoint.PRODUCTS,
      query: { page, size },
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
  
  async getPaginatedProducts(categoryId: number | null, page: number,
    size: number): Promise<ProductsResponseDto> {
    return request({
      method: HttpMethod.GET,
      url: ApiEndpoint.PRODUCTS,
      query: { categoryId, page, size },
    });
  }
  
  async getFilteredProducts(
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

  async getByCategory(categoryId: number, page: number, size: number): Promise<ProductsResponseDto> {
    return request({
      method: HttpMethod.GET,
      url: `${ApiEndpoint.PRODUCTS}`,
      query: { categoryId, page, size },
    });
  }
}

export { ProductsApi };
