import { createAsyncThunk } from '@reduxjs/toolkit';
import { productsService } from '@/utils/packages/products';

// we can use toastify for better user experience, if design is ready
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
