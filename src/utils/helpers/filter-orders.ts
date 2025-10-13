import dayjs from './dayis';

import { IFiltersState } from '@/store/orders/order_slice';
import { OrderItemResponseDto } from '@/utils/packages/orders/libs/types/types';

export const filterOrders = (
  orders: OrderItemResponseDto[],
  filters: IFiltersState,
): OrderItemResponseDto[] => {
  return orders.filter((order) => {
    const orderDate = dayjs(order.createdAt);
    const from = filters.dateFrom
      ? dayjs(filters.dateFrom, 'DD/MM/YYYY')
      : null;
    const to = filters.dateTo ? dayjs(filters.dateTo, 'DD/MM/YYYY') : null;

    const matchesDate =
      (!from || orderDate.isSameOrAfter(from, 'day')) &&
      (!to || orderDate.isSameOrBefore(to, 'day'));

    const matchesPrice =
      (filters.priceFrom === undefined ||
        filters.priceFrom === null ||
        order.total >= filters.priceFrom) &&
      (filters.priceTo === undefined ||
        filters.priceTo === null ||
        order.total <= filters.priceTo);

    const matchesStatus =
      !filters.status ||
      filters.status === '' ||
      order.deliveryStatus.toUpperCase() === filters.status.toUpperCase();

    return matchesDate && matchesPrice && matchesStatus;
  });
};
