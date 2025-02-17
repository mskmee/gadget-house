import { FC } from 'react';
import { useFormikContext } from 'formik';

import { DeliveryFormDto } from '../../types/form-dto.type';
import { DeliveryMethod } from '../../enums/delivery-method';
import { FormInput } from '@/components/components';
import { ErrorIcon } from '@/assets/constants';

import styles from './form.module.scss';

export const CourierFields: FC = () => {
  const { values } = useFormikContext<DeliveryFormDto>();

  return values.deliveryType === DeliveryMethod.COURIER ? (
    <div className={styles.form__inputsDelivery}>
      <FormInput<DeliveryFormDto>
        name="houseNumber"
        label="House number*"
        placeholder="House number*"
      />

      <FormInput<DeliveryFormDto>
        name="flat"
        label="Flat number"
        placeholder="Flat number"
      />
    </div>
  ) : null;
};

export const ErrorFields: FC = () => {
  const { errors, touched } = useFormikContext<DeliveryFormDto>();

  return errors.deliveryType && touched.deliveryType ? (
    <div className={styles.form__error}>
      <img src={ErrorIcon} alt="Error icon" />
      {errors.deliveryType}
    </div>
  ) : null;
};
