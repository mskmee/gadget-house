import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  OrderDto,
  CartItem,
} from '@/utils/packages/orders/libs/types/order-item';
import { RootState } from '..';

type IInitialState = OrderDto | null;

const initialState: IInitialState = null;

const orderDtoSlice = createSlice({
  name: 'orderDto',
  initialState: initialState as IInitialState,
  reducers: {
    setOrderDto: (_, { payload }: PayloadAction<OrderDto>) => payload,
    updateOrderDto: (state, { payload }: PayloadAction<Partial<OrderDto>>) =>
      state ? { ...state, ...payload } : state,
    clearOrderDto: () => null,
    addCartItem: (state, { payload }: PayloadAction<CartItem>) => {
      return state
        ? {
            ...state,
            cartItems: [...state.cartItems, payload],
          }
        : state;
    },
    deleteCartItem: (
      state,
      { payload }: PayloadAction<{ productId: number }>,
    ) => {
      return state
        ? {
            ...state,
            cartItems: state.cartItems.filter(
              (item) => item.productId !== payload.productId,
            ),
          }
        : state;
    },
  },
});

export const selectOrderDto = (state: RootState) => state.orderDto;

export const {
  setOrderDto,
  updateOrderDto,
  clearOrderDto,
  addCartItem,
  deleteCartItem,
} = orderDtoSlice.actions;

export const reducer = orderDtoSlice.reducer;
