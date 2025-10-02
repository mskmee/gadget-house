import { Form, Formik } from 'formik';
import cn from 'classnames';

import { ChangePasswordFormDto } from '../types/form-dto';
import { changePasswordFormValidationSchema } from '../validation-schemas/validation-schemas';
import { FormInput } from '@/components/components';

import style from './form.module.scss';

type ChangePasswordFormProps = {
  isLoading: boolean;
  showLabels?: boolean;
  initialValues: ChangePasswordFormDto;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (dto: ChangePasswordFormDto) => void;
  onSwitch?: () => void;
  serverError?: string | null;
};

const ChangePasswordForm = ({
  showLabels = false,
  initialValues,
  onSubmit,
  onSwitch,
  isLoading,
  serverError,
}: ChangePasswordFormProps) => {
  return (
    <div className={style.form}>
      <Formik<ChangePasswordFormDto>
        initialValues={initialValues}
        validateOnBlur={false}
        validateOnChange={true}
        validationSchema={changePasswordFormValidationSchema}
        onSubmit={(values, { resetForm }) => {
          onSubmit(values); // Скинь до початкових значень явно
          resetForm({ values: { password: '', confirmPassword: '' } });
        }}
      >
        {({ isValid }) => (
          <Form className={style.form__form}>
            <h3 className={style.form__title}>Change Password</h3>

            {serverError && (
              <div className={style.form__error}>{serverError}</div>
            )}

            <div
              className={style.form__inputs}
              style={{ marginBottom: '24px' }}
            >
              <div className={style.form__field}>
                {showLabels && (
                  <label className={style.form__label}>Password</label>
                )}
                <FormInput<ChangePasswordFormDto>
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="Password"
                />
              </div>
              <div className={style.form__field}>
                {showLabels && (
                  <label className={style.form__label}>Confirm Password</label>
                )}
                <FormInput<ChangePasswordFormDto>
                  name="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  placeholder="Confirm Password"
                />
              </div>
            </div>

            <div className={style.form__buttons}>
              <button
                className={cn('button', 'button-secondary', style.form__btn)}
                type="submit"
                disabled={!isValid || isLoading}
              >
                {isLoading ? 'Resetting...' : 'Reset Password'}
              </button>
              {onSwitch && (
                <button
                  className={cn('button', 'button-primary', style.form__btn)}
                  type="button"
                  onClick={onSwitch}
                >
                  Back to Login
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePasswordForm;
