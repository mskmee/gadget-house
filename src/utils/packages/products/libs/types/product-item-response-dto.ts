import { ProductAttributeResponseDto } from './product-attribute-response-dto';
import { ProductCategoryResponseDto } from './product-category-response-dto';
import { ProductImage } from './product-image';

type ProductItemResponseDto = {
  id: number;
  shortDesc: string;
  categoryResponseDto: ProductCategoryResponseDto;
  productAttributeResponseDtos: ProductAttributeResponseDto[];
  images: ProductImage[];
  brand: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  rating: number;
  createdAt: string;
};

export { type ProductItemResponseDto };
