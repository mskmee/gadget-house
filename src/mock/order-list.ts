import { filters } from '@/components/Filters/consts';
import { OrderStatus } from '@/enums/order-status';
import {
  DeliveryMethod,
  DeliveryMethodType,
} from '@/pages/OrderConfirmation/libs/enums/delivery-method';
import {
  PaymentMethod,
  PaymentMethodType,
} from '@/pages/OrderConfirmation/libs/enums/payment-method';
import {
  IOrderItemProduct,
  IOrderItemAddress,
  ShortProductResponseDto,
} from '@/utils/packages/orders/libs/types/order-item-response-dto';
import { OrdersResponseDto } from '@/utils/packages/orders/libs/types/orders-response-dto';

const { images } = filters;

const getRandomDate = (): string => {
  const start = new Date(2023, 0, 1).getTime();
  const end = new Date().getTime();
  const randomTime = new Date(start + Math.random() * (end - start));

  return randomTime.toISOString();
};

const getRandomStatus = (): OrderStatus => {
  const statuses = Object.values(OrderStatus) as OrderStatus[];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

const generateRandomShortProduct = (): ShortProductResponseDto => ({
  id: Math.floor(Math.random() * 100).toString(),
  name: `Product ${Math.floor(Math.random() * 100)}`,
  href: `/product/${Math.floor(Math.random() * 100)}`,
  price: parseFloat((Math.random() * 500 + 1000).toFixed(2)),
  images: [
    {
      link: images[Math.floor(Math.random() * images.length)].link,
      order: 0,
    },
  ],
  code: Math.floor(Math.random() * 100).toString(),
  categoryId: Math.floor(Math.random() * 10) + 1,
  available: Math.random() > 0.2,
  rating: parseFloat((Math.random() * 5).toFixed(1)),
});

const generateRandomOrderItem = (): IOrderItemProduct => ({
  shortProductResponseDto: generateRandomShortProduct(),
  quantity: Math.floor(Math.random() * 5) + 1,
  price: parseFloat((Math.random() * 500 + 1000).toFixed(2)),
});

const generateRandomPhone = (): string => {
  const randomDigits = () => Math.floor(Math.random() * 10);
  return `(0${randomDigits()}${randomDigits()}) ${randomDigits()}${randomDigits()}${randomDigits()} ${randomDigits()}${randomDigits()} ${randomDigits()}${randomDigits()}`;
};

const getRandomDeliveryMethod = (): DeliveryMethodType => {
  const methods = Object.values(DeliveryMethod);
  const randomIndex = Math.floor(Math.random() * methods.length);
  return methods[randomIndex];
};

const getRandomPaymentMethod = (): PaymentMethodType => {
  const methods = Object.values(PaymentMethod);
  const randomIndex = Math.floor(Math.random() * methods.length);
  return methods[randomIndex];
};

const generateRandomContacts = (
  typeDelivery = getRandomDeliveryMethod(),
): IOrderItemAddress => {
  const randomDigits = () => Math.floor(Math.random() * 10);

  const contacts: IOrderItemAddress = {
    city: `City ${randomDigits()}${randomDigits()}`,
  };

  if (typeDelivery === DeliveryMethod.COURIER) {
    contacts.street = `Address ${randomDigits()}${randomDigits()} ${randomDigits()} ${randomDigits()}`;
    contacts.house = `${randomDigits()}${randomDigits()}`;
    contacts.flat = `${randomDigits()}${randomDigits()}`;
  } else {
    contacts.departmentNumber = `${randomDigits()}${randomDigits()}`;
  }

  return contacts;
};

export const orderList = (count: number): OrdersResponseDto => {
  return {
    page: Array.from({ length: count }, (_, i) => {
      const deliveryMethod = getRandomDeliveryMethod();
      return {
        id: `4814684-${i + 1}`,
        createdAt: getRandomDate(),
        deliveryStatus: getRandomStatus(),
        total: parseFloat((Math.random() * 99990 + 10).toFixed(2)),
        email: `user${i + 1}@example.com`,
        fullName: `Name ${i + 1}`,
        phoneNumber: generateRandomPhone(),
        deliveryMethod: getRandomDeliveryMethod(),
        paymentMethod: getRandomPaymentMethod(),
        comment: Math.random() > 0.5 ? `Comment ${i + 1}` : undefined,
        address: generateRandomContacts(deliveryMethod),
        orderItems: Array.from(
          { length: Math.floor(Math.random() * 5) + 1 },
          generateRandomOrderItem,
        ),
      };
    }),
    totalElements: count,
    currentPage: 1,
    totalPages: Math.ceil(count / 10),
  };
};
