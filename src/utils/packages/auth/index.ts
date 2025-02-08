import { AuthApi } from './auth-api';
import { AuthService } from './auth-service';

const authApi = new AuthApi();
const authService = new AuthService(authApi);

export { authService };
export type {
} from './libs/types/types';
