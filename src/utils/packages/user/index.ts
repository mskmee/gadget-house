import { UserApi } from './user-api';
import { UserService } from './user-service';

const userApi = new UserApi();
const userService = new UserService(userApi);

export { userService };
