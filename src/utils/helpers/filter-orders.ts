import dayjs from './dayis';

import { IFiltersState } from '@/store/orders/order_slice';
import { OrderItemResponseDto } from '@/utils/packages/orders/libs/types/types';

export const filterOrders = (
  orders: OrderItemResponseDto[],
  filters: IFiltersState
): OrderItemResponseDto[] => {
  return orders.filter((order) => {
    const orderDate = dayjs(order.createdAt);
    const from = filters.dateFrom ? dayjs(filters.dateFrom, 'DD/MM/YYYY') : null;
    const to = filters.dateTo ? dayjs(filters.dateTo, 'DD/MM/YYYY') : null;

    const matchesDate =
      (!from || orderDate.isSameOrAfter(from, 'day')) &&
      (!to || orderDate.isSameOrBefore(to, 'day'));

    const matchesPrice =
      (!filters.priceFrom || order.total >= filters.priceFrom) &&
      (!filters.priceTo || order.total <= filters.priceTo);

    const matchesStatus =
      !filters.status || order.deliveryStatus === filters.status;

    return matchesDate && matchesPrice && matchesStatus;
  });
};
