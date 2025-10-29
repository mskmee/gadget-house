import { createAsyncThunk } from '@reduxjs/toolkit';
import { productsService } from '@/utils/packages/products';
import { setGlobalLoading } from '@/store/ui/ui_slice';

interface IFilterParams {
  page: number;
  size: number;
  categoryId?: number;
  brandIds?: number[];
  attributes?: number[];
  minPrice?: number;
  maxPrice?: number;
}

const getAllProducts = createAsyncThunk(
  'products/fetch',
  async ({ page, size }: { page: number; size: number }, thunkAPI) => {
    try {
      thunkAPI.dispatch(setGlobalLoading(true));
      const res = await productsService.getAllProducts(page, size);
      return res;
    } finally {
      thunkAPI.dispatch(setGlobalLoading(false));
    }
  },
);

const getOneProductById = createAsyncThunk(
  'products/fetchOne',
  async (id: string) => {
    return await productsService.getOneProductById(id);
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
    try {
      thunkAPI.dispatch(setGlobalLoading(true));
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
      thunkAPI.dispatch(setGlobalLoading(false));
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
      sort?: string;
    },
    thunkAPI,
  ) => {
    try {
      thunkAPI.dispatch(setGlobalLoading(true));
      const filteredParams: IFilterParams = {
        page,
        size,
        ...(categoryId !== null && categoryId !== 0 ? { categoryId } : {}),
        ...(brandIds && brandIds.length > 0 ? { brandIds } : {}),
        ...(attributes && attributes.length > 0
          ? { attributeValueIds: attributes }
          : {}),
        ...(minPrice !== null && minPrice !== 0 ? { minPrice } : {}),
        ...(maxPrice !== null && maxPrice !== 0 ? { maxPrice } : {}),
        ...(minCameraMP !== null && minCameraMP !== 0 ? { minCameraMP } : {}),
        ...(maxCameraMP !== null && maxCameraMP !== 0 ? { maxCameraMP } : {}),
        ...(sort !== null ? { sort } : {}),
      };

      const res = await productsService.getFilteredProducts(filteredParams);
      return res;
    } finally {
      thunkAPI.dispatch(setGlobalLoading(false));
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
    try {
      thunkAPI.dispatch(setGlobalLoading(true));
      const res = await productsService.getByCategory(
        categoryId,
        page,
        size,
        sort,
      );
      return res;
    } finally {
      thunkAPI.dispatch(setGlobalLoading(false));
    }
  },
);

const getSuggestions = createAsyncThunk(
  'products/fetchSuggestions',
  async (query: string) => {
    return await productsService.getSuggestions(query);
  },
);

const searchProducts = createAsyncThunk(
  'products/searchProducts',
  async ({
    query,
    page,
    size,
    sort,
  }: {
    query: string;
    page: number;
    size: number;
    sort: string;
  }) => {
    return await productsService.searchProducts(query, page, size, sort);
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
