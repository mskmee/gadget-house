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
  <div className={styles.form__info}>
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
      <Formik<ContactsFormDto>
        initialValues={initialValues}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={contactsFormValidationSchema}
        onSubmit={(values) => {
          onSubmit(values);
        }}
      >
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
              inputType="textarea"
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
      </Formik>
    </div>
  );
};
