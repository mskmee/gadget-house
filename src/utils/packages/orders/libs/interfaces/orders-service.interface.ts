/* eslint-disable no-unused-vars */
import { OrderData } from '../types/order-item';
import { OrderItemResponseDto, OrdersResponseDto } from '../types/types';

interface IOrdersService {
  getAllOrders: () => Promise<OrdersResponseDto>;
  createOrder: (data: OrderData) => Promise<OrderData>;
  patchOrder: (id: string, status: string) => Promise<OrderItemResponseDto>;
  getOneOrderById: (id: string) => Promise<OrderItemResponseDto>;
  deleteOrder: (id: string) => Promise<void>;
}

export { type IOrdersService };
