import { DeliveryMethodType } from '../enums/delivery-method';
import { PaymentMethodType } from '../enums/payment-method';

type ContactsFormDto = {
  fullName: string;
  email: string;
  phoneNumber: string;
  comment?: string;
};

type DeliveryFormDto = {
  deliveryType: DeliveryMethodType;
  city: string;
  street?: string;
  departmentNumber?: string;
  houseNumber?: string;
  flat?: string;
};

type PaymentFormDto = {
  paymentType: PaymentMethodType;
};

export type { ContactsFormDto, DeliveryFormDto, PaymentFormDto };
