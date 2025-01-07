/* eslint-disable no-unused-vars */
import { OrderItemResponseDto, OrdersResponseDto } from '../types/types';

interface IOrdersService {
  getAllOrders: () => Promise<OrdersResponseDto>;
  createOrder: () => Promise<OrderItemResponseDto>;
  patchOrder: (id: string, status: string) => Promise<OrderItemResponseDto>;
  getOneOrderById: (id: string) => Promise<OrderItemResponseDto>;
  deleteOrder: (id: string) => Promise<void>;
}

export { type IOrdersService };
