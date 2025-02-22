import { ProductImage } from './product-image';

type ProductItem = {
  id: number;
  title: string;
  price: number;
  images: ProductImage[];
  available: boolean;
  rating: number;
  category: string;
};

export { type ProductItem };
