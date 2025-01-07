/* eslint-disable no-unused-vars */
import { OrderItemResponseDto, OrdersResponseDto } from '../types/types';

interface IOrdersApi {
  getAll: () => Promise<OrdersResponseDto>;
  create: () => Promise<OrderItemResponseDto>;
  getOne: (id: string) => Promise<OrderItemResponseDto>;
  patch: (id: string, status: string) => Promise<OrderItemResponseDto>;
  delete: (id: string) => Promise<void>;
}

export { type IOrdersApi };

