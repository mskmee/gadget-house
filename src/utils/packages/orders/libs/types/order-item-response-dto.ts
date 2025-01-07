
type ProductItem = {
  productId: string,
  quantity: number,
}

type OrderItemResponseDto = {
  id: number;
  email: string,
  fullName: string,
  phoneNumber: string,
  deliveryMethod: string,
  deliveryStatus: string,
  comment?: string,
  address: {
    street: string,
    city: string,
    houseNumber?: string,
    flat?: string
  },
  cartItems: ProductItem[],
  // isPaid: true,
  // createdAt: string,
  // total: number
};

export { type OrderItemResponseDto };
