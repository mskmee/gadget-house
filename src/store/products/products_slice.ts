import { DataStatus } from '@/enums/enums';
import {
  ProductItemResponseDto,
  ProductsResponseDto,
} from '@/utils/packages/products';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { getAllProducts, getOneProductById } from './actions';

export interface IInitialState {
  productsData: ProductsResponseDto | null;
  activeProduct: ProductItemResponseDto | null;
  dataStatus: DataStatus;
}

const initialState: IInitialState = {
  productsData: null,
  activeProduct: null,
  dataStatus: DataStatus.IDLE,
};

const products_slice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllProducts.fulfilled, (state, { payload }) => {
      state.productsData = payload;
    });
    builder.addCase(getOneProductById.fulfilled, (state, { payload }) => {
      state.activeProduct = payload;
    });
    builder.addMatcher(
      isAnyOf(getAllProducts.fulfilled, getOneProductById.fulfilled),
      (state) => {
        state.dataStatus = DataStatus.FULFILLED;
      },
    );
    builder.addMatcher(
      isAnyOf(getAllProducts.rejected, getOneProductById.rejected),
      (state) => {
        state.dataStatus = DataStatus.REJECT;
      },
    );
    builder.addMatcher(
      isAnyOf(getAllProducts.pending, getOneProductById.pending),
      (state) => {
        state.dataStatus = DataStatus.PENDING;
      },
    );
  },
});
export const { actions, reducer } = products_slice;
