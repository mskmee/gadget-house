import { actions, reducer } from './user-slice';
import { getData } from './actions';

const authActions = { ...actions, getData };

export { reducer, authActions };
