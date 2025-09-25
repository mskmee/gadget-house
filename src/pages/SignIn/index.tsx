import MobileAuthLayout from '@/components/MobileAuthLayout/MobileAuthLayout';
import LoginForm from '../Auth/libs/components/LoginForm';
import { useAuth } from '../Auth/libs/hooks/use-auth';
import { FormEnum } from '../Auth/libs/enums/form.enum';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoginFormDto } from '../Auth/libs/types/form-dto';

export const SignIn = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    loginFormValue,
    onLoginFormSubmit,
    isLoading,
    authError,
    switchAuthForm,
  } = useAuth();
  const redirectPath = (location.state as any)?.from || '/';

  const handleLogin = async (values: LoginFormDto) => {
    await onLoginFormSubmit(values);
    navigate(redirectPath);
  };
  return (
    <MobileAuthLayout>
      <LoginForm
        initialValues={loginFormValue}
        onLogin={handleLogin}
        onSwitch={() => switchAuthForm(FormEnum.REGISTER)}
        onForgot={() => switchAuthForm(FormEnum.FORGOT)}
        isLoading={isLoading}
        showLabels={true}
        serverError={authError}
      />
    </MobileAuthLayout>
  );
};
