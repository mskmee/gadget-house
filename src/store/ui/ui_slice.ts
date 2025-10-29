import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UIState {
  isGlobalLoading: boolean;
}

const initialState: UIState = {
  isGlobalLoading: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setGlobalLoading(state, action: PayloadAction<boolean>) {
      state.isGlobalLoading = action.payload;
    },
  },
});

export const { setGlobalLoading } = uiSlice.actions;
export default uiSlice.reducer;
