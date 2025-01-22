import { DeliveryMethodType } from "@/pages/OrderConfirmation/libs/enums/delivery-method";
import { PaymentMethodType } from "@/pages/OrderConfirmation/libs/enums/payment-method";

type OrderItem = {
  id: number;
  email: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  deliveryMethod: string,
  deliveryStatus: string,
  address: {
    addressLine: string,
    city: string,
    postalCode: string,
    countryName: string
  },
  postAddress: {
    city: string,
    department: string
  },
  isPaid: true,
  createdAt: string,
  total: number,
  orderItems: [
    {
      shortProductResponseDto: {
        id: number,
        name: string,
        price: number,
        images: [
          {
            link: string,
            order: number
          }
        ],
        available: true,
        rating: number
      },
      quantity: number,
      price: number
    }
  ],
  user: {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    role: string
  }
};

type CartItem = {
  productId: number,
  quantity: number,
}

type OrderDto = {
  fullName: string,
  email: string,
  phoneNumber: string,
  comment?: string,
  cartItems: CartItem[],
  address: {
    city: string,
    street: string,
    houseNumber?: string,
    flat?: string,
  },
  deliveryMethod: DeliveryMethodType,
  paymentMethod: PaymentMethodType,
};

type OrderResponseDto = {
  orderId: string,
}

export { type OrderItem, type OrderDto, type OrderResponseDto };
