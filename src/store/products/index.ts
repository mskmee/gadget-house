import { actions, reducer } from './products_slice';
import { getAllProducts, getOneProductById, getPaginatedProducts, getByCategory, getFilteredProducts } from './actions';

const productsActions = { ...actions, getAllProducts, getOneProductById, getPaginatedProducts, getByCategory, getFilteredProducts };

export { reducer, productsActions };
