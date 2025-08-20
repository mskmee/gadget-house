import MobileAuthLayout from '@/components/MobileAuthLayout/MobileAuthLayout';
import RegisterForm from '../Auth/libs/components/RegisterForm';
import { FormEnum } from '../Auth/libs/enums/form.enum';
import { useAuth } from '../Auth/libs/hooks/use-auth';

const SignUp = () => {
  const { registerFormValue, onRegisterFormSubmit, isLoading, switchAuthForm } =
    useAuth();

  return (
    <MobileAuthLayout>
      <RegisterForm
        initialValues={registerFormValue}
        onRegister={onRegisterFormSubmit}
        onSwitch={() => switchAuthForm(FormEnum.LOGIN)}
        isLoading={isLoading}
        onClose={() => {}}
      />
    </MobileAuthLayout>
  );
};

export default SignUp;
