import { ApiEndpoint, HttpMethod, request } from "../http";
import { IOrdersApi } from "./libs/interfaces/orders-api.interface";
import { OrderData } from "./libs/types/order-item";
import { OrderItemResponseDto } from "./libs/types/order-item-response-dto";
import { OrdersResponseDto } from "./libs/types/orders-response-dto";

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

  async create(data: OrderData): Promise<OrderData> {
    return request({
      method: HttpMethod.POST,
      url: ApiEndpoint.ORDERS,
      body: {
        "fullName": data.fullName,
        "email": data.email,
        "phoneNumber": data.phoneNumber,
        "comment": data.comment,
        "cartItems": data.cartItems.map((item) =>
        ({
          "productId": item.productId,
          "quantity": item.quantity
        })
        ),
        "address": {
          "city": data.address.city,
          "street": data.address.street,
          "houseNumber": data.address.houseNumber,
          "flat": data.address.flat
        },
        "deliveryMethod": data.deliveryMethod,
        "paymentMethod": data.paymentMethod
      },
    });
  }
}

export { OrdersApi };