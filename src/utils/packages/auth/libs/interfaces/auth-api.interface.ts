/* eslint-disable no-unused-vars */
import {
  AuthForgotPasswordResponseDto,
  AuthSignInRequestDto,
  AuthSignInResponseDto,
  AuthSignUpRequestDto,
  AuthSignUpResponseDto,
  ChangePasswordRequestDto,
  ChangePasswordResponseDto,
  UserResponseDto,
} from '../types/types';

interface IAuthApi {
  signInAuth: (data: AuthSignInRequestDto) => Promise<AuthSignInResponseDto>;
  signUpAuth: (data: AuthSignUpRequestDto) => Promise<AuthSignUpResponseDto>;
  forgotPassword: (email: string) => Promise<AuthForgotPasswordResponseDto>;
  changePassword: (data: ChangePasswordRequestDto) => Promise<ChangePasswordResponseDto>;
  fetchUserProfile: () => Promise<UserResponseDto>;
}

export { type IAuthApi };
