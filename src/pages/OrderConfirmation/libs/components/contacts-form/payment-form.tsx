import { FC } from 'react';
import { Formik, Form } from 'formik';
import cn from 'classnames';

import { PaymentFormDto } from '../../types/form-dto.type';
import { OrderStage } from '../../enums/enums';
import { paymentFormValidationSchema } from '../../validation-schemas/contacts-form-validation-schema';

import styles from './form.module.scss';
import { FormInput } from '@/components/components';

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
          {!OrderStage.PAYMENT ? (
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
            <div className={styles.form__number}>3</div>
          )}
          <h2 className={styles.form__title}>Payment</h2>
        </div>
        {!OrderStage.PAYMENT && (
          <button
            // onClick={() => handleEdit(1)}
            className={styles.form__btnEdit}
          >
            Edit
          </button>
        )}
      </div>

      <Formik<PaymentFormDto>
        initialValues={initialValues}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={paymentFormValidationSchema}
        onSubmit={(values) => {
          onSubmit(values);
        }}
      >
        <div className={styles.form__content}>
          <Form className={styles.form__form}>
            <div className={styles.form__radioGroup}>
              <FormInput<PaymentFormDto>
                name="payment"
                type="radio"
                span="Payment after checking"
              />

              <FormInput<PaymentFormDto>
                name="payment"
                type="radio"
                span="To courier"
              />
            </div>

            <button
              className={cn('button button-primary', styles.form__buttonDone)}
              type="submit"
            >
              Done
            </button>
          </Form>
        </div>
      </Formik>
    </div>
  );
};
