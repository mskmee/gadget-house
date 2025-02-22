import { IProductCard } from '@/interfaces/interfaces';
// import { ProductItem } from './product-item';

type ProductsResponseDto = {
  page: IProductCard[];
  totalElements: number;
  currentPage: number;
  totalPages: number;
  minPrice: number | null;
  maxPrice: number | null;
};

export { type ProductsResponseDto };
