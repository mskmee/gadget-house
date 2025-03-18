import * as Yup from 'yup';

import { LoginFormDto } from '../types/form-dto';

const regx = {
  email:
    /^(?![ .])[\w!#$%&'*+/=?^_`{|}~.-]{4,63}(?<![ .])@[a-zA-Z\d.-]{2,9}(?<![ ])\.[a-zA-Z]{2,9}$/,
  password:
    /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–/[{}\]:;',?/*~$^+=<>])\S{8,}$/,
};

const email = Yup.string()
  .matches(regx.email, 'Please enter a correct e-mail address')
  .required('This field is required');

const password = Yup.string()
  .matches(regx.password, 'Please enter a correct password')
  .required('This field is required');

const loginFormValidationSchema: Yup.Schema<LoginFormDto> = Yup.object().shape({
  email,
  password,
});

export { loginFormValidationSchema };
