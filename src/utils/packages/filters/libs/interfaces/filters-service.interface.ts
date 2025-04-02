/* eslint-disable no-unused-vars */
import { AttributesResponseDto, BrandsResponseDto, CategoriesResponseDto } from '../types/types';

interface IFiltersService {
  getAllBrands: () => Promise<BrandsResponseDto>;
  getAllCategories: () => Promise<CategoriesResponseDto>;
  getAllAttributes: () => Promise<AttributesResponseDto>;
}

export { type IFiltersService };
