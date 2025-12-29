import { OrderStatus } from '@/enums/order-status';
import { DeliveryMethodType } from '@/pages/OrderConfirmation/libs/enums/delivery-method';
import { PaymentMethodType } from '@/pages/OrderConfirmation/libs/enums/payment-method';

export type OrderItem = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  deliveryMethod: string;
  deliveryStatus: string;
  address: {
    addressLine: string;
    city: string;
    postalCode: string;
    countryName: string;
  };
  postAddress: {
    city: string;
    department: string;
  };
  isPaid: true;
  createdAt: string;
  total: number;
  orderItems: [
    {
      shortProductResponseDto: {
        id: number;
        name: string;
        price: number;
        images: [
          {
            link: string;
            order: number;
          },
        ];
        available: true;
        rating: number;
      };
      quantity: number;
      price: number;
    },
  ];
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export interface OrderDto {
  fullName: string;
  email: string;
  phoneNumber: string;
  comment?: string;
  cartItems: CartItem[];
  address: Address;
  deliveryMethod: DeliveryMethodType;
  paymentMethod: PaymentMethodType;
  deliveryStatus: OrderStatus;
}

export type Address = {
  city: string;
  street?: string;
  departmentNumber?: string;
  houseNumber?: string;
  flat?: string;
};

export type OrderResponseDto = number;
