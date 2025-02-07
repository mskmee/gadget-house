import { IAuthApi } from './libs/interfaces/interfaces';
import { ApiEndpoint, HttpMethod, request } from '../http';
import { AuthSignInResponseDto, AuthSignUpResponseDto } from './libs/types/types';

class AuthApi implements IAuthApi {
  async signInAuth(): Promise<AuthSignInResponseDto> {
    return request({
      method: HttpMethod.POST,
      url: ApiEndpoint.SIGNIN,
    });
  }

  async signUpAuth(): Promise<AuthSignUpResponseDto> {
    return request({
      method: HttpMethod.POST,
      url: ApiEndpoint.SIGNUP,
    });
  }
}

export { AuthApi };
