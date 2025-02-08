import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '@/utils/packages/auth';

const getCredentials = createAsyncThunk(
  'auth/fetchCredentials',
  async () => {
    return await authService.signInAuth();
  }
);

const createUser = createAsyncThunk(
  'auth/fetchCredentials',
  async () => {
    return await authService.signUpAuth();
  }
);

export { getCredentials, createUser };