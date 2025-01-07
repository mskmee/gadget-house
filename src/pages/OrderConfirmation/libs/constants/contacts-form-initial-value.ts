import { ContactsFormDto, DeliveryFormDto, PaymentFormDto } from '../types/form-dto.type';

const CONTACTS_FORM_INITIAL_VALUE: ContactsFormDto = {
  fullName: '',
  email: '',
  phoneNumber: '',
  comment: '',
};

const DELIVERY_FORM_INITIAL_VALUE: DeliveryFormDto = {
  deliveryType: '',
  city: '',
  street: '',
  houseNumber: '',
  flat: '',
};

const PAYMENT_FORM_INITIAL_VALUE: PaymentFormDto = {
  paymentType: '',
};

export { CONTACTS_FORM_INITIAL_VALUE, DELIVERY_FORM_INITIAL_VALUE, PAYMENT_FORM_INITIAL_VALUE };
