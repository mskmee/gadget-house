import * as Yup from 'yup';

import { PaymentFormDto } from '../types/types';
import { PaymentMethod } from '../enums/payment-method';

const paymentType = Yup.string()
  .oneOf(Object.values(PaymentMethod), 'Please select a payment method')
  .required('Payment method is required');

const paymentFormValidationSchema: Yup.Schema<PaymentFormDto> =
  Yup.object().shape({ paymentType });

export { paymentFormValidationSchema };
