import { createAsyncThunk } from '@reduxjs/toolkit';
import { productsService } from '@/utils/packages/products';

const getAllProducts = createAsyncThunk('products/fetch', async () => {
  return await productsService.getAllProducts();
});

const getOneProductById = createAsyncThunk(
  'products/fetchOne',
  async (id: string) => {
    return await productsService.getOneProductById(id);
  },
);

export { getAllProducts, getOneProductById };
