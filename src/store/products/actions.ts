import { createAsyncThunk } from '@reduxjs/toolkit';
import { productsService } from '@/utils/packages/products';
import { startGlobalLoading, stopGlobalLoading } from '@/store/ui/ui_slice';
import { mapColorsToBackendEnums } from '@/utils/helpers/colorMapping';

const getAllProducts = createAsyncThunk(
  'products/fetch',
  async ({ page, size }: { page: number; size: number }, thunkAPI) => {
    thunkAPI.dispatch(startGlobalLoading());
    try {
      const res = await productsService.getAllProducts(page, size);
      return res;
    } finally {
      thunkAPI.dispatch(stopGlobalLoading());
    }
  },
);

const getOneProductById = createAsyncThunk(
  'products/fetchOne',
  async (id: string, thunkAPI) => {
    thunkAPI.dispatch(startGlobalLoading());
    try {
      return await productsService.getOneProductById(id);
    } finally {
      thunkAPI.dispatch(stopGlobalLoading());
    }
  },
);

const getPaginatedProducts = createAsyncThunk(
  'products/fetchPaginatedProducts',
  async (
    {
      categoryId,
      page,
      size,
    }: {
      categoryId: number;
      page: number;
      size: number;
    },
    thunkAPI,
  ) => {
    thunkAPI.dispatch(startGlobalLoading());
    try {
      const filteredParams = {
        page,
        size,
        categoryId: categoryId !== 0 ? categoryId : null,
      };

      const res = await productsService.getPaginatedProducts(
        filteredParams.categoryId,
        filteredParams.page,
        filteredParams.size,
      );
      return res;
    } finally {
      thunkAPI.dispatch(stopGlobalLoading());
    }
  },
);

const getFilteredProducts = createAsyncThunk(
  'products/fetchFilteredProducts',
  async (
    {
      page,
      size,
      categoryId,
      brandIds,
      attributes,
      minPrice,
      maxPrice,
      minCameraMP,
      maxCameraMP,
      colors,
      sort,
    }: {
      page: number;
      size: number;
      categoryId?: number | null;
      brandIds?: number[];
      attributes?: number[];
      minPrice?: number;
      maxPrice?: number;
      minCameraMP?: number;
      maxCameraMP?: number;
      colors?: string[];
      sort?: string;
    },
    thunkAPI,
  ) => {
    thunkAPI.dispatch(startGlobalLoading());
    try {
      const filteredParams: {
        page: number;
        size: number;
        categoryId?: number;
        brandIds?: number[];
        attributeValueIds?: number[];
        minPrice?: number;
        maxPrice?: number;
        minMP?: string;
        maxMP?: string;
        colors?: string[];
        sort?: string[];
      } = {
        page,
        size,
        ...(categoryId !== null && categoryId !== 0 ? { categoryId } : {}),
        ...(brandIds && brandIds.length > 0 ? { brandIds } : {}),
        ...(attributes && attributes.length > 0
          ? { attributeValueIds: attributes }
          : {}),
        ...(minPrice !== null && minPrice !== 0 ? { minPrice } : {}),
        ...(maxPrice !== null && maxPrice !== 0 ? { maxPrice } : {}),
        ...(minCameraMP !== null && minCameraMP !== 0
          ? { minMP: String(minCameraMP) }
          : {}),
        ...(maxCameraMP !== null && maxCameraMP !== 0
          ? { maxMP: String(maxCameraMP) }
          : {}),
        ...(colors && colors.length > 0
          ? { colors: mapColorsToBackendEnums(colors) }
          : {}),
        ...(sort !== null && sort !== undefined
          ? { sort: [sort] }
          : { sort: [] }),
      };

      const res = await productsService.getFilteredProducts(filteredParams);
      return res;
    } finally {
      thunkAPI.dispatch(stopGlobalLoading());
    }
  },
);

const getByCategory = createAsyncThunk(
  'products/fetchByCategoryProducts',
  async (
    {
      categoryId,
      page,
      size,
      sort,
    }: {
      categoryId: number;
      page: number;
      size: number;
      sort: string | null;
    },
    thunkAPI,
  ) => {
    thunkAPI.dispatch(startGlobalLoading());
    try {
      const res = await productsService.getByCategory(
        categoryId,
        page,
        size,
        sort,
      );
      return res;
    } finally {
      thunkAPI.dispatch(stopGlobalLoading());
    }
  },
);

const getSuggestions = createAsyncThunk(
  'products/fetchSuggestions',
  async (query: string, thunkAPI) => {
    thunkAPI.dispatch(startGlobalLoading());
    try {
      return await productsService.getSuggestions(query);
    } finally {
      thunkAPI.dispatch(stopGlobalLoading());
    }
  },
);

const searchProducts = createAsyncThunk(
  'products/searchProducts',
  async (
    {
      query,
      page,
      size,
      sort,
    }: { query: string; page: number; size: number; sort: string },
    thunkAPI,
  ) => {
    thunkAPI.dispatch(startGlobalLoading());
    try {
      return await productsService.searchProducts(query, page, size, sort);
    } finally {
      thunkAPI.dispatch(stopGlobalLoading());
    }
  },
);

export {
  getAllProducts,
  getOneProductById,
  getPaginatedProducts,
  getByCategory,
  getSuggestions,
  searchProducts,
  getFilteredProducts,
};
