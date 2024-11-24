import { actions, reducer } from './products_slice';
import { getAllProducts, getOneProductById } from './actions';

const productsActions = { ...actions, getAllProducts, getOneProductById };

export { reducer, productsActions };
