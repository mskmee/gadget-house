type OrderItemProduct = {
  id: string;
  quantity: number;
};

export interface IOrderItemProduct extends OrderItemProduct {
  images: string[];
  totalPrice: number;
  name: string;
  code: string;
}

export interface IOrderItemAddress {
  city: string;
  departmentNumber?: string;
  street?: string;
  house?: string;
  flat?: string;
}

type OrderItemResponseDto = {
  id: string;
  createdAt: string;
  deliveryStatus: string;
  total: number;
  email: string;
  fullName: string;
  phoneNumber: string;
  deliveryMethod: string;
  paymentMethod: string;
  comment?: string;
  address: IOrderItemAddress;
  products: IOrderItemProduct[];
};

export { type OrderItemResponseDto };
