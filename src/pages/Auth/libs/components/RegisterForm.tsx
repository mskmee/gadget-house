import { FC } from 'react';
import { Formik, Form } from 'formik';
import cn from 'classnames';

import { RegisterFormDto } from '../types/form-dto';
import { FormInput } from '@/components/components';
import { registerFormValidationSchema } from '../validation-schemas/register-form-validation-schema';

import styles from './form.module.scss';

interface IRegisterFormProps {
  initialValues: RegisterFormDto;
  // eslint-disable-next-line no-unused-vars
  onRegister: (dto: RegisterFormDto) => void;
  onSwitch: () => void;
}

const RegisterForm: FC<IRegisterFormProps> = ({
  initialValues,
  onRegister,
  onSwitch,
}) => {
  return (
    <div className={styles.form}>
      <Formik<RegisterFormDto>
        initialValues={initialValues}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={registerFormValidationSchema}
        onSubmit={(values) => {
          onRegister(values);
        }}
      >
        <Form className={styles.form__form}>
          <h3 className={styles.form__title}>Sign up</h3>

          <div className={styles.form__inputs} style={{ marginBottom: '24px' }}>
            <div className={styles.form__inputsName}>
              <FormInput<RegisterFormDto>
                name="name"
                type="text"
                label="Name"
                placeholder="Name"
              />
              <FormInput<RegisterFormDto>
                name="surname"
                type="text"
                label="Surname"
                placeholder="Surname"
              />
            </div>

            <FormInput<RegisterFormDto>
              name="email"
              type="text"
              label="Email"
              placeholder="Email"
            />

            <FormInput<RegisterFormDto>
              name="phoneNumber"
              type="text"
              label="Phone number"
              placeholder="Phone number"
            />

            <FormInput<RegisterFormDto>
              name="password"
              type="password"
              label="Password"
              placeholder="Password"
            />

            <FormInput<RegisterFormDto>
              name="passwordRepeat"
              type="password"
              label="Password"
              placeholder="Password"
            />
          </div>

          <div className={styles.form__buttons}>
            <button
              className={cn('button', 'button-secondary', styles.form__btn)}
              type="submit"
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
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterForm;
