import { request } from "../http";
import { ApiEndpoint, HttpMethod } from "../http";
import { IUserApi } from "./libs/interfaces/user-api.interface";
import { UserResponseDto } from "./libs/types/user-response-dto";


class UserApi implements IUserApi {
  async getData(): Promise<UserResponseDto> {
    return request({
      method: HttpMethod.GET,
      url: ApiEndpoint.USER,
    });
  }
}

export { UserApi };
