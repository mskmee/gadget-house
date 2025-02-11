import { createAsyncThunk } from '@reduxjs/toolkit';

import { authService } from '@/utils/packages/auth';
import {
  AuthSignInRequestDto,
  AuthSignUpRequestDto,
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

export { getCredentials, createUser, forgotPassword };
