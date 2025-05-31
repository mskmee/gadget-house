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
}

const RegisterForm: FC<IRegisterFormProps> = ({
  initialValues,
  onRegister,
  onSwitch,
  isLoading,
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
        validationSchema={registerFormValidationSchema}
        onSubmit={(values, { resetForm }) => {
          onRegister(values);
          resetForm();
        }}
      >
        {({ isValid }) => (
          <Form className={styles.form__form}>
            <h3 className={styles.form__title}>Sign up</h3>

            <div
              className={styles.form__inputs}
              style={{ marginBottom: '24px' }}
            >
              <div className={styles.form__inputsName}>
                <FormInput
                  name="fullName"
                  type="text"
                  label="Full name"
                  placeholder="Full name"
                />
              </div>

              <FormInput
                name="email"
                type="text"
                label="E-mail"
                placeholder="E-mail"
              />

              <FormInput
                name="phoneNumber"
                type="tel"
                label="Phone number"
                placeholder="Phone number"
              />

              <FormInput
                name="password"
                type="password"
                label="Password"
                placeholder="Password"
                isRegister={true}
              />

              <ul className={styles.form__passwordRules}>
                {passwordRules.map((rule) => (
                  <li key={rule}>{rule}</li>
                ))}
              </ul>

              <FormInput
                name="passwordRepeat"
                type="password"
                label="Password"
                placeholder="Password"
              />
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
