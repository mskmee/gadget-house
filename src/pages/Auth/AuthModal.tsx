import { FC } from 'react';

import LoginForm from './libs/components/LoginForm';
import RegisterForm from './libs/components/RegisterForm';
import ForgotPasswordForm from './libs/components/ForgotPasswordForm';
import { useAuth } from './libs/hooks/use-auth';
import { FormEnum } from './libs/enums/form.enum';
import { PopUp } from '@/components/components';

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
  } = useAuth();

  return (
    <PopUp isOpened={isOpen} onClose={onClose} classname="authModal">
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
    </PopUp>
  );
};

export default AuthModal;
