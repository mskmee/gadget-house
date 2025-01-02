import { FC } from 'react';
import { Formik, Form } from 'formik';
import { Radio, Space } from 'antd';

import { DeliveryFormDto } from '../../types/types';
import { DeliveryMethod, OrderStage } from '../../enums/enums';
import { FormInput } from '@/components/components';
import { FormRadioInput } from '@/components/common/radio-input/radio-input';
import { deliveryFormValidationSchema } from '../../validation-schemas/contacts-form-validation-schema';
import { CourierFields, ErrorFields } from './formik-fields';

import styles from './form.module.scss';

type Properties = {
  initialValues: DeliveryFormDto;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (dto: DeliveryFormDto) => void;
  stage: OrderStage;
};

const LineValue = ({ value }: { value: string }) => (
  <div className={styles.form__info}>
    <span>{value}</span>
  </div>
);

export const DeliveryForm: FC<Properties> = ({
  initialValues,
  onSubmit,
  stage,
}) => {
  const isActive = stage === OrderStage.DELIVERY;

  if (!isActive) {
    return (
      <>
        {Object.entries(initialValues).map(
          ([key, value]) =>
            !initialValues && <LineValue key={key} value={value} />,
        )}
      </>
    );
  }

  return (
    <div className={styles.form}>
      <Formik<DeliveryFormDto>
        initialValues={initialValues}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={deliveryFormValidationSchema}
        onSubmit={(values) => {
          onSubmit(values);
        }}
      >
        <Form className={styles.form__form}>
          <Radio.Group className={styles.form__radioGroup} name="deliveryType">
            <Space direction="vertical">
              <FormRadioInput
                name="deliveryType"
                label="By courier"
                value={DeliveryMethod.COURIER}
                id={DeliveryMethod.COURIER}
              />

              <FormRadioInput
                name="deliveryType"
                label="Nova Poshta"
                value={DeliveryMethod.NOVA_POSHTA}
                id={DeliveryMethod.NOVA_POSHTA}
              />

              <FormRadioInput
                name="deliveryType"
                label="UkrPoshta"
                value={DeliveryMethod.UKR_POSHTA}
                id={DeliveryMethod.UKR_POSHTA}
              />
            </Space>

            <ErrorFields />
          </Radio.Group>

          <div className={styles.form__inputs}>
            <FormInput<DeliveryFormDto>
              name="city"
              label="City*"
              placeholder="City*"
            />

            <FormInput<DeliveryFormDto>
              name="street"
              label="Street*"
              placeholder="Street*"
            />

            <CourierFields />
          </div>

          <button className="button button-primary" type="submit">
            Next
          </button>
        </Form>
      </Formik>
    </div>
  );
};
