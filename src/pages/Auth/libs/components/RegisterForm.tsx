import { FC } from 'react';
import { Formik, Form } from 'formik';
import cn from 'classnames';

import { RegisterFormDto } from '../types/form-dto';
import { FormInput } from '@/components/components';
import { registerFormValidationSchema } from '../validation-schemas/register-form-validation-schema';

import styles from './form.module.scss';
import { AuthLoader } from './AuthLoader/AuthLoader';

interface IRegisterFormProps {
  initialValues: RegisterFormDto;
  // eslint-disable-next-line no-unused-vars
  onRegister: (dto: RegisterFormDto) => void;
  onSwitch: () => void;
  isLoading: boolean;
  showLabels?: boolean;
  onClose: () => void;
}

const RegisterForm: FC<IRegisterFormProps> = ({
  initialValues,
  onRegister,
  onSwitch,
  isLoading,
  showLabels = false,
  onClose,
}) => {
  const passwordRules = [
    'Password length must be between 8 and 24 characters',
    'Password must contain at least one digit',
    'One lowercase and uppercase Latin character ',
    'One special character',
  ];

  return (
    <div className={styles.form}>
      <Formik<RegisterFormDto>
        initialValues={initialValues}
        validateOnBlur={true}
        validateOnMount={true}
        validationSchema={registerFormValidationSchema}
        onSubmit={(values, { resetForm }) => {
          onRegister(values);
          resetForm();
          onClose();
        }}
      >
        {({ isValid }) => (
          <Form className={styles.form__form}>
            <h3 className={styles.form__title}>Sign up</h3>

            <div
              className={styles.form__inputs}
              style={{ marginBottom: '24px' }}
            >
              <div className={styles.form__field}>
                {showLabels && (
                  <label className={styles.form__label}>Full name</label>
                )}
                <FormInput
                  name="fullName"
                  type="text"
                  label="Full name"
                  placeholder="Full name"
                />
              </div>

              <div className={styles.form__field}>
                {' '}
                {showLabels && (
                  <label className={styles.form__label}>E-mail</label>
                )}
                <FormInput
                  name="email"
                  type="text"
                  label="E-mail"
                  placeholder="E-mail"
                />
              </div>
              <div className={styles.form__field}>
                {' '}
                {showLabels && (
                  <label className={styles.form__label}>Phone number</label>
                )}
                <FormInput
                  name="phoneNumber"
                  type="tel"
                  label="Phone number"
                  placeholder="Phone number"
                />
              </div>

              <div className={styles.form__field}>
                {' '}
                {showLabels && (
                  <label className={styles.form__label}>Password</label>
                )}
                <FormInput
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="Password"
                  isRegister={true}
                />
              </div>

              <ul className={styles.form__passwordRules}>
                {passwordRules.map((rule) => (
                  <li key={rule}>{rule}</li>
                ))}
              </ul>

              <div className={styles.form__field}>
                {' '}
                {showLabels && (
                  <label className={styles.form__label}>Password</label>
                )}
                <FormInput
                  name="passwordRepeat"
                  type="password"
                  label="Password"
                  placeholder="Password"
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
                    Sign up
                  </button>

                  <button
                    className={cn('button', 'button-primary', styles.form__btn)}
                    type="button"
                    onClick={onSwitch}
                  >
                    Log in
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

export default RegisterForm;
