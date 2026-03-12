import { FC, useEffect, useState } from 'react';
import { PopUp } from '@/components/components';
import LoginForm from './libs/components/LoginForm';
import RegisterForm from './libs/components/RegisterForm';
import ForgotPasswordForm from './libs/components/ForgotPasswordForm';
import ChangePasswordForm from './libs/components/ChangePasswordForm';
import { useAuth } from './libs/hooks/use-auth';
import SuccessPopup from './libs/components/SuccessPopup';
import { FormEnum } from './libs/enums/form.enum';

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
  const [modalKey, setModalKey] = useState(0);
  const handleClose = () => {
    setSuccessType(null);
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      setCurrentForm(initialForm);
      setSuccessType(null);

      if (initialForm) {
        setCurrentForm(initialForm);
      }
    }
  }, [isOpen, setCurrentForm, setSuccessType, initialForm]);

  useEffect(() => {
    if (isOpen) {
      setModalKey((prev) => prev + 1);
    }
  }, [isOpen]);

  return (
    <PopUp
      key={modalKey}
      isOpened={isOpen}
      onClose={handleClose}
      classname="authModal"
    >
      {successType ? (
        <SuccessPopup type={successType} onClose={handleClose} />
      ) : (
        <>
          {currentForm === 'login' && (
            <LoginForm
              initialValues={loginFormValue}
              onLogin={onLoginFormSubmit}
              onSwitch={() => setCurrentForm(FormEnum.REGISTER)}
              onForgot={() => setCurrentForm(FormEnum.FORGOT)}
              isLoading={isLoading}
              serverError={authError}
            />
          )}
          {currentForm === 'register' && (
            <RegisterForm
              initialValues={registerFormValue}
              onRegister={onRegisterFormSubmit}
              onSwitch={() => setCurrentForm(FormEnum.LOGIN)}
              isLoading={isLoading}
              onClose={handleClose}
            />
          )}
          {currentForm === 'forgot' && (
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
