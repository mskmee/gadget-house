import { IProductCard, IShoppingCard } from '@/interfaces/interfaces';
import { createSlice, PayloadAction, isAnyOf } from '@reduxjs/toolkit';
import {
  calculateCartTotalPrice,
  calculateItemTotalPrice,
  MAX_BASKET_ITEM_QUANTITY,
} from '@/utils/helpers/helpers';
import { Currency, Locale } from '@/enums/enums';
import {
  LocalStorageKey,
  localStorageService,
} from '@/utils/packages/local-storage';
import { createOrder } from './actions';

export interface IInitialState {
  products: IShoppingCard[];
  cardTotalAmount: number;
  cardTotalQuantity: number;
  currency: Currency;
  locale: Locale;
  isBasketPopupOpen: boolean;
  selectedProductId: number | null;
  orderId: number | null;
}
// Locale and Currency should be in the other slice in the future. Something like settings slice.

const initialState: IInitialState = {
  products:
    localStorageService.getItem<IShoppingCard[]>(
      LocalStorageKey.CART_PRODUCTS,
    ) || [],
  cardTotalAmount: parseFloat(
    localStorageService.getItem(LocalStorageKey.CART_TOTAL_AMOUNT) || '0',
  ),
  cardTotalQuantity: parseInt(
    localStorageService.getItem(LocalStorageKey.CART_QUANTITY) || '0',
  ),
  currency: Currency.UAH,
  locale: Locale.UA,
  isBasketPopupOpen: false,
  selectedProductId: null,
  orderId: null,
};

const shoppingCard_slice = createSlice({
  name: 'shopping_card',
  initialState,
  reducers: {
    addToStore: (state, { payload: product }: PayloadAction<IProductCard>) => {
      state.selectedProductId = product.id || null;
      state.isBasketPopupOpen = true;
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
        state.cardTotalQuantity = state.products.length;
        return;
      }

      if (updatedProduct.quantity >= MAX_BASKET_ITEM_QUANTITY) return;

      updatedProduct.quantity += 1;
      updatedProduct.totalPrice = calculateItemTotalPrice(
        updatedProduct.quantity,
        updatedProduct.price,
      );
      state.cardTotalAmount = calculateCartTotalPrice(state.products);
      state.cardTotalQuantity = state.products.length;
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
      state.cardTotalQuantity = state.products.length;
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
      state.cardTotalQuantity = state.products.length;
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
      state.cardTotalQuantity = state.products.length;
    },
    clearCart: (state) => {
      state.products = [];
      state.cardTotalAmount = 0;
      state.cardTotalQuantity = 0;
    },
    getTotal: (state) => {
      let { total, quantity } = state.products.reduce(
        (totalAmount, item) => {
          const { price, quantity } = item;
          const priceRes = price.toString().replace(/\s+/g, '');

          let itemTotalPrice = +priceRes * quantity;
          totalAmount.total += itemTotalPrice;
          totalAmount.quantity += quantity;

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
    closeBasketPopup: (state) => {
      state.isBasketPopupOpen = false;
      state.selectedProductId = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.fulfilled, (state, { payload }) => {
      state.orderId = payload;
    });
    builder.addMatcher(
      isAnyOf(createOrder.rejected, createOrder.pending),
      (state) => {
        state.orderId = null;
      },
    );
  },
});

export const { actions, reducer } = shoppingCard_slice;
