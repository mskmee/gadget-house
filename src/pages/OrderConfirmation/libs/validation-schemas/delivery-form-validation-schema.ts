import * as Yup from 'yup';

import { DeliveryFormDto } from '../types/types';
import { DeliveryMethod } from '../enums/delivery-method';

const regx = {
  useOnlyLetters: /^(?![ .])[a-zA-Zа-яА-ЯёЁ ]+(?<![ .])$/,
  useOnlyNumbers: /^(?![ .])\d+(?<![ .])$/,
};

const city = Yup.string()
  .required('Enter your city')
  .matches(regx.useOnlyLetters, 'Wrong city format')
  .min(2, 'City is too short!')
  .max(50, 'City is too long');

const street = Yup.string().when('deliveryType', {
  is: (value: string) => value !== DeliveryMethod.COURIER,
  then: () => Yup.string().notRequired(),
  otherwise: () =>
    Yup.string()
      .required('Enter your street')
      .matches(regx.useOnlyLetters, 'Wrong street format')
      .min(2, 'Street is too short!')
      .max(50, 'Street is too long'),
});

const departmentNumber = Yup.string().when('deliveryType', {
  is: (value: string) => value === DeliveryMethod.COURIER,
  then: () => Yup.string().notRequired(),
  otherwise: () =>
    Yup.string()
      .required('Enter number of department')
      .matches(regx.useOnlyNumbers, 'Wrong department number format')
      .max(10, 'Department number is too long'),
});

const houseNumber = Yup.string().when('deliveryType', {
  is: (value: string) => value === DeliveryMethod.COURIER,
  then: () =>
    Yup.string()
      .required('Enter number of house')
      .matches(regx.useOnlyNumbers, 'Wrong house number format')
      .max(10, 'House number is too long'),
  otherwise: () => Yup.string().notRequired(),
});

const flat = Yup.string().when('deliveryType', {
  is: (value: string) => value === DeliveryMethod.COURIER,
  then: () =>
    Yup.string()
      .optional()
      .matches(regx.useOnlyNumbers, 'Wrong flat number format')
      .max(10, 'Flat is too long'),
  otherwise: () => Yup.string().notRequired(),
});
const deliveryType = Yup.string()
  .oneOf(Object.values(DeliveryMethod), 'Please select a delivery method')
  .required('Delivery type is required');

const deliveryFormValidationSchema: Yup.Schema<DeliveryFormDto> =
  Yup.object().shape({
    deliveryType,
    city,
    street,
    departmentNumber,
    houseNumber,
    flat,
  });

export { deliveryFormValidationSchema };
