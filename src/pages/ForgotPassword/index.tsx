import MobileAuthLayout from '@/components/MobileAuthLayout/MobileAuthLayout';
import { FormEnum } from '../Auth/libs/enums/form.enum';
import { useAuth } from '../Auth/libs/hooks/use-auth';
import ForgotPasswordForm from '../Auth/libs/components/ForgotPasswordForm';

export const ForgotPassword = () => {
  const { forgotFormValue, isLoading, switchAuthForm } = useAuth();

  return (
    <MobileAuthLayout>
      <ForgotPasswordForm
        initialValues={forgotFormValue}
        onReset={() => switchAuthForm(FormEnum.CHANGE_PASSWORD)}
        onSwitch={() => switchAuthForm(FormEnum.REGISTER)}
        showLabels={true}
        isLoading={isLoading}
      />
    </MobileAuthLayout>
  );
};
