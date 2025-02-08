import * as Yup from 'yup';

import { ForgotFormDto } from '../types/types';

const regx = {
  email: /^(?![ .])[\w!#$%&'*+/=?^_`{|}~.-]{4,63}(?<![ .])@[a-zA-Z\d.-]{2,9}(?<![ ])\.[a-zA-Z]{2,9}$/,
  phone: /^[+]?3?[\s]?8?[\s]?\(?0\d{2}?\)?[\s]?\d{3}[\s|-]?\d{2}[\s|-]?\d{2}$/,
}

const email = Yup.string().matches(regx.email, 'Wrong email format').required('Enter your email');
const password = Yup.string().matches(regx.phone, 'Wrong phone number format').required('Enter your phone number');
const passwordRepeat = Yup.string().optional().max(1000, 'Comment is too long');

const forgotFormValidationSchema: Yup.Schema<ForgotFormDto> =
  Yup.object().shape({
    email,
    password,
    passwordRepeat
  });

export { forgotFormValidationSchema };
