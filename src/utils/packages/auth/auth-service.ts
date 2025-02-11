import { IAuthApi, IAuthService } from './libs/interfaces/interfaces';
import {
  AuthSignInRequestDto,
  AuthSignInResponseDto,
  AuthSignUpRequestDto,
  AuthSignUpResponseDto,
  AuthForgotPasswordResponseDto,
} from './libs/types/types';

class AuthService implements IAuthService {
  private authApi: IAuthApi;
  constructor(authApi: IAuthApi) {
    this.authApi = authApi;
  }

  async signInAuth(data: AuthSignInRequestDto): Promise<AuthSignInResponseDto> {
    return this.authApi.signInAuth(data);
  }

  async signUpAuth(data: AuthSignUpRequestDto): Promise<AuthSignUpResponseDto> {
    return this.authApi.signUpAuth(data);
  }

  async forgotPassword(email: string): Promise<AuthForgotPasswordResponseDto> {
    return this.authApi.forgotPassword(email);
  }
}

export { AuthService };
