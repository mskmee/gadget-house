import { actions, reducer } from './products_slice';
import { getAllProducts, getOneProductById, getPaginatedProducts, getByCategoryProducts, getByCategory } from './actions';

const productsActions = { ...actions, getAllProducts, getOneProductById, getPaginatedProducts, getByCategoryProducts, getByCategory };

export { reducer, productsActions };
