import { FC, useState } from 'react';
import { Formik, Form } from 'formik';
import { Radio, RadioChangeEvent, Space } from 'antd';
import cn from 'classnames';

import { PaymentFormDto } from '../../types/form-dto.type';
import { OrderStage } from '../../enums/enums';
import { FormRadioInput } from '@/components/common/radio-input/radio-input';
// import { paymentFormValidationSchema } from '../../validation-schemas/contacts-form-validation-schema';

import styles from './form.module.scss';

type Properties = {
  initialValues: PaymentFormDto;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (dto: PaymentFormDto) => void;
  stage: OrderStage;
};

const LineValue = ({ value }: { value: string }) => (
  <div
    style={{ display: 'flex', gap: 15, color: '#808080', paddingBottom: 32 }}
  >
    <span>{value}</span>
  </div>
);

export const PaymentForm: FC<Properties> = ({
  initialValues,
  onSubmit,
  stage,
}) => {
  const isActive = stage === OrderStage.PAYMENT;
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

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
        // validationSchema={paymentFormValidationSchema}
        // TODO: check validation schema
        onSubmit={(values) => {
          onSubmit(values);
        }}
      >
        <Form className={styles.form__form}>
          <Radio.Group
            //TODO: create and use enum PaymentMethod
            className={styles.form__radioGroup}
            onChange={onChange}
            value={value}
          >
            <Space direction="vertical">
              <FormRadioInput
                name="payment"
                label="Payment after checking"
                value="afterChecking"
                id="afterChecking"
              />

              <FormRadioInput
                name="payment"
                label="To courier"
                value="courier"
                id="courier"
              />
            </Space>
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
