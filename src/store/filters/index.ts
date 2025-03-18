import { actions, reducer } from './filters_slice';

import { getAllBrands, getAllCategories, getAllAttributes } from './actions';

const filtersActions = { ...actions, getAllBrands, getAllCategories, getAllAttributes };

export { reducer, filtersActions };
