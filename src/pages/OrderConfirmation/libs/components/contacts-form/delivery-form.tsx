import { FC, useState } from 'react';
import { Formik, Form } from 'formik';
import { Radio, RadioChangeEvent, Space } from 'antd';

import { DeliveryFormDto } from '../../types/types';
import { OrderStage } from '../../enums/enums';
import { FormInput } from '@/components/components';
import { FormRadioInput } from '@/components/common/radio-input/radio-input';
import { deliveryFormValidationSchema } from '../../validation-schemas/contacts-form-validation-schema';

import styles from './form.module.scss';

type Properties = {
  initialValues: DeliveryFormDto;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (dto: DeliveryFormDto) => void;
  stage: OrderStage;
};

const LineValue = ({ value }: { value: string }) => (
  <div
    style={{ display: 'flex', gap: 15, color: '#808080', paddingBottom: 32 }}
  >
    <span>{value}</span>
  </div>
);

export const DeliveryForm: FC<Properties> = ({
  initialValues,
  onSubmit,
  stage,
}) => {
  const isActive = stage === OrderStage.CONTACTS;
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
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
          <Radio.Group
            className={styles.form__radioGroup}
            onChange={onChange}
            value={value}
          >
            <Space direction="vertical">
              <FormRadioInput
                name="delivery"
                type="radio"
                label="By courier"
                value="courier"
              />

              <FormRadioInput
                name="delivery"
                type="radio"
                label="Nova Poshta"
                value="novaposhta"
              />

              <FormRadioInput
                name="delivery"
                label="UkrPoshta"
                value="ukrposhta"
              />
            </Space>
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

            <div style={{ width: '100%', display: 'flex', gap: 24 }}>
              <FormInput<DeliveryFormDto>
                name="houseNumber"
                type="text"
                label="House number*"
                placeholder="House number*"
              />

              <FormInput<DeliveryFormDto>
                name="flat"
                type="textarea"
                label="Flat number*"
                placeholder="Flat number*"
              />
            </div>
          </div>

          <button className="button button-primary" type="submit">
            Next
          </button>
        </Form>
      </Formik>
    </div>
  );
};
