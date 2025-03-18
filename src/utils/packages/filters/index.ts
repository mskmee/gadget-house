import { FiltersApi } from './filters-api';
import { FiltersService } from './filters-service';

const filtersApi = new FiltersApi();
const filtersService = new FiltersService(filtersApi);

export { filtersService };

export type {
  BrandsResponseDto,
  CategoriesResponseDto,
  AttributesResponseDto
} from './libs/types/types';
