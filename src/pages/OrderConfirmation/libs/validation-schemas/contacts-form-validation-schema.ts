import * as Yup from 'yup';
import { ContactsFormDto, DeliveryFormDto, PaymentFormDto } from '../types/types';

const regx = {
  name: /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{3,}$/i,
  phone: /^[+]?3?[\s]?8?[\s]?\(?0\d{2}?\)?[\s]?\d{3}[\s|-]?\d{2}[\s|-]?\d{2}$/,
}

const fullName = Yup.string().matches(regx.name, 'Wrong name format').required('Enter full name');
const email = Yup.string().matches(regx.email, 'Wrong email format').required('Enter email');
const phone = Yup.string().matches(regx.phone, 'Wrong phone number format').required('Phone number is required');
const comment = Yup.string().optional().max(1000, 'Comment is too long');
const city = Yup.string().required('City is required').max(100, 'City is too long');
const street = Yup.string().required('Street is required').max(100, 'Street is too long');
const houseNumber = Yup.string().required('Floor is required').max(10, 'Floor is too long');
const flat = Yup.string().required('Flat is required').max(100, 'Flat is too long');
const deliveryType = Yup.string().required('Payment type is required');
const paymentType = Yup.string().required('Payment type is required');

const contactsFormValidationSchema: Yup.Schema<ContactsFormDto> =
  Yup.object().shape({
    fullName,
    email,
    phone,
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
  Yup.object().shape({
    paymentType,
  });

export { contactsFormValidationSchema, deliveryFormValidationSchema, paymentFormValidationSchema };
