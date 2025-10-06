import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AuthRequiredType = 'review' | 'favorite';

export interface IAuthPortalsState {
  isAuthRequiredModalOpen: boolean;
  isAuthModalOpen: boolean;
  authRequiredType: AuthRequiredType;
}

const initialState: IAuthPortalsState = {
  isAuthRequiredModalOpen: false,
  isAuthModalOpen: false,
  authRequiredType: 'favorite',
};

const authPortalsSlice = createSlice({
  name: 'authPortals',
  initialState,
  reducers: {
    openAuthRequired(state, action: PayloadAction<AuthRequiredType>) {
      state.isAuthRequiredModalOpen = true;
      state.authRequiredType = action.payload;
    },
    closeAuthRequired(state) {
      state.isAuthRequiredModalOpen = false;
    },
    openAuthModal(state) {
      state.isAuthModalOpen = true;
    },
    closeAuthModal(state) {
      state.isAuthModalOpen = false;
    },
  },
});

export const {
  openAuthRequired,
  closeAuthRequired,
  openAuthModal,
  closeAuthModal,
} = authPortalsSlice.actions;

export default authPortalsSlice.reducer;
