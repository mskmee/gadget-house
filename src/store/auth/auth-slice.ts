import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';

import { DataStatus } from '@/enums/data-status';
import { IUser } from '@/pages/Auth/libs/types/types';
import {
  changePassword,
  createUser,
  forgotPassword,
  getCredentials,
  getUserData,
} from './actions';
import {
  LocalStorageKey,
  localStorageService,
} from '@/utils/packages/local-storage';
import { AuthForgotPasswordResponseDto } from '@/utils/packages/auth/libs/types/types';

export interface IAuthState {
  isAuthenticated: boolean;
  user: IUser | null;
  userToken: string | null;
  refreshToken: string | null;
  message: string | AuthForgotPasswordResponseDto;
  dataStatus: DataStatus;
}

const initialState: IAuthState = {
  isAuthenticated: false,
  user: null,
  userToken: localStorageService.getItem(LocalStorageKey.ACCESS_TOKEN) || null,
  refreshToken:
    localStorageService.getItem(LocalStorageKey.REFRESH_TOKEN) || null,
  message: '',
  dataStatus: DataStatus.IDLE,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens(
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>,
    ) {
      state.userToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;

      localStorageService.setItem(
        LocalStorageKey.ACCESS_TOKEN,
        action.payload.accessToken,
      );
      localStorageService.setItem(
        LocalStorageKey.REFRESH_TOKEN,
        action.payload.refreshToken,
      );
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.userToken = null;
      state.refreshToken = null;

      localStorageService.removeItem(LocalStorageKey.ACCESS_TOKEN);
      localStorageService.removeItem(LocalStorageKey.REFRESH_TOKEN);
    },
  },
  extraReducers(builder) {
    builder.addCase(getCredentials.fulfilled, (state, { payload }) => {
      state.userToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
      state.isAuthenticated = true;

      localStorageService.setItem(
        LocalStorageKey.ACCESS_TOKEN,
        payload.accessToken,
      );
      localStorageService.setItem(
        LocalStorageKey.REFRESH_TOKEN,
        payload.refreshToken,
      );
    });
    builder.addCase(createUser.fulfilled, (state, { payload }) => {
      state.user = payload;
    });
    builder.addCase(getUserData.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.isAuthenticated = true;
    });
    builder.addCase(forgotPassword.fulfilled, (state, { payload }) => {
      state.message = payload;
    });
    builder.addCase(changePassword.fulfilled, (state, { payload }) => {
      state.userToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;

      localStorageService.setItem(
        LocalStorageKey.ACCESS_TOKEN,
        payload.accessToken,
      );
      localStorageService.setItem(
        LocalStorageKey.REFRESH_TOKEN,
        payload.refreshToken,
      );
    });

    builder.addMatcher(
      isAnyOf(
        getCredentials.fulfilled,
        createUser.fulfilled,
        forgotPassword.fulfilled,
        getUserData.fulfilled,
      ),
      (state) => {
        state.dataStatus = DataStatus.FULFILLED;
      },
    );
    builder.addMatcher(
      isAnyOf(
        getCredentials.rejected,
        createUser.rejected,
        forgotPassword.rejected,
        getUserData.rejected,
      ),
      (state) => {
        state.dataStatus = DataStatus.REJECT;
      },
    );
    builder.addMatcher(
      isAnyOf(
        getCredentials.pending,
        createUser.pending,
        forgotPassword.pending,
        getUserData.pending,
      ),
      (state) => {
        state.dataStatus = DataStatus.PENDING;
      },
    );
  },
});

export const { logout, setTokens } = authSlice.actions;

export const { actions, reducer } = authSlice;
