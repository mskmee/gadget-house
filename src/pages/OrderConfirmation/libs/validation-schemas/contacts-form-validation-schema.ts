import * as Yup from 'yup';

import { ContactsFormDto } from '../types/types';

const regx = {
  name: /^[a-zA-Zа-яА-ЯґєіїҐЄІЇ]+(([' -][a-zA-Zа-яА-ЯґєіїҐЄІЇ ])?[a-zA-Zа-яА-ЯґєіїҐЄІЇ]*)*$/,
  email: /^(?![ .])[\w!#$%&'*+/=?^_`{|}~.-]{4,63}(?<![ .])@[a-zA-Z\d.-]{2,9}(?<![ ])\.[a-zA-Z]{2,9}$/,
  phone: /^[+]?3?[\s]?8?[\s]?\(?0\d{2}?\)?[\s]?\d{3}[\s|-]?\d{2}[\s|-]?\d{2}$/,
}

const fullName = Yup.string().matches(regx.name, 'Wrong name format').min(2, 'Name is too short!')
  .max(50, 'Name is too long!').required('Enter your full name');
const email = Yup.string().matches(regx.email, 'Wrong email format').required('Enter your email');
const phoneNumber = Yup.string().matches(regx.phone, 'Wrong phone number format').required('Enter your phone number');
const comment = Yup.string().optional().max(1000, 'Comment is too long');

const contactsFormValidationSchema: Yup.Schema<ContactsFormDto> =
  Yup.object().shape({
    fullName,
    email,
    phoneNumber,
    comment,
  });

export { contactsFormValidationSchema };
