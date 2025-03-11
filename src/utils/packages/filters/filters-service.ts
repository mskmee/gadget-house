import { IFiltersApi, IFiltersService } from './libs/interfaces/interfaces';
import { AttributesResponseDto, BrandsResponseDto, CategoriesResponseDto } from './libs/types/types';

class FiltersService implements IFiltersService {
  private filtersApi: IFiltersApi;
  constructor(filtersApi: IFiltersApi) {
    this.filtersApi = filtersApi;
  }

  async getAllBrands(): Promise<BrandsResponseDto> {
    return this.filtersApi.getAllBrands();
  }

  async getAllCategories(): Promise<CategoriesResponseDto> {
    return this.filtersApi.getAllCategories();
  }

  async getAllAttributes(): Promise<AttributesResponseDto> {
    return this.filtersApi.getAllAttributes();
  }
}

export { FiltersService };
