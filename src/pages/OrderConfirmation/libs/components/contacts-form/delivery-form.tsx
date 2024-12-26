import { FC } from 'react';
import { Formik, Form } from 'formik';

import { DeliveryFormDto } from '../../types/types';
import { OrderStage } from '../../enums/enums';
import { FormInput } from '@/components/components';
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
      <div className={styles.form__header}>
        <div className={styles.form__headerText}>
          {!OrderStage.DELIVERY ? (
            <div className={styles.form__checkMark}>
              <svg
                width="22"
                height="20"
                viewBox="0 0 22 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 11L9.33364 15L18 7"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          ) : (
            <div className={styles.form__number}>2</div>
          )}
          <h2 className={styles.form__title}>Delivery</h2>
        </div>
        {!OrderStage.DELIVERY && (
          <button
            // onClick={() => handleEdit(1)}
            className={styles.form__btnEdit}
          >
            Edit
          </button>
        )}
      </div>

      <Formik<DeliveryFormDto>
        initialValues={initialValues}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={deliveryFormValidationSchema}
        onSubmit={(values) => {
          onSubmit(values);
        }}
      >
        {OrderStage.DELIVERY && (
          <div className={styles.form__content}>
            <Form className={styles.form__form}>
              <div className={styles.form__radioGroup}>
                <FormInput<DeliveryFormDto>
                  name="delivery"
                  type="radio"
                  span="By courier"
                />

                <FormInput<DeliveryFormDto>
                  name="delivery"
                  type="radio"
                  span="Nova Poshta"
                />

                <FormInput<DeliveryFormDto>
                  name="delivery"
                  type="radio"
                  span="UkrPoshta"
                />
              </div>

              <div className={styles.form__inputs}>
                <FormInput<DeliveryFormDto>
                  name="city"
                  type="text"
                  label="City*"
                  placeholder="City*"
                />

                <FormInput<DeliveryFormDto>
                  name="street"
                  type="text"
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
          </div>
        )}
      </Formik>
    </div>
  );
};
