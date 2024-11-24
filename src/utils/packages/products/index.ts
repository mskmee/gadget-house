import { ProductsApi } from './products-api';
import { ProductsService } from './products-service';

const productsApi = new ProductsApi();
const productsService = new ProductsService(productsApi);

export { productsService };
export type {
  ProductImage,
  ProductItem,
  ProductsResponseDto,
  ProductItemResponseDto,
} from './libs/types/types';
