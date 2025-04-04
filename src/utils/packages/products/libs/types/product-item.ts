import { ProductImage } from './product-image';

type ProductItem = {
  id: number;
  name: string;
  href?: string;
  images: ProductImage[];
  rating: number;
  price: string;
  code: string;
  anotherColors: string[];
  isLiked: boolean;
  category?: string;
  available: boolean;
};

export { type ProductItem };
