

import { ProductItem } from "../products";

export type OrderDto = {
  fullName: string;
  email: string;
  phoneNumber: string,
  comment?: string,
  cartItems: ProductItem[];
  address: {
    city: string;
    street: string;
    houseNumber?: string;
    flat?: string;
  };
  deliveryMethod: 'courier' | 'novaPoshta' | 'ukrPoshta';
  paymentMethod: 'afterChecking' | 'courier';
}

export type UpdateOrderDto = {
  status: 'pending' | 'shipped' | 'delivered' | 'canceled';
}
