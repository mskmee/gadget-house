import { filterByValue } from '../filters';
import { OrderItemResponseDto } from '../packages/orders/libs/types/order-item-response-dto';
import { formatPhoneDisplay } from './formatPhoneNumber';

export const searchOrder = (
  order: OrderItemResponseDto,
  search: string,
): boolean =>
  filterByValue(order, search, (o) => `${o.id}`) ||
  filterByValue(order, search, (o) => o.phoneNumber) ||
  filterByValue(order, search, (o) => formatPhoneDisplay(o.phoneNumber));
