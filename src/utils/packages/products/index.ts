import { ProductsService } from './products-service';

const productsService = new ProductsService();

export { productsService };
export type {
  ProductImage,
  ProductItem,
  ProductsResponseDto,
} from './libs/types/types';
