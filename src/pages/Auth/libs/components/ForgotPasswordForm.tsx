import { FC } from 'react';
import { Formik, Form } from 'formik';
import cn from 'classnames';

import { ForgotFormDto } from '../types/form-dto';
import { FormInput } from '@/components/components';
import { forgotFormValidationSchema } from '../validation-schemas/forgot-form-validation-schema';

import styles from './form.module.scss';

interface IForgotPasswordFormProps {
  initialValues: ForgotFormDto;
  // eslint-disable-next-line no-unused-vars
  onReset: (dto: ForgotFormDto) => void;
  onSwitch: () => void;
}

const ForgotPasswordForm: FC<IForgotPasswordFormProps> = ({
  initialValues,
  onReset,
  onSwitch,
}) => {
  return (
    <div className={styles.form}>
      <Formik<ForgotFormDto>
        initialValues={initialValues}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={forgotFormValidationSchema}
        onSubmit={(values, { resetForm }) => {
          onReset(values);
          resetForm();
        }}
      >
        <Form className={styles.form__form}>
          <h3 className={styles.form__title}>Forgot Password</h3>

          <div className={styles.form__inputs} style={{ marginBottom: '24px' }}>
            <FormInput<ForgotFormDto>
              name="email"
              type="email"
              label="E-mail"
              placeholder="E-mail"
            />
          </div>

          <div className={styles.form__buttons}>
            <button
              className={cn('button', 'button-secondary', styles.form__btn)}
              type="submit"
              onClick={onSwitch}
            >
              Reset Password
            </button>

            <button
              className={cn('button', 'button-primary', styles.form__btn)}
              type="button"
              onClick={onSwitch}
            >
              Log in
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default ForgotPasswordForm;
