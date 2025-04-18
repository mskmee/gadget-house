import { IAuthApi } from './libs/interfaces/interfaces';
import { ApiEndpoint, HttpMethod, request } from '../http';
import {
  AuthSignInRequestDto,
  AuthSignInResponseDto,
  AuthSignUpRequestDto,
  AuthSignUpResponseDto,
  UserResponseDto,
  ChangePasswordRequestDto,
  AuthForgotPasswordResponseDto,
  ChangePasswordResponseDto,
} from './libs/types/types';
import { LocalStorageKey, localStorageService } from '../local-storage';

class AuthApi implements IAuthApi {
  async signInAuth(data: AuthSignInRequestDto): Promise<AuthSignInResponseDto> {
    return request({
      method: HttpMethod.POST,
      url: ApiEndpoint.SIGNIN,
      body: data,
    });
  }

  async signUpAuth(data: AuthSignUpRequestDto): Promise<AuthSignUpResponseDto> {
    return request({
      method: HttpMethod.POST,
      url: ApiEndpoint.SIGNUP,
      body: data,
    });
  }

  async forgotPassword(email: string): Promise<AuthForgotPasswordResponseDto> {
    return request({
      method: HttpMethod.POST,
      url: ApiEndpoint.FORGOT_PASSWORD,
      query: {email},
    });
  }

  async changePassword(data: ChangePasswordRequestDto): Promise<ChangePasswordResponseDto> {
    return request({
      method: HttpMethod.POST,
      url: ApiEndpoint.CHANGE_PASSWORD,
      body: data,
    });
  }

  async fetchUserProfile(): Promise<UserResponseDto> {
    return request({
      method: HttpMethod.GET,
      url: ApiEndpoint.USER,
      headers: { Authorization: `Bearer ${localStorageService.getItem(LocalStorageKey.ACCESS_TOKEN)}` },
    });
  }
}

export { AuthApi };
