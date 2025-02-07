import { actions, reducer } from './auth-slice';
import { createUser, getCredentials } from './actions';

const authActions = { ...actions, getCredentials, createUser };

export { reducer, authActions };