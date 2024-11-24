import { ProductItem } from './product-item';

type ProductsResponseDto = {
  page: ProductItem[];
  totalElements: number;
  currentPage: number;
  totalPages: number;
  minPrice: number | null;
  maxPrice: number | null;
};

export { type ProductsResponseDto };
