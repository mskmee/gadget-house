import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { orderList } from '@/mock/order-list';
import { DataStatus } from '@/enums/data-status';
import { filterOrders } from '@/utils/helpers/filter-orders';
import {
  OrderItemResponseDto,
  OrdersResponseDto,
} from '@/utils/packages/orders/libs/types/types';

const list = orderList(18);

export interface IFiltersState {
  dateFrom?: string | null;
  dateTo?: string | null;
  priceFrom?: number | null;
  priceTo?: number | null;
  status?: string | null;
}

export interface IInitialState {
  orders: OrdersResponseDto | null;
  activeOrder: OrderItemResponseDto | null;
  dataStatus: DataStatus;
  filters: IFiltersState;
  filteredOrders: OrderItemResponseDto[];
}

const initialState: IInitialState = {
  orders: list,
  activeOrder: null,
  dataStatus: DataStatus.IDLE,
  filters: {} as IFiltersState,
  filteredOrders: [],
};

const order_slice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setActiveOrder: (state, action) => {
      state.activeOrder = action.payload;
    },
    setFilters(state, action: PayloadAction<IFiltersState>) {
      state.filters = action.payload;

      if (state.orders) {
        state.filteredOrders = filterOrders(state.orders.page, action.payload);
      }
    },
    updateOrdersStatus: (state, action) => {
      const { ids, newStatus } = action.payload;
      if (!state.orders) return;

      state.filteredOrders = state.orders.page.map((order) =>
        ids.includes(order.id)
          ? { ...order, deliveryStatus: newStatus }
          : order,
      );
    },
  },
});

export const { actions, reducer } = order_slice;
export const { setActiveOrder, updateOrdersStatus, setFilters } = actions;
