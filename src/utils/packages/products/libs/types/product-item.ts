import { ProductImage } from './product-image';

type ProductItem = {
  id: number;
  name: string;
  price: number;
  images: ProductImage[];
  available: boolean;
  rating: number;
  category: string;
};

export { type ProductItem };
