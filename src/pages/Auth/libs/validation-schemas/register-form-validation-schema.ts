import * as Yup from 'yup';

import { RegisterFormDto } from '../types/form-dto';

const regx = {
  name: /^[a-zA-Zа-яА-ЯґєіїҐЄІЇ]+(?:[ '-][a-zA-Zа-яА-ЯґєіїҐЄІЇ]+)*$/,
  email:
    /^(?![ .])[\w!#$%&'*+/=?^_`{|}~.-]{4,63}(?<![ .])@[a-zA-Z\d.-]{2,9}(?<![ ])\.[a-zA-Z]{2,9}$/,
  phone: /^\(0\d{2}\)-\d{3}-\d{2}-\d{2}$/,
  password:
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?])\S{8,24}$/,
};

const fullName = Yup.string()
  .matches(regx.name, 'Please enter a correct name')
  .min(2, 'Name is too short!')
  .max(50, 'Name is too long!')
  .test('two-words', 'Please enter both first and last name', (value) => {
    if (!value) return false;
    const words = value.trim().split(/\s+/);
    return words.length >= 2;
  })
  .required('This field is required');

const email = Yup.string()
  .matches(regx.email, 'Please enter a correct e-mail address')
  .required('This field is required');

const phoneNumber = Yup.string()
  .matches(regx.phone, 'Please enter a correct phone number')
  .required('This field is required');

const password = Yup.string()
  .matches(regx.password, 'Please enter a correct password')
  .required('This field is required');

const passwordRepeat = Yup.string()
  .oneOf([Yup.ref('password'), ''], 'Password mismatch')
  .required('Repeat your password');

const registerFormValidationSchema: Yup.Schema<RegisterFormDto> =
  Yup.object().shape({
    fullName,
    email,
    phoneNumber,
    password,
    passwordRepeat,
  });

export { registerFormValidationSchema };
