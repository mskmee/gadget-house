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
  loaded: boolean;
  isFetchingMore: boolean;
  isAppending: boolean;
}

// const saveProductsToStorage = (products: ProductsResponseDto) => {
//   try {
//     localStorage.setItem('productsData', JSON.stringify(products));
//   } catch (error) {
//     console.error('Error saving products to localStorage:', error);
//   }
// };

const loadProductsFromStorage = (): ProductsResponseDto | null => {
  try {
    const saved = localStorage.getItem('productsData');
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Error loading products from localStorage:', error);
    return null;
  }
};

const initialState: IInitialState = {
  productsData: loadProductsFromStorage(),
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
  loaded: false, 
  isFetchingMore: false,
  isAppending: false,
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
      console.log('PAYLOAD THAT REDUCER RECIEVE', payload);
      console.log('STATE PRODUCST DATA FROM REDUX:', state.productsData);

      const product = state.productsData?.page.find(
        (item) => item.id === payload.id,
      );

      console.log('PRODUCT ', product);

      if (product) {
        product.isLiked = !product.isLiked;
      }

      const favoriteIndex = state.favoriteProducts.findIndex(
        (fav) => fav.id === payload.id,
      );

      const isCurrentlyFavorite = favoriteIndex !== -1;

      if (isCurrentlyFavorite) {
        state.favoriteProducts = state.favoriteProducts.filter(
          (fav) => fav.id !== payload.id,
        );
      } else {
        const favoriteProduct = { ...payload, isLiked: true };
        state.favoriteProducts.push(favoriteProduct);
      }

      localStorage.setItem(
        'favorite_products',
        JSON.stringify(state.favoriteProducts),
      );
    },
    clearProductsData: (state) => {
      state.productsData = null;
      localStorage.removeItem('productsData');
    },
    setIsAppending: (state, { payload }: { payload: boolean }) => {
      console.log('payload', payload);
      state.isAppending = payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllProducts.fulfilled, (state, { payload }) => {
      const likedProducts = new Set(
        state.favoriteProducts.map((product) => product.id),
      );

      const processedPayload = {
        ...payload,
        page: payload.page.map((product) => ({
          ...product,
          isLiked: likedProducts.has(product.id),
          anotherColors: [],
          href: generateHrefSlug(product.name),
        })),
      };

      state.productsData = processedPayload;
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
      state.pagination = {
        currentPage: payload.currentPage,
        totalPages: payload.totalPages,
        totalElements: payload.totalElements,
      };
    });

    builder
      .addCase(getFilteredProducts.pending, (state) => {
        state.isFetchingMore = true;
      })
      .addCase(getFilteredProducts.fulfilled, (state, { payload }) => {
        if (!state.isAppending) {
          state.productsData = payload;
        } else {
          state.productsData = {
            ...payload,
            page: [...(state.productsData?.page || []), ...payload.page],
          };
        }
        state.pagination = {
          currentPage: payload.currentPage,
          totalPages: payload.totalPages,
          totalElements: payload.totalElements,
        };

        state.isFetchingMore = false;
        state.isAppending = false;
      })
      .addCase(getFilteredProducts.rejected, (state) => {
        state.isFetchingMore = false;
      });

    builder.addMatcher(
      isAnyOf(
        getAllProducts.fulfilled,
        getOneProductById.fulfilled,
        getPaginatedProducts.fulfilled,
        getByCategory.fulfilled,
        getFilteredProducts.fulfilled,
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
        getByCategory.rejected,
        getFilteredProducts.rejected,
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
        getByCategory.pending,
        getFilteredProducts.pending,
      ),
      (state) => {
        state.dataStatus = DataStatus.PENDING;
      },
    );
  },
});

export const {
  setPageNumber,
  clearProductsData,
  toggleFavorite,
  setIsAppending,
  setLoaded,
} = products_slice.actions;

export const { actions, reducer } = products_slice;
