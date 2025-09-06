import MobileAuthLayout from '@/components/MobileAuthLayout/MobileAuthLayout';
import LoginForm from '../Auth/libs/components/LoginForm';
import { useAuth } from '../Auth/libs/hooks/use-auth';
import { FormEnum } from '../Auth/libs/enums/form.enum';

export const SignIn = () => {
  const {
    loginFormValue,
    onLoginFormSubmit,
    isLoading,
    authError,
    switchAuthForm,
  } = useAuth();
  return (
    <MobileAuthLayout>
      <LoginForm
        initialValues={loginFormValue}
        onLogin={onLoginFormSubmit}
        onSwitch={() => switchAuthForm(FormEnum.REGISTER)}
        onForgot={() => switchAuthForm(FormEnum.FORGOT)}
        isLoading={isLoading}
        showLabels={true}
        serverError={authError}
      />
    </MobileAuthLayout>
  );
};
