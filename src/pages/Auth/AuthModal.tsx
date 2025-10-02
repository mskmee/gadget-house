import { FC, useEffect } from 'react';

import { PopUp } from '@/components/components';
import LoginForm from './libs/components/LoginForm';
import RegisterForm from './libs/components/RegisterForm';
import ForgotPasswordForm from './libs/components/ForgotPasswordForm';
import { useAuth } from './libs/hooks/hooks';
import { FormEnum } from './libs/enums/form.enum';
import SuccessPopup from './libs/components/SuccessPopup';
import ChangePasswordForm from './libs/components/ChangePasswordForm';

interface IAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialForm?: FormEnum;
}

const AuthModal: FC<IAuthModalProps> = ({
  isOpen,
  onClose,
  initialForm = FormEnum.LOGIN,
}) => {
  const {
    currentForm,
    setCurrentForm,
    loginFormValue,
    registerFormValue,
    forgotFormValue,
    changePasswordFormValue,
    onLoginFormSubmit,
    onForgotFormSubmit,
    onChangePasswordFormSubmit,
    onRegisterFormSubmit,
    successType,
    setSuccessType,
    isLoading,
    authError,
  } = useAuth();

  const handleClose = () => {
    setSuccessType(null);
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      setCurrentForm(initialForm);
      setSuccessType(null);
    }
  }, [isOpen, setCurrentForm, setSuccessType, initialForm]);

  console.log('is Auth modal open', isOpen);
  console.log('current form:', currentForm);

  return (
    <PopUp isOpened={isOpen} onClose={handleClose} classname="authModal">
      {successType ? (
        <SuccessPopup type={successType} onClose={handleClose} />
      ) : (
        <>
          {currentForm === FormEnum.LOGIN && (
            <LoginForm
              initialValues={loginFormValue}
              onLogin={onLoginFormSubmit}
              onSwitch={() => setCurrentForm(FormEnum.REGISTER)}
              onForgot={() => setCurrentForm(FormEnum.FORGOT)}
              isLoading={isLoading}
              serverError={authError}
            />
          )}
          {currentForm === FormEnum.REGISTER && (
            <RegisterForm
              initialValues={registerFormValue}
              onRegister={onRegisterFormSubmit}
              onSwitch={() => setCurrentForm(FormEnum.LOGIN)}
              isLoading={isLoading}
              onClose={handleClose}
            />
          )}
          {currentForm === FormEnum.FORGOT && (
            <ForgotPasswordForm
              initialValues={forgotFormValue}
              onReset={onForgotFormSubmit}
              onSwitch={() => setCurrentForm(FormEnum.LOGIN)}
              isLoading={isLoading}
            />
          )}
          {currentForm === FormEnum.CHANGE_PASSWORD && (
            <ChangePasswordForm
              initialValues={changePasswordFormValue}
              onSubmit={onChangePasswordFormSubmit}
              isLoading={isLoading}
              serverError={authError}
            />
          )}
        </>
      )}
    </PopUp>
  );
};

export default AuthModal;
