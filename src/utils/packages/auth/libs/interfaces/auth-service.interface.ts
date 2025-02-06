/* eslint-disable no-unused-vars */
import { AuthSignInResponseDto, AuthSignUpResponseDto } from '../types/types';

interface IAuthService {
  signInAuth: () => Promise<AuthSignInResponseDto>;
  signUpAuth: () => Promise<AuthSignUpResponseDto>;
}

export { type IAuthService };
