import { FC } from 'react';
import { Formik, Form } from 'formik';

import { ContactsFormDto } from '../../types/types';
import { OrderStage } from '../../enums/enums';
import { FormInput } from '@/components/components';
import { contactsFormValidationSchema } from '../../validation-schemas/validation-schemas';

import styles from './form.module.scss';

type Properties = {
  initialValues: ContactsFormDto;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (dto: ContactsFormDto) => void;
  stage: OrderStage;
};

const LineValue = ({ value }: { value: string }) => (
  <div style={{ display: 'flex', gap: 15 }}>
    <span>{value}</span>
  </div>
);

export const ContactsForm: FC<Properties> = ({
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
          {!OrderStage.CONTACTS ? (
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
            <div className={styles.form__number}>1</div>
          )}
          <h2 className={styles.form__title}>Contacts</h2>
        </div>
        {!OrderStage.CONTACTS && (
          <button
            // onClick={() => handleEdit(1)}
            className={styles.form__btnEdit}
          >
            Edit
          </button>
        )}
      </div>

      <Formik<ContactsFormDto>
        initialValues={initialValues}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={contactsFormValidationSchema}
        onSubmit={(values) => {
          onSubmit(values);
        }}
      >
        {OrderStage.CONTACTS && (
          <div className={styles.form__content}>
            <Form className={styles.form__form}>
              <div className={styles.form__inputs}>
                <FormInput<ContactsFormDto>
                  name="fullName"
                  type="text"
                  label="Full name*"
                  placeholder="Full name*"
                />
                <FormInput<ContactsFormDto>
                  name="phone"
                  type="text"
                  label="Phone number*"
                  placeholder="Phone number*"
                />
                <FormInput<ContactsFormDto>
                  name="email"
                  type="text"
                  label="Email*"
                  placeholder="Email*"
                />

                <FormInput<ContactsFormDto>
                  name="comment"
                  type="text"
                  label="Comment"
                  placeholder="Comment"
                />
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
