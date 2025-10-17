import { FC } from 'react';
import { Formik, Form } from 'formik';
import cn from 'classnames';

import { LoginPermissionFormDto } from '../types/form-dto';
import { loginPermissionFormValidationSchema } from '../validation-schemas/validation-schemas';
import { FormInput } from '@/components/components';
import LoadingSpinner from '@/components/LoadingSpinner';
import styles from './form.module.scss';

interface ILoginFormProps {
  initialValues: LoginPermissionFormDto;
  // eslint-disable-next-line no-unused-vars
  onLogin: (dto: LoginPermissionFormDto) => void;
  isLoading?: boolean;
  error?: string | null | undefined;
}

const LoginPermissionForm: FC<ILoginFormProps> = ({
  initialValues,
  onLogin,
  isLoading = false,
  error,
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
          if (!error) {
            resetForm();
          }
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
                disabled={isLoading}
              />

              <FormInput<LoginPermissionFormDto>
                name="email"
                type="text"
                label="E-mail*"
                placeholder="E-mail*"
                disabled={isLoading}
              />

              <FormInput<LoginPermissionFormDto>
                name="password"
                type="password"
                label="Password*"
                placeholder="Password*"
                disabled={isLoading}
              />
            </div>

            <div className={cn(styles.form__buttons, styles.form__btnActivate)}>
              <button
                className={cn('button', 'button-secondary')}
                type="submit"
                disabled={!isValid || isLoading}
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner style={{ height: '15px' }} />
                  </>
                ) : (
                  'Activate Account'
                )}
              </button>

              {error && <div className={styles.form__error}>{error}</div>}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPermissionForm;
