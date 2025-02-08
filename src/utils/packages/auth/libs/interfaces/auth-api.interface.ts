/* eslint-disable no-unused-vars */
import { AuthSignInResponseDto, AuthSignUpResponseDto} from '../types/types';

interface IAuthApi {
  signInAuth: () => Promise<AuthSignInResponseDto>;
  signUpAuth: () => Promise<AuthSignUpResponseDto>;
}

export { type IAuthApi };

