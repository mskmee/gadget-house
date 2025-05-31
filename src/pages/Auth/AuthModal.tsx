import { FC, useEffect } from 'react';

import { PopUp } from '@/components/components';
import LoginForm from './libs/components/LoginForm';
import RegisterForm from './libs/components/RegisterForm';
import ForgotPasswordForm from './libs/components/ForgotPasswordForm';
import { useAuth } from './libs/hooks/use-auth';
import { FormEnum } from './libs/enums/form.enum';
import SuccessPopup from './libs/components/SuccessPopup';

interface IAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: FC<IAuthModalProps> = ({ isOpen, onClose }) => {
  const {
    currentForm,
    setCurrentForm,
    loginFormValue,
    registerFormValue,
    forgotFormValue,
    onLoginFormSubmit,
    onForgotFormSubmit,
    onRegisterFormSubmit,
    successType,
    setSuccessType,
    isLoading,
  } = useAuth();

  const handleClose = () => {
    setSuccessType(null);
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      setCurrentForm(FormEnum.LOGIN);
      setSuccessType(null);
    }
  }, [isOpen]);

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
            />
          )}
          {currentForm === FormEnum.REGISTER && (
            <RegisterForm
              initialValues={registerFormValue}
              onRegister={onRegisterFormSubmit}
              onSwitch={() => setCurrentForm(FormEnum.LOGIN)}
              isLoading={isLoading}
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
        </>
      )}
    </PopUp>
  );
};

export default AuthModal;
