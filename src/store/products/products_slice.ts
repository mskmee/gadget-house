import { DataStatus } from '@/enums/enums';
import {
  ProductItemResponseDto,
  ProductsResponseDto,
  PaginatedProductsResponseDto,
  CategoryProductsResponseDto,
} from '@/utils/packages/products';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  getAllProducts,
  getOneProductById,
  getPaginatedProducts,
  getCategoryProducts,
} from './actions';

export interface IInitialState {
  productsData: ProductsResponseDto | null;
  activeProduct: ProductItemResponseDto | null;
  paginatedProducts: PaginatedProductsResponseDto | null;
  categoryProducts: CategoryProductsResponseDto | null;
  dataStatus: DataStatus;
}

const initialState: IInitialState = {
  productsData: null,
  activeProduct: null,
  paginatedProducts: null,
  categoryProducts: null,
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
    builder.addCase(getPaginatedProducts.fulfilled, (state, { payload }) => {
      state.paginatedProducts = payload;
    });
    builder.addCase(getCategoryProducts.fulfilled, (state, { payload }) => {
      state.categoryProducts = payload;
    });

    builder.addMatcher(
      isAnyOf(
        getAllProducts.fulfilled,
        getOneProductById.fulfilled,
        getPaginatedProducts.fulfilled,
        getCategoryProducts.fulfilled,
      ),
      (state) => {
        state.dataStatus = DataStatus.FULFILLED;
      },
    );
    builder.addMatcher(
      isAnyOf(
        getAllProducts.rejected,
        getOneProductById.rejected,
        getPaginatedProducts.rejected,
        getCategoryProducts.rejected,
      ),
      (state) => {
        state.dataStatus = DataStatus.REJECT;
      },
    );
    builder.addMatcher(
      isAnyOf(
        getAllProducts.pending,
        getOneProductById.pending,
        getPaginatedProducts.pending,
        getCategoryProducts.pending,
      ),
      (state) => {
        state.dataStatus = DataStatus.PENDING;
      },
    );
  },
});
export const { actions, reducer } = products_slice;
