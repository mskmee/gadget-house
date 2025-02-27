import * as Yup from 'yup';

import { ForgotFormDto } from '../types/types';

const regx = {
  email:
    /^(?![ .])[\w!#$%&'*+/=?^_`{|}~.-]{4,63}(?<![ .])@[a-zA-Z\d.-]{2,9}(?<![ ])\.[a-zA-Z]{2,9}$/,
};

const email = Yup.string()
  .matches(regx.email, 'Wrong email format')
  .required('Enter your email');

const forgotFormValidationSchema: Yup.Schema<ForgotFormDto> =
  Yup.object().shape({
    email
  });

export { forgotFormValidationSchema };
