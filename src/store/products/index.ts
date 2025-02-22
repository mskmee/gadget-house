import { actions, reducer } from './products_slice';
import { getAllProducts, getOneProductById, getPaginatedProducts, getByCategory } from './actions';

const productsActions = { ...actions, getAllProducts, getOneProductById, getPaginatedProducts, getByCategory };

export { reducer, productsActions };
