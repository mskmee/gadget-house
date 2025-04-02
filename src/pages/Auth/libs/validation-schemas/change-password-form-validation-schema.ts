import * as Yup from 'yup';

import { ChangePasswordFormDto } from '../types/form-dto';

const regx = {
  password:
    /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–/[{}\]:;',?/*~$^+=<>])\S{8,}$/,
};

const password = Yup.string()
  .matches(regx.password, 'Please enter a correct password')
  .required('This field is required');

const confirmPassword = Yup.string()
  .oneOf([Yup.ref('password'), ''], 'Password mismatch')
  .required('This field is required');

const changePasswordFormValidationSchema: Yup.Schema<ChangePasswordFormDto> =
  Yup.object().shape({
    password,
    confirmPassword,
  });

export { changePasswordFormValidationSchema };
