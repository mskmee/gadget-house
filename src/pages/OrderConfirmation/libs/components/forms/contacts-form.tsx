import { FC, useState } from 'react';
import { Formik, Form } from 'formik';
import cn from 'classnames';

import { ContactsFormDto } from '../../types/types';
import { OrderStage } from '../../enums/enums';
import { FormInput } from '@/components/components';
import { contactsFormValidationSchema } from '../../validation-schemas/validation-schemas';
import formatContactsInfo from '../../utils/formatContactsInfo';

import styles from './form.module.scss';

type Properties = {
  initialValues: ContactsFormDto;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (dto: ContactsFormDto) => void;
  // eslint-disable-next-line no-unused-vars
  onEditForm: (stage: OrderStage) => void;
  stage: OrderStage;
};

const LineValue = ({ text }: { text: string }) => <span>{text}</span>;

export const ContactsForm: FC<Properties> = ({
  initialValues,
  onSubmit,
  onEditForm,
  stage,
}) => {
  const [isEditable, setIsEditable] = useState(false);
  const isActive = stage === OrderStage.CONTACTS;

  return (
    <div className={styles.form}>
      <Formik<ContactsFormDto>
        initialValues={initialValues}
        validateOnBlur={true}
        validateOnChange={true}
        validationSchema={contactsFormValidationSchema}
        onSubmit={(values) => {
          onSubmit(values);
          setIsEditable(false);
        }}
      >
        <Form className={styles.form__form}>
          <div className={styles.form__header}>
            <div className={styles.form__headerText}>
              {isActive || isEditable ? (
                <div className={styles.form__number}>1</div>
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
              <h3 className={styles.form__title}>Contacts</h3>
            </div>

            {isActive || isEditable ? null : (
              <button
                onClick={() => onEditForm(OrderStage.CONTACTS)}
                className={styles.form__btnEdit}
                type="button"
              >
                Edit
              </button>
            )}
          </div>

          <div
            className={cn(
              styles.form__content,
              isActive || isEditable ? styles.form__contentActive : null,
            )}
          >
            {isActive || isEditable ? (
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
                    type="tel"
                    label="Phone number*"
                    placeholder="Phone number*"
                  />
                  <FormInput<ContactsFormDto>
                    name="email"
                    type="text"
                    label="E-mail*"
                    placeholder="E-mail*"
                  />

                  <FormInput<ContactsFormDto>
                    inputType="textarea"
                    name="comment"
                    type="text"
                    label="Comment"
                    placeholder="Comment"
                  />
                </div>

                <button
                  className={cn('button', 'button-primary', styles.form__btn)}
                  type="submit"
                >
                  Next
                </button>
              </>
            ) : (
              <div className={styles.form__info}>
                {formatContactsInfo(initialValues) && (
                  <LineValue text={formatContactsInfo(initialValues)} />
                )}
              </div>
            )}
          </div>
        </Form>
      </Formik>
    </div>
  );
};
