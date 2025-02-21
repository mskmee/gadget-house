import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';

import { DataStatus } from '@/enums/data-status';
import { User } from '@/pages/Auth/libs/types/types';
import { createUser, getCredentials } from './actions';

export interface IAuthState {
  isAuthenticated: boolean;
  user: User | null;
  userToken: string | null;
  refreshToken: string | null;
  dataStatus: DataStatus;
}

const initialState: IAuthState = {
  isAuthenticated: false,
  user: null,
  userToken: null,
  refreshToken: null,
  dataStatus: DataStatus.IDLE,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens(state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) {
      state.userToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.userToken = null;
      state.refreshToken = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(getCredentials.fulfilled, (state, { payload }) => {
      state.userToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
    });
    builder.addCase(createUser.fulfilled, (state, { payload }) => {
      state.user = payload;
    });

    builder.addMatcher(
      isAnyOf(getCredentials.fulfilled, createUser.fulfilled),
      (state) => {
        state.dataStatus = DataStatus.FULFILLED;
      },
    );
    builder.addMatcher(
      isAnyOf(getCredentials.rejected, createUser.rejected),
      (state) => {
        state.dataStatus = DataStatus.REJECT;
      },
    );
    builder.addMatcher(
      isAnyOf(getCredentials.pending, createUser.pending),
      (state) => {
        state.dataStatus = DataStatus.PENDING;
      },
    );
  },
});

export const { logout, setTokens } = authSlice.actions;

export const { actions, reducer } = authSlice;
