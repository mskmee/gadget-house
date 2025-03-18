import { createAsyncThunk } from '@reduxjs/toolkit';
import { filtersService } from '@/utils/packages/filters';

// we can use toastify for better user experience, if design is ready
const getAllBrands = createAsyncThunk('brands/fetch', async () => {
  return await filtersService.getAllBrands();
});

const getAllCategories = createAsyncThunk('categories/fetch', async () => {
  return await filtersService.getAllCategories();
});

const getAllAttributes = createAsyncThunk('attributes/fetch', async () => {
  return await filtersService.getAllAttributes();
}); 

export { getAllBrands, getAllCategories, getAllAttributes };  
