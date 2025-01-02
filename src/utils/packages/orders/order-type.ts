import { ProductItem } from "../products";

export type OrderDto = {
  id: string;
  fullName: string;
  email: string;
  phone: string,
  comment?: string,
  items: ProductItem[];
  address: {
    city: string;
    street: string;
    houseNumber?: string;
    flat?: string;
  };
  deliveryType: 'courier' | 'novaPoshta' | 'ukrPoshta';
  paymentType: 'afterChecking' | 'courier';
}

export type UpdateOrderDto = {
  status: 'pending' | 'shipped' | 'delivered' | 'canceled';
}
