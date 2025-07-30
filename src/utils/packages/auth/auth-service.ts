import { IAuthApi, IAuthService } from './libs/interfaces/interfaces';
import {
  AuthSignInRequestDto,
  AuthSignInResponseDto,
  AuthSignUpRequestDto,
  AuthSignUpResponseDto,
  AuthForgotPasswordResponseDto,
  UserResponseDto,
  ChangePasswordRequestDto,
  ChangePasswordResponseDto,
  UpdatePersonalDataRequestDto,
  UpdateContactsRequestDto,
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

  async changePassword(data: ChangePasswordRequestDto): Promise<ChangePasswordResponseDto> {
    return this.authApi.changePassword(data);
  }

  async fetchUserProfile(): Promise<UserResponseDto> {
    return this.authApi.fetchUserProfile();
  }

  async updatePersonalData(data: UpdatePersonalDataRequestDto): Promise<UserResponseDto> {
    return this.authApi.updatePersonalData(data);
  }

  async updateContacts(data: UpdateContactsRequestDto): Promise<UserResponseDto> {
    return this.authApi.updateContacts(data);
  }
}

export { AuthService };
