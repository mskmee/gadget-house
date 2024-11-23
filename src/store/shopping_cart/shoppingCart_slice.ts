import { IProductCard, IShoppingCard } from '@/interfaces/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  calculateCartTotalPrice,
  calculateItemTotalPrice,
  MAX_BASKET_ITEM_QUANTITY,
} from '@/utils/helpers/helpers';
import { Currency, Locale } from '@/enums/enums';

export interface IInitialState {
  products: IShoppingCard[];
  cardTotalAmount: number;
  cardTotalQuantity: number;
  currency: Currency;
  locale: Locale;
}
// Locale and Currency should be in the other slice in the future. Something like settings slice.

const initialState: IInitialState = {
  products: [],
  cardTotalAmount: 0,
  cardTotalQuantity: 0,
  currency: Currency.UAH,
  locale: Locale.UA,
};

const shoppingCard_slice = createSlice({
  name: 'shopping_card',
  initialState,
  reducers: {
    addToStore: (state, { payload: product }: PayloadAction<IProductCard>) => {
      const updatedProduct = state.products.find(
        (item) => item.id === product?.id,
      );
      if (!updatedProduct) {
        state.products = [
          ...state.products,
          {
            ...product,
            quantity: 1,
            totalPrice: calculateItemTotalPrice(1, product.price),
          },
        ];
        state.cardTotalAmount = calculateCartTotalPrice(state.products);
        return;
      }

      if (updatedProduct.quantity >= MAX_BASKET_ITEM_QUANTITY) return;

      updatedProduct.quantity += 1;
      updatedProduct.totalPrice = calculateItemTotalPrice(
        updatedProduct.quantity,
        updatedProduct.price,
      );
      state.cardTotalAmount = calculateCartTotalPrice(state.products);
    },
    deleteFromStore: (state, { payload: productId }: PayloadAction<number>) => {
      const productIndex = state.products.findIndex(
        (item) => item.id === productId,
      );
      if (productIndex >= 0) {
        state.products = [
          ...state.products.slice(0, productIndex),
          ...state.products.slice(productIndex + 1),
        ];
      }
      state.cardTotalAmount = calculateCartTotalPrice(state.products);
    },
    increaseItemQuantity: (
      state,
      { payload: productId }: PayloadAction<number>,
    ) => {
      const updatedProduct = state.products.find(
        (item) => item.id === productId,
      );
      if (
        !updatedProduct ||
        updatedProduct.quantity >= MAX_BASKET_ITEM_QUANTITY
      )
        return;
      updatedProduct.quantity += 1;
      updatedProduct.totalPrice = calculateItemTotalPrice(
        updatedProduct.quantity,
        updatedProduct.price,
      );
      state.cardTotalAmount = calculateCartTotalPrice(state.products);
    },
    decreaseItemQuantity: (
      state,
      { payload: productId }: PayloadAction<number>,
    ) => {
      const updatedProduct = state.products.find(
        (item) => item.id === productId,
      );
      if (!updatedProduct) return;

      updatedProduct.quantity -= 1;
      updatedProduct.totalPrice = calculateItemTotalPrice(
        updatedProduct.quantity,
        updatedProduct.price,
      );

      if (updatedProduct.quantity <= 0) {
        const productIndex = state.products.findIndex(
          (item) => item.id === productId,
        );
        if (productIndex >= 0) {
          state.products = [
            ...state.products.slice(0, productIndex),
            ...state.products.slice(productIndex + 1),
          ];
        }
      }

      state.cardTotalAmount = calculateCartTotalPrice(state.products);
    },
  },
});

export const { actions, reducer } = shoppingCard_slice;
