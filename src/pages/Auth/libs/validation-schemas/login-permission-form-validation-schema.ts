import * as Yup from 'yup';

import { LoginFormDto } from '../types/form-dto';

const regx = {
  name: /^[a-zA-Zа-яА-Я-ЯґєіїҐЄІЇ]+(([' -][a-zA-Zа-яА-Я-ЯґєіїҐЄІЇ ])?[a-zA-Zа-яА-Я-ЯґєіїҐЄІЇ]*)*$/,
  email:
    /^(?![ .])[\w!#$%&'*+/=?^_`{|}~.-]{4,63}(?<![ .])@[a-zA-Z\d.-]{2,9}(?<![ ])\.[a-zA-Z]{2,9}$/,
  password:
    /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–/[{}\]:;',?/*~$^+=<>])\S{8,}$/,
};

const fullName = Yup.string()
  .matches(regx.name, 'Please enter a correct name')
  .min(2, 'Name is too short!')
  .max(20, 'Name is too long!')
  .required('This field is required');

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

const loginPermissionFormValidationSchema: Yup.Schema<LoginFormDto> = Yup.object().shape({
  fullName,
  email,
  password,
});

export { loginPermissionFormValidationSchema };
