/* eslint-disable no-unused-vars */
import { OrderDto, OrderResponseDto } from '../types/order-item';
import { OrderItemResponseDto, OrdersResponseDto } from '../types/types';

interface IOrdersApi {
  getAll: () => Promise<OrdersResponseDto>;
  create: (data: OrderDto) => Promise<OrderResponseDto>;
  getOne: (id: string) => Promise<OrderItemResponseDto>;
  patch: (id: string, status: string) => Promise<OrderItemResponseDto>;
  delete: (id: string) => Promise<void>;
}

export { type IOrdersApi };
