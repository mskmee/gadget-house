import { filterByValue } from '../filters';
import { OrderItemResponseDto } from '../packages/orders/libs/types/order-item-response-dto';
import { formatPhoneDisplay } from './formatPhoneNumber';

export const searchOrder = (
  order: OrderItemResponseDto,
  search: string,
): boolean => {
  const searchLower = search.toLowerCase().trim();

  if (!searchLower) return true;

  if (order.id.toString().includes(searchLower)) return true;

  if (order.phoneNumber?.toLowerCase().includes(searchLower)) return true;

  const formattedPhone = formatPhoneDisplay(order.phoneNumber);
  if (formattedPhone?.toLowerCase().includes(searchLower)) return true;

  return false;
};
