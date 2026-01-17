import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '@/utils/packages/auth';
import {
  AuthSignInRequestDto,
  AuthSignUpRequestDto,
  ChangePasswordRequestDto,
  UpdateContactsRequestDto,
  UpdatePersonalDataRequestDto,
  // UserResponseDto,
} from '@/utils/packages/auth/libs/types/types';
import {
  LocalStorageKey,
  localStorageService,
} from '@/utils/packages/local-storage';
import { withAuthErrorHandler } from '../helpers/helpers';
import { RootState } from '..';
import {
  PersonalContactsPayload,
  PersonalDataPayload,
} from '@/pages/Auth/libs/types/user-dto';


const updateUserPersonalData = createAsyncThunk(
  'auth/updateUserPersonalData',
  withAuthErrorHandler(
    async (personalData: PersonalDataPayload, { getState }) => {
      const state = getState() as RootState;
      const currentUser = state.auth.user;

      if (!currentUser) {
        throw new Error('No current user data');
      }

      const payload: UpdatePersonalDataRequestDto = {
        ...currentUser,
        fullName: personalData.fullName,
        birthdate: personalData.birthdate,
        address: {
          ...(currentUser.address ?? {}),
          city: personalData.city,
          street: currentUser.address?.street ?? '',
          houseNumber: currentUser.address?.houseNumber ?? '',
          flat: currentUser.address?.flat ?? '',
          departmentNumber: currentUser.address?.departmentNumber ?? '',
          addressLine: currentUser.address?.addressLine ?? '',
        },
        sex: personalData.gender.toUpperCase(),
        orders: currentUser.orders ?? [],
      };

      return await authService.updatePersonalData(payload);
    },
  ),
);

const updateUserContacts = createAsyncThunk(
  'auth/updateUserContacts',
  withAuthErrorHandler(
    async (contactsData: PersonalContactsPayload, { getState }) => {
      const state = getState() as RootState;
      const currentUser = state.auth.user;

      if (!currentUser) {
        throw new Error('No current user data');
      }

      const payload: UpdateContactsRequestDto = {
        ...currentUser,
        email: contactsData.email,
        phoneNumber: contactsData.phoneNumber,
        secondaryPhoneNumber: contactsData.secondaryPhoneNumber,
        orders: currentUser.orders || [],
      };

      return await authService.updateContacts(payload);
    },
  ),
);

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

export {
  getCredentials,
  createUser,
  forgotPassword,
  changePassword,
  updateUserPersonalData,
  updateUserContacts,
};
