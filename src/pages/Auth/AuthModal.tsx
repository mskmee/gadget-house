import { FC } from 'react';

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
  } = useAuth();

  const handleClose = () => {
    setSuccessType(null);
    onClose();
  };

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
            />
          )}
          {currentForm === FormEnum.REGISTER && (
            <RegisterForm
              initialValues={registerFormValue}
              onRegister={onRegisterFormSubmit}
              onSwitch={() => setCurrentForm(FormEnum.LOGIN)}
            />
          )}
          {currentForm === FormEnum.FORGOT && (
            <ForgotPasswordForm
              initialValues={forgotFormValue}
              onReset={onForgotFormSubmit}
              onSwitch={() => setCurrentForm(FormEnum.LOGIN)}
            />
          )}
        </>
      )}
    </PopUp>
  );
};

export default AuthModal;
