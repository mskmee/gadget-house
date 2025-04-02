import { IProductsApi } from './libs/interfaces/interfaces';
import { ApiEndpoint, HttpMethod, request } from '../http';
import {
  // PriceDTO,
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
    return request({
      method: HttpMethod.GET,
      url: `${ApiEndpoint.PRODUCTS}`,
      query: {
        page: params.page,
        size: params.size,
        categoryId: params.categoryId,
        brandIds: params.brandIds && params.brandIds.join(','),
        attributes: params.attributes && params.attributes.join(','),
        minPrice: params.minPrice,
        maxPrice: params.maxPrice,
        minCameraMP: params.minCameraMP,
        maxCameraMP: params.maxCameraMP,
        sort: params.sort
      },
    });
  }

  async getByCategory(categoryId: number, page: number, size: number, sort: string | null): Promise<ProductsResponseDto> {
    return request({
      method: HttpMethod.GET,
      url: `${ApiEndpoint.PRODUCTS}`,
      query: { categoryId, page, size, sort },
    });
  }
}

export { ProductsApi };
