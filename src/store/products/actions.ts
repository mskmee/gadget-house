import { createAsyncThunk } from '@reduxjs/toolkit';
import { productsService } from '@/utils/packages/products';

// we can use toastify for better user experience, if design is ready
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

    return await productsService.getPaginatedProducts(filteredParams.categoryId, filteredParams.page, filteredParams.size);
  }
);

const getByCategory = createAsyncThunk(
  'products/fetchByCategoryProducts',
  async ({ categoryId, page, size }: { categoryId: number; page: number; size: number }) => {

    return await productsService.getByCategory(categoryId, page, size);
  }
);

export { getAllProducts, getOneProductById, getPaginatedProducts, getByCategory };
