import { FC, useState } from 'react';
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

const LineValue = ({ value }: { value: string }) => <span>{value}</span>;

export const PaymentForm: FC<Properties> = ({
  initialValues,
  onSubmit,
  stage,
}) => {
  // const isActive = stage === OrderStage.PAYMENT;
  const [isEditable, setIsEditable] = useState(stage === OrderStage.PAYMENT);

  const handleChangeOrderProcessStage = () => {
    setIsEditable(true);
  };

  const handleFormSubmit = (values: PaymentFormDto) => {
    onSubmit(values);
    setIsEditable(false);
  };

  return (
    <div className={styles.form}>
      <Formik<PaymentFormDto>
        initialValues={initialValues}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={paymentFormValidationSchema}
        onSubmit={handleFormSubmit}
      >
        <Form className={styles.form__form}>
          <div className={styles.form__header}>
            {!isEditable && !initialValues ? (
              <div className={styles.form__headerText}>
                <div className={styles.form__number}>3</div>
                <h2 className={styles.form__title}>Payment</h2>
              </div>
            ) : (
              <>
                <div className={styles.form__headerText}>
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

                  <h2 className={styles.form__title}>Payment</h2>
                </div>

                <button
                  onClick={() => handleChangeOrderProcessStage()}
                  className={styles.form__btnEdit}
                  type="button"
                >
                  Edit
                </button>
              </>
            )}
          </div>

          <div
            className={cn(styles.form__content, styles.form__contentPayment)}
          >
            {!isEditable && !initialValues ? (
              <>
                <Radio.Group
                  className={styles.form__radioGroup}
                  name="paymentType"
                >
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
                  className={cn(
                    'button button-primary',
                    styles.form__buttonDone,
                  )}
                  type="submit"
                >
                  Done
                </button>
              </>
            ) : (
              Object.entries(initialValues).map(([key, value]) =>
                value ? <LineValue key={key} value={value} /> : null,
              )
            )}
          </div>
        </Form>
      </Formik>
    </div>
  );
};
