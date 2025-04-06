import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import { DataStatus } from "@/enums/data-status";
import { getAllOrders, getOneOrderById, patchOrder } from "./actions";
import { OrderItemResponseDto, OrdersResponseDto } from "@/utils/packages/orders/libs/types/types";
import { orderList } from "@/mock/order-list";

const list = orderList(18);

export interface IInitialState {
  orders: OrdersResponseDto | null;
  activeOrder: OrderItemResponseDto | null;
  dataStatus: DataStatus;
}

const initialState: IInitialState = {
  orders: list,
  activeOrder: null,
  dataStatus: DataStatus.IDLE
};

const order_slice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setActiveOrder: (state, action) => {
      state.activeOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllOrders.fulfilled, (state, { payload }) => {
      state.orders = payload;
    })
    builder.addCase(getOneOrderById.fulfilled, (state, { payload }) => {
      state.activeOrder = payload;
    })
    builder.addCase(patchOrder.fulfilled, (state, { payload }) => {
      state.activeOrder = payload;
    })

    builder.addMatcher(
      isAnyOf(
        getAllOrders.fulfilled,
        getOneOrderById.fulfilled,
        patchOrder.fulfilled),
      (state) => {
        state.dataStatus = DataStatus.FULFILLED;
      },
    );
    builder.addMatcher(
      isAnyOf(
        getAllOrders.rejected,
        getOneOrderById.rejected,
        patchOrder.rejected),
      (state) => {
        state.dataStatus = DataStatus.REJECT;
      },
    );
    builder.addMatcher(
      isAnyOf(
        getAllOrders.pending,
        getOneOrderById.pending,
        patchOrder.pending),
      (state) => {
        state.dataStatus = DataStatus.PENDING;
      },
    );
  },
});


export const { actions, reducer } = order_slice;
export const { setActiveOrder } = actions;