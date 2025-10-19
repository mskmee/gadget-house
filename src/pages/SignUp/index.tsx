import MobileAuthLayout from '@/components/MobileAuthLayout/MobileAuthLayout';
import RegisterForm from '../Auth/libs/components/RegisterForm';
import { FormEnum } from '../Auth/libs/enums/form.enum';
import { useAuth } from '../Auth/libs/hooks/use-auth';
import { RegisterFormDto } from '../Auth/libs/types/form-dto';
import { useLocation, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { registerFormValue, onRegisterFormSubmit, isLoading, switchAuthForm } =
    useAuth();
  const redirectPath = (location.state as any)?.from || '/';

  const handleRegister = async (values: RegisterFormDto) => {
    await onRegisterFormSubmit(values);
    navigate(redirectPath);
  };
  return (
    <MobileAuthLayout>
      <RegisterForm
        initialValues={registerFormValue}
        onRegister={handleRegister}
        onSwitch={() => switchAuthForm(FormEnum.LOGIN)}
        isLoading={isLoading}
        showLabels={true}
        onClose={() => {}}
      />
    </MobileAuthLayout>
  );
};

export default SignUp;
