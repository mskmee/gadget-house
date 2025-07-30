import { IUser } from "@/pages/Auth/libs/types/user-dto";

export interface IMappedUser {
  fullName: string;
  email?: string;
  phoneNumber?: string;
  secondaryPhoneNumber?: string;
  day: string;
  month: string;
  year: string;
  gender: string;
  city: string;
  role?: string;
}

export function mapDtoToUser(data:IUser): IMappedUser {
  const birthdate = data.birthdate ? new Date(data.birthdate) : null;

  return {
    fullName: data.fullName,
    email: data.email,
    phoneNumber: data.phoneNumber,
    secondaryPhoneNumber: data.secondaryPhoneNumber || '',
    city: data.address?.city || '',
    day: birthdate ? String(birthdate.getDate()).padStart(2, '0') : '',
    month: birthdate ? String(birthdate.getMonth() + 1).padStart(2, '0') : '',
    year: birthdate ? String(birthdate.getFullYear()) : '',
    gender: data.sex ? data.sex[0] + data.sex.slice(1).toLowerCase() : '',
    role: data.role,
  };
}
