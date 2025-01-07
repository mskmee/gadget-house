import { FC, useState } from 'react';
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

const LineValue = ({ value }: { value: string }) => <span>{value}</span>;

export const ContactsForm: FC<Properties> = ({
  initialValues,
  onSubmit,
  stage,
}) => {
  // const isActive = stage === OrderStage.CONTACTS;
  const [isEditable, setIsEditable] = useState(stage === OrderStage.CONTACTS);

  const handleChangeOrderProcessStage = () => {
    setIsEditable(true);
  };

  const handleFormSubmit = (values: ContactsFormDto) => {
    onSubmit(values);
    setIsEditable(false);
  };

  return (
    <div className={styles.form}>
      <Formik<ContactsFormDto>
        initialValues={initialValues}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={contactsFormValidationSchema}
        onSubmit={handleFormSubmit}
      >
        <Form className={styles.form__form}>
          <div className={styles.form__header}>
            {isEditable && initialValues ? (
              <div className={styles.form__headerText}>
                <div className={styles.form__number}>1</div>
                <h2 className={styles.form__title}>Contacts</h2>
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
                  <h2 className={styles.form__title}>Contacts</h2>
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

          <div className={styles.form__content}>
            {isEditable ? (
              <>
                <div className={styles.form__inputs}>
                  <FormInput<ContactsFormDto>
                    name="fullName"
                    type="text"
                    label="Full name*"
                    placeholder="Full name*"
                  />
                  <FormInput<ContactsFormDto>
                    name="phoneNumber"
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
