import { IProductCard, IShoppingCard } from '@/interfaces/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { formatPrice, parsePrice } from '@/utils/formatPrice.ts';

export interface IInitialState {
  products: IShoppingCard[];
  cardTotalAmount: number;
  cardTotalQuantity: number;
}

const initialState: IInitialState = {
  products: [],
  cardTotalAmount: 0,
  cardTotalQuantity: 0,
};

const shoppingCard_slice = createSlice({
  name: 'shopping_card',
  initialState,
  reducers: {
    addToStore: (
      state,
      { payload: product }: PayloadAction<IProductCard | null>,
    ) => {
      const productIndex = state.products.findIndex(
        (item) => item.id === product?.id,
      );
      if (state?.products[productIndex]?.quantity >= 0) {
        if (state.products[productIndex].quantity === 20) {
          state.products[productIndex].quantity = 20;
        } else {
          state.products[productIndex].quantity += 1;
        }
      } else {
        const copyCardItems: unknown = [
          ...state.products,
          { ...product, quantity: 1, totalPrice: product?.price },
        ];
        state.products = copyCardItems as IShoppingCard[];
      }
      if (productIndex >= 0) {
        state.products[productIndex].totalPrice =
          formatPrice(state.products[productIndex].quantity *
          parsePrice(state.products[productIndex].price));
      }
      state.cardTotalAmount = calculateCartTotalPrice(state.products);
    },
    deleteFromStore: (
      state,
      { payload: productId }: PayloadAction<number>,
    ) => {
      const productIndex = state.products.findIndex(
        (item) => item.id === productId,
      );
      if (productIndex >= 0) {
        state.products.splice(productIndex, 1);
      }
      state.cardTotalAmount = calculateCartTotalPrice(state.products);
    },
    increaseItemQuantity: (
      state,
      { payload: productId }: PayloadAction<number>,
    ) => {
      const item = state.products.find((item) => item.id === productId);
      if(item.quantity < 20) {
        item.quantity++;
        item.totalPrice = formatPrice(item.quantity * parsePrice(item.price));
      }
      state.cardTotalAmount = calculateCartTotalPrice(state.products);
    },
    decreaseItemQuantity: (
      state,
      { payload: productId }: PayloadAction<number>,
    ) => {
      const item = state.products.find((item) => item.id === productId);
      item.quantity--;
      item.totalPrice = formatPrice(item.quantity * parsePrice(item.price));
      if(item.quantity === 0) shoppingCard_slice.caseReducers.deleteFromStore(state, { payload: productId });
      state.cardTotalAmount = calculateCartTotalPrice(state.products);
     },
  },
});

export const calculateCartTotalPrice = (products: IShoppingCard[]): string => {
  return formatPrice(
    products.reduce((total, item) => total + item.quantity * parsePrice(item.price), 0)
  );
};
export const { actions, reducer } = shoppingCard_slice;
