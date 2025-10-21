import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  OrderDto,
  CartItem,
  Address,
} from '@/utils/packages/orders/libs/types/order-item';
import { RootState } from '..';

type IInitialState = OrderDto | null;

const initialState: IInitialState = null;

const orderDtoSlice = createSlice({
  name: 'orderDto',
  initialState: initialState as IInitialState,
  reducers: {
    setOrderDto: (_, { payload }: PayloadAction<OrderDto>) => payload,

    setFieldValue: <K extends keyof OrderDto>(
      state: IInitialState,
      { payload }: PayloadAction<{ field: K; value: OrderDto[K] }>,
    ) => {
      if (state) {
        state[payload.field] = payload.value;
      }
    },

    updateOrderDto: (state, { payload }: PayloadAction<Partial<OrderDto>>) => {
      if (state) {
        Object.assign(state, payload);
      }
    },

    clearOrderDto: () => null,

    addCartItem: (state, { payload }: PayloadAction<CartItem>) => {
      if (state) {
        state.cartItems.push(payload);
      }
    },

    deleteCartItem: (
      state,
      { payload }: PayloadAction<{ productId: string }>,
    ) => {
      if (state) {
        state.cartItems = state.cartItems.filter(
          (item: CartItem) => item.productId !== payload.productId,
        );
      }
    },

    updateAddress: (state, { payload }: PayloadAction<Address>) => {
      if (state) {
        state.address = { ...state.address, ...payload };
      }
    },
  },
});

export const selectOrderDto = (state: RootState) => state.orderDto;

export const {
  setOrderDto,
  updateOrderDto,
  setFieldValue,
  clearOrderDto,
  addCartItem,
  deleteCartItem,
  updateAddress,
} = orderDtoSlice.actions;

export const reducer = orderDtoSlice.reducer;
