import * as Yup from 'yup';

import { RegisterFormDto } from '../types/form-dto';

const regx = {
  name: /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
  email: /^(?![ .])[\w!#$%&'*+/=?^_`{|}~.-]{4,63}(?<![ .])@[a-zA-Z\d.-]{2,9}(?<![ ])\.[a-zA-Z]{2,9}$/,
  phone: /^[+]?3?[\s]?8?[\s]?\(?0\d{2}?\)?[\s]?\d{3}[\s|-]?\d{2}[\s|-]?\d{2}$/,
  password: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–/[{}\]:;',?/*~$^+=<>])\S{8,}$/,
}

const name = Yup.string()
  .matches(regx.name, 'Wrong name format')
  .min(2, 'Name is too short!')
  .max(20, 'Name is too long!')
  .required('Enter your name');

const surname = Yup.string()
  .matches(regx.name, 'Wrong surname format')
  .min(2, 'Surname is too short!')
  .max(20, 'Surname is too long!')
  .required('Enter your surname');

const email = Yup.string()
  .matches(regx.email, 'Wrong email format')
  .required('Enter your email');

const phoneNumber = Yup.string()
  .matches(regx.phone, 'Wrong phone number format')
  .required('Enter your phone number');

const password = Yup.string()
  .matches(regx.password, 'Wrong password format')
  .required('Enter your password');

const passwordRepeat = Yup.string()
  .oneOf([Yup.ref('password'), ''], 'Passwords must match')
  .required('Repeat your password');

const registerFormValidationSchema: Yup.Schema<RegisterFormDto> =
  Yup.object().shape({
    name,
    surname,
    email,
    phoneNumber,
    password,
    passwordRepeat,
  });

export { registerFormValidationSchema };
