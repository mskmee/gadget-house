import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Formik } from 'formik';
import cn from 'classnames';

import { AppDispatch } from '@/store';
import { getCredentials } from '@/store/auth/actions';
import { FormEnum } from './libs/enums/form.enum';
import { LoginFormDto } from './libs/types/form-dto';
import { useAuth } from './libs/hooks/use-auth';
import { loginFormValidationSchema } from './libs/validation-schemas/validation-schemas';
import SuccessPopup from './libs/components/SuccessPopup';
import { FormInput, PopUp } from '@/components/components';

import styles from './libs/components/change-password-form.module.scss';
import style from './libs/components/form.module.scss';

const LoginAdmin = () => {
  const { successType, setSuccessType } = useAuth();
  const [isOpen, setModalOpen] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const initialValues: LoginFormDto = {
    email: '',
    password: '',
  };

  const handleClose = () => {
    setSuccessType(null);
    setModalOpen(false);
  };

  const onLogin = async (values: LoginFormDto) => {
    const result = await dispatch(getCredentials(values)).unwrap();

    if (result) {
      setSuccessType(FormEnum.LOGIN);
      setModalOpen(true);
    }
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
              <Formik<LoginFormDto>
                initialValues={initialValues}
                validateOnBlur={false}
                validateOnChange={true}
                validationSchema={loginFormValidationSchema}
                onSubmit={(values, { resetForm }) => {
                  onLogin(values);
                  resetForm();
                }}
              >
                {({ isValid }) => (
                  <Form className={style.form__form}>
                    <h3 className={style.form__title}>Log in</h3>

                    <div
                      className={style.form__inputs}
                      style={{ marginBottom: '24px' }}
                    >
                      <FormInput<LoginFormDto>
                        name="email"
                        type="email"
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
                        Log in
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

export default LoginAdmin;
