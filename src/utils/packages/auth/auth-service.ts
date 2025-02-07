import { IAuthApi, IAuthService } from "./libs/interfaces/interfaces";
import { AuthSignInResponseDto, AuthSignUpResponseDto } from "./libs/types/types";


class AuthService implements IAuthService {
  private authApi: IAuthApi;
  constructor(authApi: IAuthApi) {
    this.authApi = authApi;
  }

  async signInAuth(): Promise<AuthSignInResponseDto> {
    return this.authApi.signInAuth();
  }

  async signUpAuth(): Promise<AuthSignUpResponseDto> {
    return this.authApi.signUpAuth();
  }
}

export { AuthService };
