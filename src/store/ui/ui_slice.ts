import { createSlice } from '@reduxjs/toolkit';

export interface UIState {
  loadingCount: number;
}

const initialState: UIState = {
  loadingCount: 0,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    startGlobalLoading(state) {
      state.loadingCount += 1;
    },
    stopGlobalLoading(state) {
      if (state.loadingCount > 0) {
        state.loadingCount -= 1;
      }
    },
  },
});

export const { startGlobalLoading, stopGlobalLoading } = uiSlice.actions;

export const selectIsGlobalLoading = (state: { ui: UIState }) =>
  state.ui.loadingCount > 0;

export default uiSlice.reducer;
