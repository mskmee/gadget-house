import { IUserApi } from "./libs/interfaces/user-api.interface";
import { IUserService } from "./libs/interfaces/user-service.interface";
import { UserResponseDto } from "./libs/types/user-response-dto";


class UserService implements IUserService {
  private userApi: IUserApi;
  constructor(userApi: IUserApi) {
    this.userApi = userApi;
  }

  async getData(): Promise<UserResponseDto> {
    return this.userApi.getData();
  }
}

export { UserService };
