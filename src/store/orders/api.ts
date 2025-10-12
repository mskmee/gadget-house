import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../base-query';
import { OrdersResponseDto } from '@/utils/packages/orders/libs/types/orders-response-dto';
import { OrderItemResponseDto } from '@/utils/packages/orders/libs/types/order-item-response-dto';
import {
  OrderDto,
  OrderResponseDto,
} from '@/utils/packages/orders/libs/types/order-item';

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: baseQuery,
  tagTypes: ['Order'],
  endpoints: (builder) => ({
    getAllOrders: builder.query<OrdersResponseDto, void>({
      query: () => ({
        url: '/orders',
        method: 'GET',
      }),
      providesTags: ['Order'],
    }),

    getOrderById: builder.query<OrderItemResponseDto, string>({
      query: (id) => ({
        url: `/orders/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Order', id }],
    }),

    createOrder: builder.mutation<OrderResponseDto, OrderDto>({
      query: (data) => ({
        url: '/orders',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Order'],
    }),

    patchOrder: builder.mutation<
      OrderItemResponseDto,
      { id: string; status: string }
    >({
      query: ({ id, status }) => ({
        url: `/orders/${id}`,
        method: 'PATCH',
        params: { status: status.toUpperCase() },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Order', id },
        'Order',
      ],
    }),

    deleteOrder: builder.mutation<void, string>({
      query: (id) => ({
        url: `/orders/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Order'],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
  usePatchOrderMutation,
  useDeleteOrderMutation,
} = ordersApi;
