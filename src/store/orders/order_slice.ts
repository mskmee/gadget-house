import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  filterByDateRange,
  filterByRange,
  filterByValue,
} from '@/utils/filters';
import { OrderItemResponseDto } from '@/utils/packages/orders/libs/types/types';

export interface IFiltersState {
  dateFrom?: string | null;
  dateTo?: string | null;
  priceFrom?: number | null;
  priceTo?: number | null;
  status?: string | null;
}

export interface IInitialState {
  filters: IFiltersState;
  orders: OrderItemResponseDto[];
  filteredOrders: OrderItemResponseDto[];
}

const initialState: IInitialState = {
  filters: {},
  orders: [],
  filteredOrders: [],
};

const order_slice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setFilterOrders(
      state,
      action: PayloadAction<{
        orders: OrderItemResponseDto[];
      }>,
    ) {
      state.orders = action.payload.orders;
      state.filteredOrders = action.payload.orders;
    },

    applyFilters(
      state,
      action: PayloadAction<{
        filters: IFiltersState;
      }>,
    ) {
      state.filters = action.payload.filters;

      of(state.orders)
        .pipe(
          // filter by price
          map((orders) =>
            orders.filter((order) =>
              filterByRange(
                order,
                state.filters,
                (o) => o.total,
                (f) => f.priceFrom,
                (f) => f.priceTo,
              ),
            ),
          ),
          // filter by status
          map((orders) =>
            orders.filter((order) =>
              filterByValue(
                order,
                state.filters.status,
                (o) => o.deliveryStatus,
                'case-insensitive',
              ),
            ),
          ),
          // Filter by date range
          map((orders) =>
            orders.filter((order) =>
              filterByDateRange(
                order,
                state.filters,
                (o) => o.createdAt,
                (f) => f.dateFrom,
                (f) => f.dateTo,
              ),
            ),
          ),
        )
        .subscribe((filtered) => {
          state.filteredOrders = filtered;
        });
    },
    clearFilters(state) {
      state.filters = {};
      state.filteredOrders = [];
    },
  },
});

export const { actions, reducer } = order_slice;
export const { setFilterOrders, applyFilters, clearFilters } = actions;
