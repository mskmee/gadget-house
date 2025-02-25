import { ApiEndpoint, HttpMethod, request } from '../http';
import { IOrdersApi } from './libs/interfaces/orders-api.interface';
import { OrderDto, OrderResponseDto } from './libs/types/order-item';
import { OrderItemResponseDto } from './libs/types/order-item-response-dto';
import { OrdersResponseDto } from './libs/types/orders-response-dto';

class OrdersApi implements IOrdersApi {
  async getAll(): Promise<OrdersResponseDto> {
    return request({
      method: HttpMethod.GET,
      url: ApiEndpoint.ORDERS,
    });
  }

  async getOne(id: string): Promise<OrderItemResponseDto> {
    return request({
      method: HttpMethod.GET,
      url: `${ApiEndpoint.ORDERS}/${id}`,
    });
  }

  async delete(id: string): Promise<void> {
    return request({
      method: HttpMethod.DELETE,
      url: `${ApiEndpoint.ORDERS}/${id}`,
    });
  }

  async patch(id: string, status: string): Promise<OrderItemResponseDto> {
    return request({
      method: HttpMethod.PATCH,
      url: `${ApiEndpoint.ORDERS}/${id}`,
      body: { status },
    });
  }

  async create(data: OrderDto): Promise<OrderResponseDto> {
    return request({
      method: HttpMethod.POST,
      url: ApiEndpoint.ORDERS,
      body: data,
    });
  }
}

export { OrdersApi };
