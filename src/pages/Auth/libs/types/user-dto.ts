export type PersonalDataPayload = {
  fullName: string;
  date: {
    day: string | number;
    month: string | number;
    year: string | number;
  };
  city: string;
  gender: string;
};

export type PersonalContactsPayload = {
  email: string;
  phoneNumber: string;
  secondaryPhoneNumber: string;
};

type User = {
  id: number;
  fullName: string;
  email?: string;
  phoneNumber?: string;
  role?: string;
};

export interface IAddress {
  city: string;
  street: string;
  houseNumber: string;
  flat: string;
  departmentNumber: string;
  addressLine: string;
}

export interface IImage {
  link: string;
  order: number;
}

export interface IShortProduct {
  id: number;
  name: string;
  href: string;
  price: number;
  images: IImage[];
  code: string;
  categoryId: number;
  available: boolean;
  rating: number;
}

export interface IOrderItem {
  shortProductResponseDto: IShortProduct;
  quantity: number;
  price: number;
}

export interface IOrderUser {
  id: number;
  fullName: string;
  email: string;
  role: string;
}

export interface IOrder {
  id: number;
  email: string;
  fullName: string;
  phoneNumber: string;
  deliveryMethod: string;
  deliveryStatus: string;
  address: IAddress;
  isPaid: boolean;
  createdAt: string;
  total: number;
  orderItems: IOrderItem[];
  user: IOrderUser;
  comment: string;
}

export interface IFullUser {
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
}

export interface IUser extends User {
  secondaryPhoneNumber?: string;
  birthdate?: string;
  sex?: string;
  address?: IAddress;
  orders?: IOrder[];
}

export type { User };
