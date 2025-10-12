import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';

import { orderList } from '@/mock/order-list';
import { DataStatus } from '@/enums/data-status';
import {
  getAllOrders,
  getOneOrderById,
  patchOrder,
  patchMultipleOrders,
} from './actions';
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
  extraReducers: (builder) => {
    builder.addCase(getAllOrders.fulfilled, (state, { payload }) => {
      state.orders = payload;
      state.filteredOrders = filterOrders(payload.page, state.filters);
    });
    builder.addCase(getOneOrderById.fulfilled, (state, { payload }) => {
      state.activeOrder = payload;
    });
    builder.addCase(patchOrder.fulfilled, (state, { payload }) => {
      state.activeOrder = payload;
    });

    builder.addCase(patchMultipleOrders.fulfilled, () => {
      return;
    });

    builder.addMatcher(
      isAnyOf(
        getAllOrders.fulfilled,
        getOneOrderById.fulfilled,
        patchOrder.fulfilled,
        patchMultipleOrders.fulfilled,
      ),
      (state) => {
        state.dataStatus = DataStatus.FULFILLED;
      },
    );
    builder.addMatcher(
      isAnyOf(
        getAllOrders.rejected,
        getOneOrderById.rejected,
        patchOrder.rejected,
        patchMultipleOrders.rejected,
      ),
      (state) => {
        state.dataStatus = DataStatus.REJECT;
      },
    );
    builder.addMatcher(
      isAnyOf(
        getAllOrders.pending,
        getOneOrderById.pending,
        patchOrder.pending,
        patchMultipleOrders.pending,
      ),
      (state) => {
        state.dataStatus = DataStatus.PENDING;
      },
    );
  },
});

export const { actions, reducer } = order_slice;
export const { setActiveOrder, updateOrdersStatus, setFilters } = actions;
