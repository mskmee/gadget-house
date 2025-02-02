import { FC, useState } from 'react';
import { Formik, Form } from 'formik';
import { Radio, Space } from 'antd';

import { DeliveryFormDto } from '../../types/types';
import { DeliveryMethod, OrderStage } from '../../enums/enums';
import { FormInput } from '@/components/components';
import { FormRadioInput } from '@/components/common/radio-input/radio-input';
import { deliveryFormValidationSchema } from '../../validation-schemas/validation-schemas';
import { CourierFields, ErrorFields } from './formik-fields';

import styles from './form.module.scss';

type Properties = {
  initialValues: DeliveryFormDto;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (dto: DeliveryFormDto) => void;
  stage: OrderStage;
};

const LineValue = ({ value }: { value: string }) => <span>{value}</span>;

export const DeliveryForm: FC<Properties> = ({
  initialValues,
  onSubmit,
  stage,
}) => {
  const [isEditable, setIsEditable] = useState(false);
  const isActive = stage === OrderStage.DELIVERY;

  return (
    <div className={styles.form}>
      <Formik<DeliveryFormDto>
        initialValues={initialValues}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={deliveryFormValidationSchema}
        onSubmit={(values) => {
          onSubmit(values);
          setIsEditable(false);
        }}
      >
        <Form className={styles.form__form}>
          <div className={styles.form__header}>
            <div className={styles.form__headerText}>
              {isActive || isEditable || !initialValues.deliveryType ? (
                <div className={styles.form__number}>2</div>
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
              <h2 className={styles.form__title}>Delivery</h2>
            </div>

            {isActive || isEditable || !initialValues.deliveryType ? null : (
              <button
                onClick={() => setIsEditable(true)}
                className={styles.form__btnEdit}
                type="button"
              >
                Edit
              </button>
            )}
          </div>

          <div className={styles.form__content}>
            {isActive || isEditable ? (
              <>
                <Radio.Group
                  className={styles.form__radioGroup}
                  name="deliveryType"
                >
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
      </Formik>
    </div>
  );
};
