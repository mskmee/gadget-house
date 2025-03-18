import { ApiEndpoint, HttpMethod, request } from '../http';
import { IFiltersApi } from './libs/interfaces/interfaces';
import { AttributesResponseDto, BrandsResponseDto, CategoriesResponseDto } from './libs/types/types';

class FiltersApi implements IFiltersApi {
  async getAllBrands(): Promise<BrandsResponseDto> {
    return request({
      method: HttpMethod.GET,
      url: ApiEndpoint.BRANDS,
    });
  }

  async getAllCategories(): Promise<CategoriesResponseDto> {
    return request({
      method: HttpMethod.GET,
      url: ApiEndpoint.CATEGORIES,
    });
  }

  async getAllAttributes(): Promise<AttributesResponseDto> {
    return request({
      method: HttpMethod.GET,
      url: ApiEndpoint.ATTRIBUTES,
    });
  }
}

export { FiltersApi };
