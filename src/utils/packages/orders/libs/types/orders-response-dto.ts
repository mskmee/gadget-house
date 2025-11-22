import { OrderItemResponseDto } from './order-item-response-dto';

type OrdersResponseDto = {
  page: OrderItemResponseDto[];
  totalElements: number;
  currentPage: number;
  totalPages: number;
};

export { type OrdersResponseDto };
