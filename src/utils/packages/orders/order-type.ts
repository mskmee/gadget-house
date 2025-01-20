

import { DeliveryMethodType, PaymentMethodType } from "@/pages/OrderConfirmation/libs/enums/enums";
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
  deliveryMethod: DeliveryMethodType;
  paymentMethod: PaymentMethodType;
}

export type UpdateOrderDto = {
  status: 'pending' | 'shipped' | 'delivered' | 'canceled';
}
