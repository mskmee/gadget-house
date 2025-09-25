import { FC, useEffect } from 'react';
import { PopUp } from '@/components/components';
import LoginForm from './libs/components/LoginForm';
import RegisterForm from './libs/components/RegisterForm';
import ForgotPasswordForm from './libs/components/ForgotPasswordForm';
import { useAuth } from './libs/hooks/use-auth';
import SuccessPopup from './libs/components/SuccessPopup';
import { FormEnum } from './libs/enums/form.enum';

interface IAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialForm?: FormEnum;
}

const AuthModal: FC<IAuthModalProps> = ({ isOpen, onClose, initialForm }) => {
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
    authError,
  } = useAuth();

  const handleClose = () => {
    setSuccessType(null);
    onClose();
  };

  useEffect(() => {
    if (initialForm) {
      setCurrentForm(initialForm);
    }
  }, [initialForm, setCurrentForm]);

  return (
    <PopUp isOpened={isOpen} onClose={handleClose} classname="authModal">
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
        </>
      )}
    </PopUp>
  );
};

export default AuthModal;
