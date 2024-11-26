import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { generateGadgets } from "@/mock/products";
import { IGadget } from "@/interfaces/interfaces";
const productsData = generateGadgets(500);

interface ProductsState {
  products: IGadget[];
}

const initialState: ProductsState = {
  products: productsData,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProducts(state, action: PayloadAction<IGadget[]>) {
      state.products = action.payload;
    },
    toggleLike(state, action: PayloadAction<number>) {
      const product = state.products.find((p) => p.id === action.payload);
      if (product) {
        product.isLiked = !product.isLiked;
      }
    },
  },
});

export const { toggleLike, getProducts } = productsSlice.actions;

export default productsSlice.reducer;
