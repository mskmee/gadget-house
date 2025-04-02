import * as Yup from 'yup';

import { ForgotFormDto } from '../types/types';

const regx = {
  email:
    /^(?![ .])[\w!#$%&'*+/=?^_`{|}~.-]{4,63}(?<![ .])@[a-zA-Z\d.-]{2,9}(?<![ ])\.[a-zA-Z]{2,9}$/,
};

const email = Yup.string()
  .matches(regx.email, 'Please enter a correct e-mail address')
  .required('This field is required');

const forgotFormValidationSchema: Yup.Schema<ForgotFormDto> =
  Yup.object().shape({
    email
  });

export { forgotFormValidationSchema };
