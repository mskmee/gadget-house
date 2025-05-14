import { createAsyncThunk } from '@reduxjs/toolkit';
import { productsService } from '@/utils/packages/products';

interface IFilterParams {
  page: number;
  size: number;
  categoryId?: number;
  brandIds?: number[];
  attributes?: number[];
  minPrice?: number;
  maxPrice?: number;
}

const getAllProducts = createAsyncThunk('products/fetch', async ({ page, size }: { page: number, size: number }) => {
  return await productsService.getAllProducts(page, size);
});

const getOneProductById = createAsyncThunk(
  'products/fetchOne',
  async (id: string) => {
    return await productsService.getOneProductById(id);
  },
);

const getPaginatedProducts = createAsyncThunk(
  'products/fetchPaginatedProducts',
  async ({ categoryId, page, size }: { categoryId: number; page: number; size: number }) => {

    const filteredParams = {
      page,
      size,
      categoryId: categoryId !== 0 ? categoryId : null,
    };

    return await productsService.getPaginatedProducts(filteredParams.categoryId, filteredParams.page, filteredParams.size)
  }
);

const getFilteredProducts = createAsyncThunk(
  'products/fetchFilteredProducts',
  async ({ page, size, categoryId, brandIds, attributes, minPrice, maxPrice, minCameraMP, maxCameraMP, sort }:
    {
      page: number,
      size: number,
      categoryId?: number | null,
      brandIds?: number[],
      attributes?: number[],
      minPrice?: number,
      maxPrice?: number,
      minCameraMP?: number,
      maxCameraMP?: number,
      sort?: string
    }) => {

    const filteredParams: IFilterParams = {
      page,
      size,
      ...(categoryId !== null && categoryId !== 0 ? { categoryId } : {}),
      ...(brandIds && brandIds.length > 0 ? { brandIds } : {}),
      ...(attributes && attributes.length > 0 ? { attributes } : {}),
      ...(minPrice !== null && minPrice !== 0 ? { minPrice } : {}),
      ...(maxPrice !== null && maxPrice !== 0 ? { maxPrice } : {}),
      ...(minCameraMP !== null && minCameraMP !== 0 ? { minCameraMP } : {}),
      ...(maxCameraMP !== null && maxCameraMP !== 0 ? { maxCameraMP } : {}),
      ...(sort !== null ? { sort } : {}),
    };

    return await productsService.getFilteredProducts(filteredParams);
  }
);

const getByCategory = createAsyncThunk(
  'products/fetchByCategoryProducts',
  async ({ categoryId, page, size, sort }: { categoryId: number; page: number; size: number, sort: string | null }) => {

    return await productsService.getByCategory(categoryId, page, size, sort);
  }
);

export { getAllProducts, getOneProductById, getPaginatedProducts, getByCategory, getFilteredProducts };
