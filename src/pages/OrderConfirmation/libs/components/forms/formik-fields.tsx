import { FC } from 'react';
import { useFormikContext } from 'formik';

import { DeliveryFormDto } from '../../types/form-dto.type';
import { DeliveryMethod } from '../../enums/delivery-method';

import styles from './form.module.scss';
import { ErrorIcon } from '@/assets/constants';
import { FormInput } from '@/components/components';

export const CourierFields: FC = () => {
  const { values } = useFormikContext<DeliveryFormDto>();

  return values.deliveryType === DeliveryMethod.COURIER ? (
    <div style={{ width: '100%', display: 'flex', gap: 24 }}>
      <FormInput<DeliveryFormDto>
        name="houseNumber"
        label="House number*"
        placeholder="House number*"
      />
      <FormInput<DeliveryFormDto>
        name="flat"
        label="Flat number*"
        placeholder="Flat number*"
      />
    </div>
  ) : null;
};

export const ErrorFields: FC = () => {
  const { errors, touched } = useFormikContext<DeliveryFormDto>();

  return errors.deliveryType && touched.deliveryType ? (
    <div className={styles.form__error}>
      {ErrorIcon}
      {errors.deliveryType}
    </div>
  ) : null;
};
