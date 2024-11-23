import { ProductImage } from './product-image';

type ProductItem = {
  id: number;
  name: string;
  price: number;
  images: ProductImage[];
  available: boolean;
  rating: number;
};

export { type ProductItem };
