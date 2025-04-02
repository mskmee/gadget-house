import { DataStatus } from '@/enums/enums';
import {
  ProductItemResponseDto,
  ProductsResponseDto,
} from '@/utils/packages/products';
import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import {
  getAllProducts,
  getByCategory,
  getFilteredProducts,
  getOneProductById,
  getPaginatedProducts,
} from './actions';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGES,
  DEFAULT_SIZE,
} from '@/constants/pagination';
import { generateHrefSlug } from '@/utils/generateHrefSlug';
import { IProductCard } from '@/interfaces/interfaces';

export interface IInitialState {
  productsData: ProductsResponseDto | null;
  activeProduct: ProductItemResponseDto | null;
  favoriteProducts: IProductCard[];
  paginatedProducts: ProductsResponseDto | null;
  dataStatus: DataStatus;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalElements: number;
  };
  loaded: boolean; // Added loaded flag
}

const initialState: IInitialState = {
  productsData: null,
  activeProduct: null,
  favoriteProducts: JSON.parse(
    localStorage.getItem('favorite_products') || '[]',
  ),
  paginatedProducts: null,
  dataStatus: DataStatus.IDLE,
  pagination: {
    currentPage: DEFAULT_PAGE,
    totalPages: DEFAULT_PAGES,
    totalElements: DEFAULT_SIZE,
  },
  loaded: false, // Added loaded flag
};

const products_slice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setPageNumber: (state, { payload }: { payload: number }) => {
      state.pagination.currentPage = payload;
    },
    setLoaded: (state, { payload }: { payload: boolean }) => {
      state.loaded = payload;
    },
    toggleFavorite: (state, { payload }: PayloadAction<IProductCard>) => {
      const product = state.productsData?.page.find(
        (item) => item.id === payload.id,
      );
      console.log(product);

      if (!product) return;

      product.isLiked = !product.isLiked;

      if (product.isLiked) {
        state.favoriteProducts.push(product);
      } else {
        state.favoriteProducts = state.favoriteProducts.filter(
          (fav) => fav.id !== payload.id,
        );
      }

      localStorage.setItem(
        'favorite_products',
        JSON.stringify(state.favoriteProducts),
      );
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllProducts.fulfilled, (state, { payload }) => {
      const likedProducts = new Set(
        state.favoriteProducts.map((product) => product.id),
      );

      state.productsData = {
        ...payload,
        page: payload.page.map((product) => ({
          ...product,
          isLiked: likedProducts.has(product.id),
          anotherColors: [],
          href: generateHrefSlug(product.name),
        })),
      };
      state.pagination = {
        currentPage: payload.currentPage,
        totalPages: payload.totalPages,
        totalElements: payload.totalElements,
      };
      state.loaded = true;
    });
    builder.addCase(getOneProductById.fulfilled, (state, { payload }) => {
      state.activeProduct = payload;
    });
    builder.addCase(getPaginatedProducts.fulfilled, (state, { payload }) => {
      state.productsData = payload;
      state.pagination = {
        currentPage: payload.currentPage,
        totalPages: payload.totalPages,
        totalElements: payload.totalElements,
      };
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
