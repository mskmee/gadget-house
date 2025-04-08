import { filters } from "@/components/Filters/consts";
import { OrderStatus } from "@/enums/order-status";
import { DeliveryMethod } from "@/pages/OrderConfirmation/libs/enums/delivery-method";
import { IOrderItemProduct } from "@/utils/packages/orders/libs/types/order-item-response-dto";
import { OrdersResponseDto } from "@/utils/packages/orders/libs/types/orders-response-dto";

const { images } = filters;

const getRandomDate = (): string => {
  const start = new Date(2023, 0, 1).getTime();
  const end = new Date().getTime();
  const randomTime = new Date(start + Math.random() * (end - start));

  return randomTime.toLocaleDateString("en-GB");
};

const getRandomStatus = (): OrderStatus => {
  const statuses = Object.values(OrderStatus);
  return statuses[Math.floor(Math.random() * statuses.length)];
};

const generateRandomProduct = (): IOrderItemProduct => ({
  id: Math.floor(Math.random() * 100).toString(),
  images: [images[Math.floor(Math.random() * images.length)].link],
  name: `Product ${Math.floor(Math.random() * 100)}`,
  totalPrice: parseFloat((Math.random() * 500 + 1000).toFixed(2)),
  quantity: Math.floor(Math.random() * 5) + 1,
  code: Math.floor(Math.random() * 100).toString(),
});

const generateRandomPhone = (): string => {
  const randomDigits = () => Math.floor(Math.random() * 10);
  return `(0${randomDigits()}${randomDigits()}) ${randomDigits()}${randomDigits()}${randomDigits()} ${randomDigits()}${randomDigits()} ${randomDigits()}${randomDigits()}`;
};

const getRandomDeliveryMethod = (): string => {
  const methods = Object.values(DeliveryMethod);
  const randomIndex = Math.floor(Math.random() * methods.length);
  return methods[randomIndex];
};

const generateRandomContacts = (typeDelivery = getRandomDeliveryMethod()) => {
  const randomDigits = () => Math.floor(Math.random() * 10);

  const contacts = {
    city: ``,
    departmentNumber: ``,
    street: ``,
    house: ``,
    flat: ``
  };

  if (typeDelivery === DeliveryMethod.COURIER) {
    contacts.city = `City ${randomDigits()}${randomDigits()}`;
    contacts.street = `Address ${randomDigits()}${randomDigits()} ${randomDigits()} ${randomDigits()}`;
    contacts.house = `${randomDigits()}${randomDigits()}`;
    contacts.flat = `${randomDigits()}${randomDigits()}`;
  } else {
    contacts.city = `City ${randomDigits()}${randomDigits()}`;
    contacts.departmentNumber = `${randomDigits()}${randomDigits()}`;
  }

  return contacts;
};

export const orderList = (count: number): OrdersResponseDto => {
  return {
    page: Array.from({ length: count }, (_, i) => ({
      id: `4814684-${i + 1}`,
      date: getRandomDate(),
      deliveryMethod: getRandomDeliveryMethod(),
      paymentMethod: getRandomDeliveryMethod(),
      email: `Comment ${i + 1}`,
      phoneNumber: generateRandomPhone(),
      status: getRandomStatus(),
      fullName: `Name ${i + 1}`,
      products: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, generateRandomProduct),
      address: generateRandomContacts(),
      totalPrice: parseFloat((Math.random() * 99990 + 10).toFixed(2)),
    })),
    totalElements: count,
    currentPage: 1,
    totalPages: 1
  }
}