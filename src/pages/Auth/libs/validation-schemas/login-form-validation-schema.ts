import * as Yup from 'yup';

import { LoginFormDto } from '../types/form-dto';

const regx = {
  email: /^(?![ .])[\w!#$%&'*+/=?^_`{|}~.-]{4,63}(?<![ .])@[a-zA-Z\d.-]{2,9}(?<![ ])\.[a-zA-Z]{2,9}$/,
  password: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–/[{}\]:;',?/*~$^+=<>])\S{8,}$/,
}

const email = Yup.string()
  .matches(regx.email, 'Wrong email format')
  .required('Enter your email');

const password = Yup.string()
  .matches(regx.password, 'Wrong password format')
  .required('Enter your password');

const loginFormValidationSchema: Yup.Schema<LoginFormDto> =
  Yup.object().shape({
    email,
    password,
  });

export { loginFormValidationSchema };
