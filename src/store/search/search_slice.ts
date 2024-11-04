import { createSlice } from '@reduxjs/toolkit';
const initialState = { searchValue: '', isGlobalOverlayActive: false };

const search_slice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchValue: (state, { payload }) => {
      state.searchValue = payload;
    },
    setIsGlobalOverlayActive: (state, { payload }) => {
      state.isGlobalOverlayActive = payload;
    },
  },
});
export const { actions, reducer } = search_slice;
