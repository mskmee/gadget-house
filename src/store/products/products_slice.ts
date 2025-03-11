import { DataStatus } from '@/enums/enums';
import {
  ProductItemResponseDto,
  ProductsResponseDto,
} from '@/utils/packages/products';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  getAllProducts,
  getByCategory,
  getFilteredProducts,
  getOneProductById,
  getPaginatedProducts,
} from './actions';
import { DEFAULT_PAGE, DEFAULT_PAGES, DEFAULT_SIZE } from '@/constants/pagination';

export interface IInitialState {
  productsData: ProductsResponseDto | null;
  activeProduct: ProductItemResponseDto | null;
  paginatedProducts: ProductsResponseDto | null;
  dataStatus: DataStatus;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalElements: number;
  };
}

const initialState: IInitialState = {
  productsData: null,
  activeProduct: null,
  paginatedProducts: null,
  dataStatus: DataStatus.IDLE,
  pagination: { currentPage: DEFAULT_PAGE, totalPages: DEFAULT_PAGES, totalElements: DEFAULT_SIZE },
};

const products_slice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setPageNumber: (state, { payload }: { payload: number }) => {
      state.pagination.currentPage = payload;
    },
    clearProductsData: (state) => {
      state.productsData = null;
    }
  },
  extraReducers(builder) {
    builder.addCase(getAllProducts.fulfilled, (state, { payload }) => {
      state.productsData = payload;
      state.pagination = { currentPage: payload.currentPage, totalPages: payload.totalPages, totalElements: payload.totalElements };
    });
    builder.addCase(getOneProductById.fulfilled, (state, { payload }) => {
      state.activeProduct = payload;
    });
    builder.addCase(getPaginatedProducts.fulfilled, (state, { payload }) => {
      state.productsData = payload;
      state.pagination = { currentPage: payload.currentPage, totalPages: payload.totalPages, totalElements: payload.totalElements };
    });
    builder.addCase(getByCategory.fulfilled, (state, { payload }) => {
      state.productsData = payload;
      state.pagination = { currentPage: payload.currentPage, totalPages: payload.totalPages, totalElements: payload.totalElements };
    })
    builder.addCase(getFilteredProducts.fulfilled, (state, { payload }) => {
      state.productsData = payload;
      state.pagination = { currentPage: payload.currentPage, totalPages: payload.totalPages, totalElements: payload.totalElements };
    })

    builder.addMatcher(
      isAnyOf(
        getAllProducts.fulfilled,
        getOneProductById.fulfilled,
        getPaginatedProducts.fulfilled,
        getByCategory.fulfilled,
        getFilteredProducts.fulfilled),
      (state) => {
        state.dataStatus = DataStatus.FULFILLED;
      },
    );
    builder.addMatcher(
      isAnyOf(
        getAllProducts.rejected,
        getOneProductById.rejected,
        getPaginatedProducts.rejected,
        getByCategory.rejected,
        getFilteredProducts.rejected),
      (state) => {
        state.dataStatus = DataStatus.REJECT;
      },
    );
    builder.addMatcher(
      isAnyOf(
        getAllProducts.pending,
        getOneProductById.pending,
        getPaginatedProducts.pending,
        getByCategory.pending,
        getFilteredProducts.pending),
      (state) => {
        state.dataStatus = DataStatus.PENDING;
      },
    );
  },
});
export const { setPageNumber, clearProductsData } = products_slice.actions;

export const { actions, reducer } = products_slice;
