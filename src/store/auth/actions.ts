import { createAsyncThunk } from '@reduxjs/toolkit';

import { authService } from '@/utils/packages/auth';
import {
  AuthSignInRequestDto,
  AuthSignUpRequestDto,
  ChangePasswordRequestDto,
  UserResponseDto,
} from '@/utils/packages/auth/libs/types/types';
import {
  LocalStorageKey,
  localStorageService,
} from '@/utils/packages/local-storage';
import { withAuthErrorHandler } from '../helpers/helpers';

const getCredentials = createAsyncThunk(
  'auth/fetchCredentials',
  withAuthErrorHandler(async (data: AuthSignInRequestDto) => {
    const response = await authService.signInAuth(data);
    localStorageService.setItem(
      LocalStorageKey.ACCESS_TOKEN,
      response.accessToken,
    );
    localStorageService.setItem(
      LocalStorageKey.REFRESH_TOKEN,
      response.refreshToken,
    );
    return response;
  }),
);

const createUser = createAsyncThunk(
  'auth/fetchUserCreate',
  withAuthErrorHandler(async (data: AuthSignUpRequestDto, { dispatch }) => {
    const response = await authService.signUpAuth(data);
    await dispatch(getCredentials(data));
    return response;
  }),
);

const forgotPassword = createAsyncThunk(
  'auth/fetchForgotPassword',
  withAuthErrorHandler(async (email: string) => {
    return await authService.forgotPassword(email);
  }),
);

const changePassword = createAsyncThunk(
  'auth/fetchChangePassword',
  withAuthErrorHandler(async (data: ChangePasswordRequestDto) => {
    return await authService.changePassword(data);
  }),
);

const getUserData = createAsyncThunk<UserResponseDto, void>(
  'auth/fetchUserProfile',
  withAuthErrorHandler(async () => {
    return await authService.fetchUserProfile();
  }),
);

export {
  getCredentials,
  createUser,
  forgotPassword,
  changePassword,
  getUserData,
};
