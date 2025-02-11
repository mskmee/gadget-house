import { IAuthApi } from './libs/interfaces/interfaces';
import { ApiEndpoint, HttpMethod, request } from '../http';
import {
  AuthSignInRequestDto,
  AuthSignInResponseDto,
  AuthSignUpRequestDto,
  AuthSignUpResponseDto,
  AuthForgotPasswordResponseDto,
} from './libs/types/types';

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
      url: ApiEndpoint.SIGNIN,
      body: { email },
    });
  }
}

export { AuthApi };
