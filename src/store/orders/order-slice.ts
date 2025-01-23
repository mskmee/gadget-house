import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import { createOrder } from './actions';
import { DataStatus } from '@/enums/data-status';

interface OrderState {
  orderId: number | null;
  dataStatus: DataStatus;
}

const initialState: OrderState = {
  orderId: null,
  dataStatus: DataStatus.IDLE,
};

const orderSlice = createSlice({
  name: 'order/order-success',
  initialState,
  reducers: {
    addOrderId: (state, action: PayloadAction<number>) => {
      state.orderId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.orderId = action.payload;
      state.dataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(createOrder.rejected, (state) => {
      state.dataStatus = DataStatus.REJECT;
    });
    builder.addMatcher(
      isAnyOf(createOrder.fulfilled, createOrder.rejected),
      (state) => {
        state.dataStatus = DataStatus.IDLE;
      },
    );
  },
});

export const { actions, reducer } = orderSlice;
