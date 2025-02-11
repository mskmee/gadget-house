import { actions, reducer } from './products_slice';
import {
  getAllProducts,
  getOneProductById,
  getPaginatedProducts,
  getCategoryProducts,
} from './actions';

const productsActions = {
  ...actions,
  getAllProducts,
  getOneProductById,
  getPaginatedProducts,
  getCategoryProducts,
};

export { reducer, productsActions };
