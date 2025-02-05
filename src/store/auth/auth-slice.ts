import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User } from "@/pages/Auth/libs/types/user-dto";

export interface IAuthState {
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: IAuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string; name: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    register: (state, action: PayloadAction<{ name: string; email: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    forgotPassword: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      console.log(`Password reset email sent to ${action.payload}`);
    },
  },
});

export const { login, logout, register, forgotPassword } = authSlice.actions;

export const { actions, reducer } = authSlice;