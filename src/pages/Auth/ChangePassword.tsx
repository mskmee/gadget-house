import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Form, Formik } from 'formik';
import cn from 'classnames';

import { AppDispatch } from '@/store';
import { changePassword } from '@/store/auth/actions';
import { FormEnum } from './libs/enums/form.enum';
import { useAuth } from './libs/hooks/use-auth';
import { ChangePasswordFormDto } from './libs/types/form-dto';
import { changePasswordFormValidationSchema } from './libs/validation-schemas/validation-schemas';
import SuccessPopup from './libs/components/SuccessPopup';
import { FormInput, PopUp } from '@/components/components';

import styles from './change-password.module.scss';
import style from './libs/components/form.module.scss';
import { setTokens } from '@/store/auth/auth-slice';

const ChangePassword = () => {
  const { successType, setSuccessType } = useAuth();
  const [isOpen, setModalOpen] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const initialValues: ChangePasswordFormDto = {
    password: '',
    confirmPassword: '',
  };

  const handleClose = () => {
    setSuccessType(null);
    setModalOpen(false);
  };

  const onReset = async (values: ChangePasswordFormDto) => {
    const result = await dispatch(
      changePassword({
        token,
        password: values.password,
        confirmPassword: values.confirmPassword,
      }),
    ).unwrap();

    if (result) {
      handleSuccessfulPasswordChange(result);
    }
  };

  const handleSuccessfulPasswordChange = (result: {
    accessToken: string;
    refreshToken: string;
  }) => {
    setSuccessType(FormEnum.CHANGE_PASSWORD);
    setModalOpen(true);
    dispatch(setTokens(result));
  };

  return (
    <>
      {successType ? (
        <PopUp isOpened={isOpen} onClose={handleClose} classname="authModal">
          <SuccessPopup type={successType} onClose={handleClose} />
        </PopUp>
      ) : (
        <div className={styles.changePassword}>
          <div className="container">
            <div className={style.form}>
              <Formik<ChangePasswordFormDto>
                initialValues={initialValues}
                validateOnBlur={false}
                validateOnChange={true}
                validationSchema={changePasswordFormValidationSchema}
                onSubmit={(values, { resetForm }) => {
                  onReset(values);
                  resetForm();
                }}
              >
                {({ isValid }) => (
                  <Form className={style.form__form}>
                    <h3 className={style.form__title}>Change Password</h3>

                    <div
                      className={style.form__inputs}
                      style={{ marginBottom: '24px' }}
                    >
                      <FormInput<ChangePasswordFormDto>
                        name="password"
                        type="password"
                        label="Password"
                        placeholder="Password"
                      />

                      <FormInput<ChangePasswordFormDto>
                        name="confirmPassword"
                        type="password"
                        label="Confirm Password"
                        placeholder="Confirm Password"
                      />
                    </div>

                    <div className={style.form__buttons}>
                      <button
                        className={cn(
                          'button',
                          'button-secondary',
                          style.form__btn,
                        )}
                        type="submit"
                        disabled={!isValid}
                      >
                        Reset Password
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChangePassword;
