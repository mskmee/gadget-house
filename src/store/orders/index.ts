import { actions, reducer } from './order-slice';
import { createOrder } from './actions';

const ordersActions = { ...actions, createOrder };

export { reducer, ordersActions };
