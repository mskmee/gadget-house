import { FC } from 'react';
import { Formik, Form } from 'formik';
import { Radio, Space } from 'antd';
import cn from 'classnames';

import { PaymentFormDto } from '../../types/form-dto.type';
import { OrderStage } from '../../enums/enums';
import { PaymentMethod } from '../../enums/payment-method';
import { FormRadioInput } from '@/components/common/radio-input/radio-input';
import { paymentFormValidationSchema } from '../../validation-schemas/contacts-form-validation-schema';
import { ErrorFields } from './formik-fields';

import styles from './form.module.scss';

type Properties = {
  initialValues: PaymentFormDto;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (dto: PaymentFormDto) => void;
  stage: OrderStage;
};

const LineValue = ({ value }: { value: string }) => (
  <div className={styles.form__info}>
    <span>{value}</span>
  </div>
);

export const PaymentForm: FC<Properties> = ({
  initialValues,
  onSubmit,
  stage,
}) => {
  const isActive = stage === OrderStage.PAYMENT;

  if (!isActive) {
    return (
      <>
        {Object.entries(initialValues).map(([key, value]) => (
          <LineValue key={key} value={value} />
        ))}
      </>
    );
  }

  return (
    <div className={styles.form}>
      <Formik<PaymentFormDto>
        initialValues={initialValues}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={paymentFormValidationSchema}
        onSubmit={(values) => {
          onSubmit(values);
        }}
      >
        <Form className={styles.form__form}>
          <Radio.Group className={styles.form__radioGroup} name="paymentType">
            <Space direction="vertical">
              <FormRadioInput
                name="paymentType"
                label="Payment after checking"
                value={PaymentMethod.AFTER_CHECKING}
                id={PaymentMethod.AFTER_CHECKING}
              />

              <FormRadioInput
                name="paymentType"
                label="To courier"
                value={PaymentMethod.COURIER}
                id={PaymentMethod.COURIER}
              />
            </Space>

            <ErrorFields />
          </Radio.Group>

          <button
            className={cn('button button-primary', styles.form__buttonDone)}
            type="submit"
          >
            Done
          </button>
        </Form>
      </Formik>
    </div>
  );
};
