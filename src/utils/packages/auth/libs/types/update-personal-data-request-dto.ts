import { IOrder } from "@/pages/Auth/libs/types/user-dto";

type UpdatePersonalDataRequestDto = {
  id: number;
  fullName: string;
  email?: string;
  phoneNumber?: string;
  secondaryPhoneNumber?: string;
  birthdate: string;
  sex: string;
  address: {
    city: string;
    street?: string;
    houseNumber?: string;
    flat?: string;
    departmentNumber?: string;
    addressLine?: string;
  };
  role?: string;
  orders?: IOrder[]; 
};

export { type UpdatePersonalDataRequestDto };