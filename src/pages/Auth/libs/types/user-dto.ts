type User = {
  id?: number;
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  role?: string;
};

export interface IUser extends User {
  city?: string;
  day?: number | string;
  month?: number | string;
  year?: number | string;
  additionalPhoneNumber?: string;
  gender?: string;
}

export type { User };

