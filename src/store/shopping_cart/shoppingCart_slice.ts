import { IProductCard, IShoppingCard } from '@/interfaces/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
          { ...product, quantity: 1 },
        ];
        state.products = copyCardItems as IShoppingCard[];
      }
    },
  },
});
export const { actions, reducer } = shoppingCard_slice;
