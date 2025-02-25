/* eslint-disable no-unused-vars */
import { UserResponseDto } from '../types/types';

interface IUserService {
  getData: () => Promise<UserResponseDto>;
}

export { type IUserService };
