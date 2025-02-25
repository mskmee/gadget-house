/* eslint-disable no-unused-vars */
import {
  AuthForgotPasswordResponseDto,
  AuthSignInRequestDto,
  AuthSignInResponseDto,
  AuthSignUpRequestDto,
  AuthSignUpResponseDto,
  UserResponseDto,
} from '../types/types';

interface IAuthApi {
  signInAuth: (data: AuthSignInRequestDto) => Promise<AuthSignInResponseDto>;
  signUpAuth: (data: AuthSignUpRequestDto) => Promise<AuthSignUpResponseDto>;
  forgotPassword: (email: string) => Promise<AuthForgotPasswordResponseDto>;
  fetchUserProfile: () => Promise<UserResponseDto>;
}

export { type IAuthApi };
