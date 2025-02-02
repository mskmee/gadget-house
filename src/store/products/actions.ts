import { createAsyncThunk } from '@reduxjs/toolkit';
import { productsService } from '@/utils/packages/products';
import { PriceDTO } from '@/utils/packages/products/libs/types/category-products-response-dto';

// we can use toastify for better user experience, if design is ready
const getAllProducts = createAsyncThunk('products/fetch', async ({page, size}: {page: number, size: number}) => {
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
  async ({ page, size }: { page: number; size: number }) => {
    return await productsService.getPaginatedProducts(page, size);
  }
);

// const getSortedProducts = createAsyncThunk(
//   'products/fetchSortedProducts',
//   async ({ page, size }: { page: number; size: number }) => {
//     return await productsService.getSortedProducts(page, size);
//   }
// );

const getFilteredProducts = createAsyncThunk(
  'products/fetchFiltredProducts',
  async (params: {
    categoryId: number;
    brandIds?: number[];
    price?: PriceDTO;
    attributeValueIds?: number[];
  }) => {
    const { categoryId, brandIds = [], price = { from: 0, to: 100000 }, attributeValueIds = [] } = params;

    // const filteredParams = {
    //   categoryId,
    //   ...(brandIds && brandIds.length > 0 ? { brandIds } : {}),
    //   ...(price && (price.from !== 0 || price.to !== 100000) ? { price } : {}),
    //   ...(attributeValueIds && attributeValueIds.length > 0 ? { attributeValueIds } : {}),
    // };

    return await productsService.getFilteredProducts(categoryId, brandIds, price, attributeValueIds);
  }
);

const getByCategory = createAsyncThunk(
  'products/fetchByCategoryProducts',
  async ({ categoryId, page, size }: { categoryId: number; page: number; size: number }) => {

    return await productsService.getByCategory(categoryId, page, size);
  }
);

export { getAllProducts, getOneProductById, getPaginatedProducts, getByCategory, getFilteredProducts };
