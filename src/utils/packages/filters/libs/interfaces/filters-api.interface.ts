/* eslint-disable no-unused-vars */
import { AttributesResponseDto, BrandsResponseDto, CategoriesResponseDto } from '../types/types';

interface IFiltersApi {
  getAllBrands: () => Promise<BrandsResponseDto>;

  getAllCategories: () => Promise<CategoriesResponseDto>;

  getAllAttributes: () => Promise<AttributesResponseDto>;
}

export { type IFiltersApi };
