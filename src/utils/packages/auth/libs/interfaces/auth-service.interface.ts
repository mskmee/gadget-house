/* eslint-disable no-unused-vars */
import {
  AuthForgotPasswordResponseDto,
  AuthSignInRequestDto,
  AuthSignInResponseDto,
  AuthSignUpRequestDto,
  AuthSignUpResponseDto,
  ChangePasswordRequestDto,
  ChangePasswordResponseDto,
  UpdateContactsRequestDto,
  UpdatePersonalDataRequestDto,
  UserResponseDto,
} from '../types/types';

interface IAuthService {
  signInAuth: (data: AuthSignInRequestDto) => Promise<AuthSignInResponseDto>;
  signUpAuth: (data: AuthSignUpRequestDto) => Promise<AuthSignUpResponseDto>;
  forgotPassword: (email: string) => Promise<AuthForgotPasswordResponseDto>;
  changePassword: (data: ChangePasswordRequestDto) => Promise<ChangePasswordResponseDto>;
  fetchUserProfile: () => Promise<UserResponseDto>;
  updatePersonalData(data: UpdatePersonalDataRequestDto): Promise<UserResponseDto>;
  updateContacts(data: UpdateContactsRequestDto): Promise<UserResponseDto>;
}

export { type IAuthService };
