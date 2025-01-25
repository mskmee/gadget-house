import { createAsyncThunk } from '@reduxjs/toolkit';
import { productsService } from '@/utils/packages/products';
import { PriceDTO } from '@/utils/packages/products/libs/types/category-products-response-dto';

// we can use toastify for better user experience, if design is ready
const getAllProducts = createAsyncThunk('products/fetch', async (page: number) => {
  return await productsService.getAllProducts(page);
});

const getOneProductById = createAsyncThunk(
  'products/fetchOne',
  async (id: string) => {
    return await productsService.getOneProductById(id);
  },
);

const getPaginatedProducts = createAsyncThunk(
  'products/fetchPaginatedProducts',
  async (params: { page: number; size?: number; sort?: string[] }) => {
    const { page, size = 10, sort = [] } = params;
    return await productsService.getPaginatedProducts(page, size, sort);
  }
);

const getByCategoryProducts = createAsyncThunk(
  'products/fetchCategoryProducts',
  async (params: {
    categoryId: number;
    brandIds?: number[];
    price?: PriceDTO;
    attributeValueIds?: number[];
  }) => {
    const { categoryId, brandIds = [], price = { from: 0, to: 100000 }, attributeValueIds = [] } = params;
    
    return await productsService.getByCategoryProducts(categoryId, brandIds, price, attributeValueIds);
  }
);

export { getAllProducts, getOneProductById, getPaginatedProducts, getByCategoryProducts };
