/* eslint-disable no-unused-vars */
import { OrderData } from '../types/order-item';
import { OrderItemResponseDto, OrdersResponseDto } from '../types/types';

interface IOrdersApi {
  getAll: () => Promise<OrdersResponseDto>;
  create: (data: OrderData) => Promise<OrderData>;
  getOne: (id: string) => Promise<OrderItemResponseDto>;
  patch: (id: string, status: string) => Promise<OrderItemResponseDto>;
  delete: (id: string) => Promise<void>;
}

export { type IOrdersApi };

