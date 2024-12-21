type PriceDTO = {
  from: number;
  to: number;
};

type CategoryProductsResponseDto = {
  name: string;
  price: PriceDTO;
  brandIds: number[];
  categoryId: number;
  attributeValueIds: number[];
};

export { type CategoryProductsResponseDto, type PriceDTO };
