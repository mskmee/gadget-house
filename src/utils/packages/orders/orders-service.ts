import { IOrdersApi } from "./libs/interfaces/orders-api.interface";
import { IOrdersService } from "./libs/interfaces/orders-service.interface";
import { OrderDto, OrderResponseDto } from "./libs/types/order-item";
import { OrderItemResponseDto } from "./libs/types/order-item-response-dto";
import { OrdersResponseDto } from "./libs/types/orders-response-dto";


class OrdersService implements IOrdersService {
  private ordersApi: IOrdersApi;
  constructor(ordersApi: IOrdersApi) {
    this.ordersApi = ordersApi;
  }

  async getAllOrders(): Promise<OrdersResponseDto> {
    return this.ordersApi.getAll();
  }

  async getOneOrderById(id: string): Promise<OrderItemResponseDto> {
    return this.ordersApi.getOne(id);
  }

  async deleteOrder(id: string): Promise<void> {
    return this.ordersApi.delete(id);
  }

  async patchOrder(id: string, status: string): Promise<OrderItemResponseDto> {
    return this.ordersApi.patch(id, status);
  }

  async createOrder(data: OrderDto): Promise<OrderResponseDto> {
    return this.ordersApi.create(data);
  }
}

export { OrdersService };
