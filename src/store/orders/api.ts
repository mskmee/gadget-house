import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../base-query';
import { OrdersResponseDto } from '@/utils/packages/orders/libs/types/orders-response-dto';
import { OrderItemResponseDto } from '@/utils/packages/orders/libs/types/order-item-response-dto';
import {
  OrderDto,
  OrderResponseDto,
} from '@/utils/packages/orders/libs/types/order-item';
import { type DeliveryMethodType } from '@/pages/OrderConfirmation/libs/enums/delivery-method';
import { DEFAULT_SIZE } from '@/constants/pagination';
import { PageableParams } from '@/interfaces/pageable-params.interface';
import { cleanOrderParams } from '@/utils/helpers/clean-params.util';

export interface OrderFilterParams {
  deliveryMethods?: DeliveryMethodType[] | null;
  statuses?: string[] | null;
  isPaid?: boolean | null;
  createdBefore?: string | null;
  createdAfter?: string | null;
  totalMore?: number | null;
  totalLess?: number | null;
}

export interface IPatchOrderStatus {
  id: string;
  status: string;
}

export interface IPutOrder {
  orderId: string;
  body: OrderDto;
}

export const DEFAULT_ORDER_PARAMS: PageableParams = {
  page: 0,
  size: DEFAULT_SIZE,
};

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: baseQuery,
  tagTypes: ['Order'],
  endpoints: (builder) => ({
    getAllOrders: builder.query<
      OrdersResponseDto,
      PageableParams | OrderFilterParams | void
    >({
      query: (params) => ({
        url: '/orders',
        params: cleanOrderParams({
          ...DEFAULT_ORDER_PARAMS,
          ...params,
        }),
      }),
      providesTags: ['Order'],
    }),
    getOrder: builder.query<OrderItemResponseDto, string>({
      query: (orderId) => `/orders/${orderId}`,
      providesTags: (_, __, id) => [{ type: 'Order', id }],
    }),

    createOrder: builder.mutation<OrderResponseDto, OrderDto>({
      query: (data) => ({
        url: '/orders',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Order'],
    }),

    patchOrder: builder.mutation<OrderItemResponseDto, IPatchOrderStatus>({
      query: ({ id, status }) => ({
        url: `/orders/${id}`,
        method: 'PATCH',
        params: { status: status.toUpperCase() },
      }),
      invalidatesTags: (_, __, { id }) => [{ type: 'Order', id }, 'Order'],
    }),
    putOrder: builder.mutation<OrderItemResponseDto, IPutOrder>({
      query: ({ orderId, body }) => ({
        url: `/orders/${orderId}`,
        method: 'PUT',
        body: body,
      }),
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetOrderQuery,
  useCreateOrderMutation,
  usePatchOrderMutation,
  usePutOrderMutation,
} = ordersApi;
