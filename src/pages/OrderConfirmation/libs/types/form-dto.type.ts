type ContactsFormDto = {
  fullName: string;
  email: string;
  phoneNumber: string;
  comment?: string;
};

type DeliveryFormDto =  {
  deliveryType: string;
  city: string;
  street: string;
  houseNumber?: string;
  flat?: string;
};

type PaymentFormDto =  {
  paymentType: string;
};

export type { ContactsFormDto, DeliveryFormDto, PaymentFormDto };
