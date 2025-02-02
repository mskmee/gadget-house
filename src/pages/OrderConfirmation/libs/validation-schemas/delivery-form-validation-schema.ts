import * as Yup from 'yup';

import { DeliveryFormDto } from '../types/types';
import { DeliveryMethod } from '../enums/delivery-method';

const city = Yup.string().required('Enter your city').max(50, 'City is too long');
const street = Yup.string().required('Enter your street').max(50, 'Street is too long');
const houseNumber = Yup.string().when('deliveryType', {
  is: (value: string) => value === DeliveryMethod.COURIER,
  then: () => Yup.string().required('Enter number of house').max(10, 'House number is too long'),
  otherwise: () => Yup.string().nullable(),
});
const flat = Yup.string().when('deliveryType', {
  is: (value: string) => value === DeliveryMethod.COURIER,
  then: () => Yup.string().required('Enter number of flat').max(10, 'Flat is too long'),
  otherwise: () => Yup.string().nullable(),
});
const deliveryType = Yup.string()
  .oneOf(Object.values(DeliveryMethod), 'Please select a delivery method')
  .required('Delivery type is required');

const deliveryFormValidationSchema: Yup.Schema<DeliveryFormDto> =
  Yup.object().shape({
    deliveryType,
    city,
    street,
    houseNumber,
    flat,
  });

export { deliveryFormValidationSchema };
