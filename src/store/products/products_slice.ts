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
  getByCategory,
  getOneProductById,
  getPaginatedProducts,
} from './actions';

export interface IInitialState {
  productsData: ProductsResponseDto | null;
  activeProduct: ProductItemResponseDto | null;
  paginatedProducts: PaginatedProductsResponseDto | null;
  categoryProducts: ProductsResponseDto | null;
  productsByCategory: ProductsResponseDto | null;
  dataStatus: DataStatus;
  pageNumber: number;
}

const initialState: IInitialState = {
  productsData: null,
  activeProduct: null,
  paginatedProducts: null,
  categoryProducts: null,
  productsByCategory: null,
  dataStatus: DataStatus.IDLE,
  pageNumber: 0,
};

const products_slice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setPageNumber: (state, { payload }: { payload: number }) => {
      state.pageNumber = payload;
    },
  },
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
    builder.addCase(getByCategory.fulfilled, (state, { payload }) => {
      state.productsByCategory = payload;
    })

    builder.addMatcher(
      isAnyOf(getAllProducts.fulfilled,
        getOneProductById.fulfilled,
        getPaginatedProducts.fulfilled,
        getByCategory.fulfilled,
        getByCategoryProducts.fulfilled),
      (state) => {
        state.dataStatus = DataStatus.FULFILLED;
      },
    );
    builder.addMatcher(
      isAnyOf(getAllProducts.rejected,
        getOneProductById.rejected,
        getPaginatedProducts.rejected,
        getByCategory.rejected,
        getByCategoryProducts.rejected),
      (state) => {
        state.dataStatus = DataStatus.REJECT;
        state.pageNumber = 0;
      },
    );
    builder.addMatcher(
      isAnyOf(getAllProducts.pending,
        getOneProductById.pending,
        getPaginatedProducts.pending,
        getByCategory.pending,
        getByCategoryProducts.pending),
      (state) => {
        state.dataStatus = DataStatus.PENDING;
      },
    );
  },
});
export const { setPageNumber } = products_slice.actions;

export const { actions, reducer } = products_slice;
