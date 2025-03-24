import { FC, useState } from 'react';
import { Formik, Form } from 'formik';
import { Radio, Space } from 'antd';
import cn from 'classnames';

import { PaymentFormDto } from '../../types/form-dto.type';
import { OrderStage } from '../../enums/enums';
import { PaymentMethod } from '../../enums/payment-method';
import { FormRadioInput } from '@/components/common/radio-input/radio-input';
import { paymentFormValidationSchema } from '../../validation-schemas/validation-schemas';
import { ErrorFields } from './formik-fields';

import styles from './form.module.scss';

type Properties = {
  initialValues: PaymentFormDto;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (dto: PaymentFormDto) => void;
  // eslint-disable-next-line no-unused-vars
  onEditForm: (stage: OrderStage) => void;
  stage: OrderStage;
};

const LineValue = ({ value }: { value: string }) => (
  <span>
    {value
      .match(/[A-Z]?[a-z]+/g)
      ?.join(' ')
      .toLowerCase()}
  </span>
);

export const PaymentForm: FC<Properties> = ({
  initialValues,
  onSubmit,
  onEditForm,
  stage,
}) => {
  const [isEditable, setIsEditable] = useState(false);
  const isActive = stage === OrderStage.PAYMENT;

  return (
    <div className={styles.form}>
      <Formik<PaymentFormDto>
        initialValues={initialValues}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={paymentFormValidationSchema}
        onSubmit={(values) => {
          onSubmit(values);
          setIsEditable(false);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form
            className={cn(
              styles.form__form,
              isActive || isEditable ? styles.form__formActive : null,
            )}
          >
            <div className={styles.form__header}>
              <div className={styles.form__headerText}>
                {isActive || isEditable || !initialValues.paymentType ? (
                  <div className={styles.form__number}>3</div>
                ) : (
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
                )}
                <h3 className={styles.form__title}>Payment</h3>
              </div>

              {isActive || isEditable || !initialValues.paymentType ? null : (
                <button
                  onClick={() => onEditForm(OrderStage.PAYMENT)}
                  className={styles.form__btnEdit}
                  type="button"
                >
                  Edit
                </button>
              )}
            </div>

            <div
              className={cn(styles.form__content, styles.form__contentPayment)}
            >
              {isActive || isEditable ? (
                <>
                  <Radio.Group
                    className={styles.form__radioGroup}
                    name="paymentType"
                    value={values.paymentType}
                    onChange={(e) =>
                      setFieldValue('paymentType', e.target.value)
                    }
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
                <div className={styles.form__info}>
                  {Object.entries(initialValues).map(([key, value]) =>
                    value ? <LineValue key={key} value={value} /> : null,
                  )}
                </div>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
