import { OrderApi } from "./order-api";
import { OrderDto, UpdateOrderDto } from "./order-type";

export const OrderService = {
  async createOrder(order: OrderDto): Promise<void> {
    try {
      await OrderApi.createOrder(order);
      console.log('Order successfully placed.');
    } catch (error) {
      console.error('Failed to place order:', error);
      throw error;
    }
  },

  async fetchOrderById(orderId: string) {
    try {
      const order = await OrderApi.getOrderById(orderId);
      console.log('Order fetched:', order);
      return order;
    } catch (error) {
      console.error('Failed to fetch order:', error);
      throw error;
    }
  },

  async cancelOrder(orderId: string) {
    try {
      await OrderApi.cancelOrder(orderId);
      console.log('Order successfully canceled.');
    } catch (error) {
      console.error('Failed to cancel order:', error);
      throw error;
    }
  },

  async updateOrder(orderId: string, updateData: UpdateOrderDto) {
    try {
      await OrderApi.updateOrderStatus(orderId, updateData);
      console.log('Order status updated.');
    } catch (error) {
      console.error('Failed to update order status:', error);
      throw error;
    }
  },
};
