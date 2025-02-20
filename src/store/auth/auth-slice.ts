import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '@/enums/data-status';
import { User } from '@/pages/Auth/libs/types/types';
import { createUser, getCredentials } from './actions';
import {
  LocalStorageKey,
  localStorageService,
} from '@/utils/packages/local-storage';

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
  userToken: localStorageService.getItem(LocalStorageKey.ACCESS_TOKEN),
  refreshToken: localStorageService.getItem(LocalStorageKey.REFRESH_TOKEN),
  dataStatus: DataStatus.IDLE,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
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

export const { logout } = authSlice.actions;

export const { actions, reducer } = authSlice;
