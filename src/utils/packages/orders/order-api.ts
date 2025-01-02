import { request } from "../http";
import { OrderDto, UpdateOrderDto } from "./order-type";

const ORDER_BASE_URL = '/orders';

export const OrderApi = {
  createOrder: (order: OrderDto) =>
    request<void>({
      method: 'POST',
      url: ORDER_BASE_URL,
      body: order,
    }),

  getOrderById: (orderId: string) =>
    request<OrderDto>({
      method: 'GET',
      url: `${ORDER_BASE_URL}/{orderId}`,
      path: { orderId },
    }),

  cancelOrder: (orderId: string) =>
    request<void>({
      method: 'DELETE',
      url: `${ORDER_BASE_URL}/{orderId}`,
      path: { orderId },
    }),

  updateOrderStatus: (orderId: string, updateData: UpdateOrderDto) =>
    request<void>({
      method: 'PATCH',
      url: `${ORDER_BASE_URL}/{orderId}`,
      path: { orderId },
      body: updateData,
    }),
};
