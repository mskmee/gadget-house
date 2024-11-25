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
    getTotal: (state) => {
      let { total, quantity } = state.products.reduce(
        (totalAmount, item) => {
          const { price, quantity } = item;
          const priceRes = price.replace(/\s+/g, '');

          let itemTotalPrice = +priceRes * quantity;
          totalAmount.total += itemTotalPrice;
          totalAmount.quantity += quantity;
          console.log(totalAmount);
          return totalAmount;
        },
        {
          total: 0,
          quantity: 0,
        },
      );
      state.cardTotalAmount = total;
      state.cardTotalQuantity = quantity;
    },
  },
});
export const { actions, reducer } = shoppingCard_slice;
