import { ApiEndpoint, HttpMethod, request } from "../http";
import { IOrdersApi } from "../products/libs/interfaces/orders-api.interface";
import { OrderItemResponseDto } from "../products/libs/types/order-item-response-dto";
import { OrdersResponseDto } from "../products/libs/types/orders-response-dto";

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

  async create(): Promise<OrderItemResponseDto> {
    return request({
      method: HttpMethod.POST,
      url: ApiEndpoint.ORDERS,
    });
  }
}

export { OrdersApi };