import { createAsyncThunk } from '@reduxjs/toolkit';

import { authService } from '@/utils/packages/auth';
import {
  AuthSignInRequestDto,
  AuthSignUpRequestDto,
  ChangePasswordRequestDto,
} from '@/utils/packages/auth/libs/types/types';

const getCredentials = createAsyncThunk(
  'auth/fetchCredentials',
  async (data: AuthSignInRequestDto) => {
    return await authService.signInAuth(data);
  },
);

const createUser = createAsyncThunk(
  'auth/fetchUserCreate',
  async (data: AuthSignUpRequestDto) => {
    return await authService.signUpAuth(data);
  },
);

const forgotPassword = createAsyncThunk(
  'auth/fetchForgotPassword',
  async (email: string) => {
    return await authService.forgotPassword(email);
  },
);

const changePassword = createAsyncThunk(
  'auth/fetchChangePassword',
  async (data: ChangePasswordRequestDto) => {
    return await authService.changePassword(data);
  },
);

const getUserData = createAsyncThunk(
  'auth/fetchUserProfile ',
  async () => {
    return await authService.fetchUserProfile();
  },
);

export { getCredentials, createUser, forgotPassword, changePassword, getUserData };
