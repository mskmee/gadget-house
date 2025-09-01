import { IAddress, IOrder } from '@/pages/Auth/libs/types/user-dto';

export type UserResponseDto = {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  secondaryPhoneNumber: string;
  birthdate: string;
  sex: string;
  address: IAddress;
  role: string;
  orders: IOrder[];
};
