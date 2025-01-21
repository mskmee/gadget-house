import * as Yup from 'yup';
import { ContactsFormDto, DeliveryFormDto, PaymentFormDto } from '../types/types';
import { DeliveryMethod } from '../enums/delivery-method';
import { PaymentMethod } from '../enums/payment-method';

const regx = {
  name: /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{3,}$/i,
  phone: /^[+]?3?[\s]?8?[\s]?\(?0\d{2}?\)?[\s]?\d{3}[\s|-]?\d{2}[\s|-]?\d{2}$/,
}

const fullName = Yup.string().matches(regx.name, 'Wrong name format').required('Enter your full name');
const email = Yup.string().matches(regx.email, 'Wrong email format').required('Enter your email');
const phoneNumber = Yup.string().matches(regx.phone, 'Wrong phone number format').required('Enter your phone number');
const comment = Yup.string().optional().max(1000, 'Comment is too long');
const city = Yup.string().required('Enter your city').max(50, 'City is too long');
const street = Yup.string().required('Enter your street').max(50, 'Street is too long');
const houseNumber = Yup.string().when('deliveryType', {
  is: (value: string) => value === 'courier',
  then: () => Yup.string().required('Enter number of house').max(10, 'House number is too long'),
  otherwise: () => Yup.string().nullable(),
});
const flat = Yup.string().when('deliveryType', {
  is: (value: string) => value === 'courier',
  then: () => Yup.string().required('Enter number of flat').max(10, 'Flat is too long'),
  otherwise: () => Yup.string().nullable(),
});
const deliveryType = Yup.string()
  .oneOf(Object.values(DeliveryMethod), 'Please select a delivery method')
  .required('Delivery type is required');
const paymentType = Yup.string()
  .oneOf(Object.values(PaymentMethod), 'Please select a payment method')
  .required('Payment method is required');

const contactsFormValidationSchema: Yup.Schema<ContactsFormDto> =
  Yup.object().shape({
    fullName,
    email,
    phoneNumber,
    comment,
  });

const deliveryFormValidationSchema: Yup.Schema<DeliveryFormDto> =
  Yup.object().shape({
    deliveryType,
    city,
    street,
    houseNumber,
    flat,
  });

const paymentFormValidationSchema: Yup.Schema<PaymentFormDto> =
  Yup.object().shape({ paymentType });

export { contactsFormValidationSchema, deliveryFormValidationSchema, paymentFormValidationSchema };
