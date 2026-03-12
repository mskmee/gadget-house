import { FC } from 'react';
import { Formik, Form } from 'formik';
import cn from 'classnames';

import { ForgotFormDto } from '../types/form-dto';
import { FormInput } from '@/components/components';
import { forgotFormValidationSchema } from '../validation-schemas/forgot-form-validation-schema';

import styles from './form.module.scss';
import { AuthLoader } from './AuthLoader/AuthLoader';

interface IForgotPasswordFormProps {
  initialValues: ForgotFormDto;
  // eslint-disable-next-line no-unused-vars
  onReset: (dto: ForgotFormDto) => void;
  onSwitch: () => void;
  showLabels?: boolean;
  isLoading: boolean;
}

const ForgotPasswordForm: FC<IForgotPasswordFormProps> = ({
  initialValues,
  onReset,
  onSwitch,
  showLabels = false,
  isLoading,
}) => {
  return (
    <div className={styles.form}>
      <Formik<ForgotFormDto>
        initialValues={initialValues}
        validateOnBlur={true}
        validateOnChange={true}
        validationSchema={forgotFormValidationSchema}
        onSubmit={(values, { resetForm }) => {
          onReset(values);
          resetForm();
        }}
      >
        {({ isValid }) => (
          <Form className={styles.form__form}>
            <h3 className={styles.form__title}>Forgot Password</h3>

            <div
              className={styles.form__inputs}
              style={{ marginBottom: '24px' }}
            >
              <div className={styles.form__field}>
                {showLabels && (
                  <label className={styles.form__label}>E-mail</label>
                )}
                <FormInput<ForgotFormDto>
                  name="email"
                  type="email"
                  label="E-mail"
                  placeholder="E-mail"
                />
              </div>
            </div>

            <div className={styles.form__buttons}>
              {isLoading ? (
                <AuthLoader />
              ) : (
                <>
                  <button
                    className={cn(
                      'button',
                      'button-secondary',
                      styles.form__btn,
                    )}
                    type="submit"
                    disabled={!isValid}
                  >
                    Submit
                  </button>

                  <button
                    className={cn('button', 'button-primary', styles.form__btn)}
                    type="button"
                    onClick={onSwitch}
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForgotPasswordForm;
