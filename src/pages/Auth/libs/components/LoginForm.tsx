import { FC } from 'react';
import { Formik, Form } from 'formik';
import cn from 'classnames';

import { LoginFormDto } from '../types/form-dto';
import { loginFormValidationSchema } from '../validation-schemas/login-form-validation-schema';
import { FormInput } from '@/components/components';
import { ErrorIcon } from '@/assets/constants';

import styles from './form.module.scss';
import { AuthLoader } from './AuthLoader/AuthLoader';

interface ILoginFormProps {
  initialValues: LoginFormDto;
  // eslint-disable-next-line no-unused-vars
  onLogin: (dto: LoginFormDto) => void;
  onSwitch: () => void;
  onForgot: () => void;
  isLoading: boolean;
  showLabels?: boolean;
  serverError: string | null;
}

const LoginForm: FC<ILoginFormProps> = ({
  initialValues,
  onLogin,
  onSwitch,
  onForgot,
  isLoading,
  showLabels = false,
  serverError,
}) => {
  return (
    <div className={styles.form}>
      <Formik<LoginFormDto>
        initialValues={initialValues}
        validateOnBlur={true}
        validateOnChange={true}
        validationSchema={loginFormValidationSchema}
        onSubmit={(values) => {
          onLogin(values);
        }}
      >
        {({ isValid, errors, touched }) => {
          const showGeneralError =
            (touched.email &&
              touched.password &&
              (errors.email || errors.password)) ||
            !!serverError;

          <div className={styles.form__inputs}>
            {showLabels && <label htmlFor="email">Email</label>}
            <FormInput<LoginFormDto>
              name="email"
              type="text"
              label="E-mail"
              placeholder="E-mail"
            />

            {showLabels && <label htmlFor="password">Password</label>}

            <FormInput<LoginFormDto>
              name="password"
              type="password"
              label="Password"
              placeholder="Password"
            />
          </div>;
          return (
            <Form className={styles.form__form}>
              <h3 className={styles.form__title}>Log in</h3>

              <div className={styles.form__inputs}>
                <FormInput<LoginFormDto>
                  name="email"
                  type="text"
                  label="E-mail"
                  placeholder="E-mail"
                  hideError={true}
                />

                <FormInput<LoginFormDto>
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="Password"
                  hideError={true}
                />

                {showGeneralError && (
                  <div className={styles.form__error}>
                    <img src={ErrorIcon} alt="Error icon" />
                    Incorrect e-mail or password
                  </div>
                )}
              </div>

              <button
                className={styles.form__buttonForgot}
                type="button"
                onClick={onForgot}
              >
                Forgot Password
              </button>
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
                      Log in
                    </button>

                    <button
                      className={cn(
                        'button',
                        'button-primary',
                        styles.form__btn,
                      )}
                      type="button"
                      onClick={onSwitch}
                    >
                      Sign up
                    </button>
                  </>
                )}
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default LoginForm;
