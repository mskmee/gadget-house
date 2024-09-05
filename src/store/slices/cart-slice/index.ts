import { actions } from './cart-slice';

const allActions = {
  ...actions,
  // async actions from actions  file
};

export { allActions as cardSliceActions };

export { reducer } from './cart-slice';
