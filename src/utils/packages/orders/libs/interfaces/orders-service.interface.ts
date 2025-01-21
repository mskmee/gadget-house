/* eslint-disable no-unused-vars */
import { OrderDto } from '../types/order-item';
import { OrderItemResponseDto, OrdersResponseDto } from '../types/types';

interface IOrdersService {
  getAllOrders: () => Promise<OrdersResponseDto>;
  createOrder: (data: OrderDto) => Promise<OrderDto>;
  patchOrder: (id: string, status: string) => Promise<OrderItemResponseDto>;
  getOneOrderById: (id: string) => Promise<OrderItemResponseDto>;
  deleteOrder: (id: string) => Promise<void>;
}

export { type IOrdersService };
