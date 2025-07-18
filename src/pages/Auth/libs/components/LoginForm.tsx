import { FC } from 'react';
import { Formik, Form } from 'formik';
import cn from 'classnames';

import { LoginFormDto } from '../types/form-dto';
import { loginFormValidationSchema } from '../validation-schemas/login-form-validation-schema';
import { FormInput } from '@/components/components';

import styles from './form.module.scss';
import { AuthLoader } from './AuthLoader/AuthLoader';

interface ILoginFormProps {
  initialValues: LoginFormDto;
  // eslint-disable-next-line no-unused-vars
  onLogin: (dto: LoginFormDto) => void;
  onSwitch: () => void;
  onForgot: () => void;
  isLoading: boolean;
}

const LoginForm: FC<ILoginFormProps> = ({
  initialValues,
  onLogin,
  onSwitch,
  onForgot,
  isLoading,
}) => {
  return (
    <div className={styles.form}>
      <Formik<LoginFormDto>
        initialValues={initialValues}
        validateOnBlur={true}
        validateOnChange={true}
        validationSchema={loginFormValidationSchema}
        onSubmit={(values, { resetForm }) => {
          onLogin(values);
          resetForm();
        }}
      >
        {({ isValid }) => (
          <Form className={styles.form__form}>
            <h3 className={styles.form__title}>Log in</h3>

            <div className={styles.form__inputs}>
              <FormInput<LoginFormDto>
                name="email"
                type="text"
                label="E-mail"
                placeholder="E-mail"
              />

              <FormInput<LoginFormDto>
                name="password"
                type="password"
                label="Password"
                placeholder="Password"
              />
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
                    className={cn('button', 'button-primary', styles.form__btn)}
                    type="button"
                    onClick={onSwitch}
                  >
                    Sign up
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

export default LoginForm;
