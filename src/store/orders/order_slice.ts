import { IOrderItem } from "@/mock/order-list";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface IInitialState {
  orders: IOrderItem[];
  order: IOrderItem | null;
  selectedOrderId: string | null;
}

const initialState: IInitialState = {
  orders: [],
  order: null,
  selectedOrderId: null,
};

const order_slice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrder(state, { payload }: { payload: IOrderItem[] }) {
      state.orders = payload;
    },
    getOrderById(state, { payload: orderId }: PayloadAction<string | undefined> ) {
      state.orders.findIndex(
        (item) => item.id === orderId ? state.order = item : state.order = null,
      );
    },
  },
  extraReducers: () => {
  },
});

export const { setOrder, getOrderById } = order_slice.actions;

export const { actions, reducer } = order_slice;