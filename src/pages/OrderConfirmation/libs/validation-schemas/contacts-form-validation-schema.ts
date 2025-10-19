import * as Yup from 'yup';

import { ContactsFormDto } from '../types/types';

const regx = {
  name: /^[a-zA-Zа-яА-ЯґєіїҐЄІЇ]+((['' -][a-zA-Zа-яА-ЯґєіїҐЄІЇ ])?[a-zA-Zа-яА-ЯґєіїҐЄІЇ]*)*$/,
  email:
    /^(?![ .])[\w!#$%&'*+/=?^_`{|}~.-]{4,63}(?<![ .])@[a-zA-Z\d.-]{2,9}(?<![ ])\.[a-zA-Z]{2,9}$/,
  phone: /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
};

const fullName = Yup.string()
  .matches(regx.name, 'Wrong name format')
  .min(2, 'Name is too short!')
  .max(50, 'Name is too long!')
  .required('This field is required ');
const email = Yup.string()
  .matches(regx.email, 'Wrong email format')
  .required('This field is required ');
const phoneNumber = Yup.string()
  .matches(regx.phone, 'Wrong phone number format')
  .required('This field is required ');
const comment = Yup.string().optional();
const contactsFormValidationSchema: Yup.Schema<ContactsFormDto> =
  Yup.object().shape({
    fullName,
    email,
    phoneNumber,
    comment,
  });

export { contactsFormValidationSchema };
