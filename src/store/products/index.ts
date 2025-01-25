import { actions, reducer } from './products_slice';
import { getAllProducts, getOneProductById, getPaginatedProducts, getByCategoryProducts } from './actions';

const productsActions = { ...actions, getAllProducts, getOneProductById, getPaginatedProducts, getByCategoryProducts };

export { reducer, productsActions };
