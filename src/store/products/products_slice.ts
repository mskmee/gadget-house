import { DataStatus } from '@/enums/enums';
import {
  ProductItemResponseDto,
  ProductsResponseDto,
  PaginatedProductsResponseDto,
} from '@/utils/packages/products';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  getAllProducts,
  getByCategoryProducts,
  getOneProductById,
  getPaginatedProducts,
} from './actions';

export interface IInitialState {
  productsData: ProductsResponseDto | null;
  activeProduct: ProductItemResponseDto | null;
  paginatedProducts: PaginatedProductsResponseDto | null;
  categoryProducts: ProductsResponseDto | null;
  dataStatus: DataStatus;
  pageNumber: number | null;
}

const initialState: IInitialState = {
  productsData: null,
  activeProduct: null,
  paginatedProducts: null,
  categoryProducts: null,
  dataStatus: DataStatus.IDLE,
  pageNumber: null,
};

const products_slice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllProducts.fulfilled, (state, { payload }) => {
      state.productsData = payload;
      state.pageNumber = payload.currentPage;
    });
    builder.addCase(getOneProductById.fulfilled, (state, { payload }) => {
      state.activeProduct = payload;
    });
    builder.addCase(getPaginatedProducts.fulfilled, (state, { payload }) => {
      state.paginatedProducts = payload;
    });
    builder.addCase(getByCategoryProducts.fulfilled, (state, { payload }) => {
      state.categoryProducts = payload;
      state.pageNumber = payload.currentPage;
    });

    builder.addMatcher(
      isAnyOf(getAllProducts.fulfilled,
        getOneProductById.fulfilled,
        getPaginatedProducts.fulfilled,
        getByCategoryProducts.fulfilled),
      (state) => {
        state.dataStatus = DataStatus.FULFILLED;
      },
    );
    builder.addMatcher(
      isAnyOf(getAllProducts.rejected,
        getOneProductById.rejected,
        getPaginatedProducts.rejected,
        getByCategoryProducts.rejected),
      (state) => {
        state.dataStatus = DataStatus.REJECT;
        state.pageNumber = null;
      },
    );
    builder.addMatcher(
      isAnyOf(getAllProducts.pending,
        getOneProductById.pending,
        getPaginatedProducts.pending,
        getByCategoryProducts.pending),
      (state) => {
        state.dataStatus = DataStatus.PENDING;
        state.pageNumber = null;
      },
    );
  },
});
export const { actions, reducer } = products_slice;
