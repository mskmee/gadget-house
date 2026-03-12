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

  async getPaginatedProducts(
    categoryId: number | null,
    page: number,
    size: number,
  ): Promise<ProductsResponseDto> {
    return request({
      method: HttpMethod.GET,
      url: ApiEndpoint.PRODUCTS,
      query: { categoryId, page, size },
    });
  }

  async getFilteredProducts(params: {
    page: number;
    size: number;
    name?: string;
    categoryId?: number;
    brandIds?: number[];
    attributeValueIds?: number[];
    minPrice?: number;
    maxPrice?: number;
    minMP?: string;
    maxMP?: string;
    colors?: string[];
    sort?: string[];
  }): Promise<ProductsResponseDto> {
    const queryParams: Record<string, any> = {};
    
    queryParams.pageable = {
      page: params.page,
      size: params.size,
      ...(params.sort && params.sort.length > 0 ? { sort: params.sort } : { sort: [] }),
    };

    if (params.name) {
      queryParams.name = params.name;
    }
    if (params.categoryId) {
      queryParams.categoryId = params.categoryId;
    }
    if (params.brandIds && params.brandIds.length > 0) {
      queryParams.brandIds = params.brandIds;
    }
    if (params.attributeValueIds && params.attributeValueIds.length > 0) {
      queryParams.attributeValueIds = params.attributeValueIds;
    }
    if (params.minPrice !== undefined) {
      queryParams.minPrice = params.minPrice;
    }
    if (params.maxPrice !== undefined) {
      queryParams.maxPrice = params.maxPrice;
    }
    if (params.minMP) {
      queryParams.minMP = params.minMP;
    }
    if (params.maxMP) {
      queryParams.maxMP = params.maxMP;
    }
    if (params.colors && params.colors.length > 0) {
      queryParams.colors = params.colors;
    }

    return request({
      method: HttpMethod.GET,
      url: `${ApiEndpoint.PRODUCTS}`,
      query: queryParams,
    });
  }

  async getByCategory(
    categoryId: number,
    page: number,
    size: number,
    sort: string | null,
  ): Promise<ProductsResponseDto> {
    return request({
      method: HttpMethod.GET,
      url: `${ApiEndpoint.PRODUCTS}`,
      query: { categoryId, page, size, sort },
    });
  }

  async getSuggestions(query: string): Promise<string[]> {
    return request({
      method: HttpMethod.GET,
      url: `${ApiEndpoint.PRODUCTS_SUGGESTIONS}`,
      query: { query },
    });
  }

  async searchProducts(
    query: string,
    page: number,
    size: number,
    sort?: string,
  ): Promise<ProductsResponseDto> {
    return request({
      method: HttpMethod.GET,
      url: ApiEndpoint.PRODUCTS_SEARCH,
      query: { query, page, size, sort },
    });
  }
}

export { ProductsApi };
