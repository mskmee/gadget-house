import { DeliveryMethod } from '../enums/delivery-method';
import { PaymentMethod } from '../enums/payment-method';
import { ContactsFormDto, DeliveryFormDto, PaymentFormDto } from '../types/form-dto.type';

const CONTACTS_FORM_INITIAL_VALUE: ContactsFormDto = {
  fullName: '',
  email: '',
  phoneNumber: '',
  comment: '',
};

const DELIVERY_FORM_INITIAL_VALUE: DeliveryFormDto = {
  deliveryType: DeliveryMethod.DEFAULT,
  city: '',
  street: '',
  houseNumber: '',
  flat: '',
};

const PAYMENT_FORM_INITIAL_VALUE: PaymentFormDto = {
  paymentType: PaymentMethod.DEFAULT,
};

export { CONTACTS_FORM_INITIAL_VALUE, DELIVERY_FORM_INITIAL_VALUE, PAYMENT_FORM_INITIAL_VALUE };
