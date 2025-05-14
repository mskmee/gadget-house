import { FC } from 'react';
import { Formik, Form } from 'formik';
import cn from 'classnames';

import { LoginPermissionFormDto } from '../types/form-dto';
import { loginPermissionFormValidationSchema } from '../validation-schemas/validation-schemas';
import { FormInput } from '@/components/components';

import styles from './form.module.scss';

interface ILoginFormProps {
  initialValues: LoginPermissionFormDto;
  // eslint-disable-next-line no-unused-vars
  onLogin: (dto: LoginPermissionFormDto) => void;
}

const LoginPermissionForm: FC<ILoginFormProps> = ({
  initialValues,
  onLogin,
}) => {
  return (
    <div className={styles.form}>
      <Formik<LoginPermissionFormDto>
        initialValues={initialValues}
        validateOnBlur={true}
        validateOnChange={true}
        validationSchema={loginPermissionFormValidationSchema}
        onSubmit={(values, { resetForm }) => {
          onLogin(values);
          resetForm();
        }}
      >
        {({ isValid }) => (
          <Form className={styles.form__form}>
            <h3 className={styles.form__title}>Login Permission</h3>

            <div className={styles.form__inputs}>
              <FormInput<LoginPermissionFormDto>
                name="fullName"
                type="text"
                label="Full name*"
                placeholder="Full name*"
              />

              <FormInput<LoginPermissionFormDto>
                name="email"
                type="text"
                label="E-mail*"
                placeholder="E-mail*"
              />

              <FormInput<LoginPermissionFormDto>
                name="password"
                type="password"
                label="Password*"
                placeholder="Password*"
              />
            </div>

            <div className={cn(styles.form__buttons, styles.form__btnActivate)}>
              <button
                className={cn('button', 'button-secondary')}
                type="submit"
                disabled={!isValid}
              >
                Activate Account
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPermissionForm;
