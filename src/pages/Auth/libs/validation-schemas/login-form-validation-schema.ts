import * as Yup from 'yup';

import { LoginFormDto } from '../types/form-dto';

const regx = {
  email:
    /^(?![ .])[\w!#$%&'*+/=?^_`{|}~.-]{4,63}(?<![ .])@[a-zA-Z\d.-]{2,9}(?<![ ])\.[a-zA-Z]{2,9}$/,
  password:
    /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–/[{}\]:;',?/*~$^+=<>])\S{8,}$/,
};

const email = Yup.string()
  .trim()
  .required('This field is required')
  .test("is-valid-email", "Incorrect e-mail or password", (value) =>
    value ? regx.email.test(value) : true
  );

const password = Yup.string()
  .trim()
  .required('This field is required')
  .test("is-valid-password", "Incorrect e-mail or password", (value) =>
    value ? regx.password.test(value) : true
  );

const loginFormValidationSchema: Yup.Schema<LoginFormDto> = Yup.object().shape({
  email,
  password,
});

export { loginFormValidationSchema };
