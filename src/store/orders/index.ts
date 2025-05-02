import { actions, reducer } from './order_slice';

import { getAllOrders, getOneOrderById, deleteOrder, patchOrder } from './actions';

const ordersActions = { ...actions, getAllOrders, getOneOrderById, deleteOrder, patchOrder,  };

export { reducer, ordersActions };
