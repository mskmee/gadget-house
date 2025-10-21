import { DeliveryMethodType } from '@/pages/OrderConfirmation/libs/enums/delivery-method';
import { PaymentMethodType } from '@/pages/OrderConfirmation/libs/enums/payment-method';

export interface IOrderItemProduct {
  shortProductResponseDto: ShortProductResponseDto;
  quantity: number;
  price: number;
}

export interface IOrderItemAddress {
  city: string;
  departmentNumber?: string;
  street?: string;
  house?: string;
  flat?: string;
}

type ShortProductResponseImage = {
  link: string;
  order: number;
};

export type ShortProductResponseDto = {
  id: string;
  name: string;
  href: string;
  price: number;
  images: ShortProductResponseImage[];
  code: string;
  categoryId: number;

  available: boolean;
  rating: number;
};

type OrderItemResponseDto = {
  id: string;
  createdAt: string;
  deliveryStatus: string;
  total: number;
  email: string;
  fullName: string;
  phoneNumber: string;
  deliveryMethod: DeliveryMethodType;
  paymentMethod: PaymentMethodType;
  comment?: string;
  address: IOrderItemAddress;
  orderItems: IOrderItemProduct[];
};

export { type OrderItemResponseDto };
