/* eslint-disable no-unused-vars */
import { UserResponseDto } from '../types/types';

interface IUserApi {
  getData: () => Promise<UserResponseDto>;
}

export { type IUserApi };
