import MobileAuthLayout from '@/components/MobileAuthLayout/MobileAuthLayout';
import { FormEnum } from '../Auth/libs/enums/form.enum';
import { useAuth } from '../Auth/libs/hooks/use-auth';
import ForgotPasswordForm from '../Auth/libs/components/ForgotPasswordForm';
import { PopUp } from '@/components/components';
import SuccessPopup from '../Auth/libs/components/SuccessPopup';

export const ForgotPassword = () => {
  const {
    forgotFormValue,
    isLoading,
    switchAuthForm,
    onForgotFormSubmit,
    successType,
    handleSuccessCloseMobile,
  } = useAuth();

  return (
    <MobileAuthLayout>
      {successType ? (
        <PopUp
          isOpened={true}
          onClose={handleSuccessCloseMobile}
          classname="authModal"
        >
          <SuccessPopup type={successType} onClose={handleSuccessCloseMobile} />
        </PopUp>
      ) : (
        <ForgotPasswordForm
          initialValues={forgotFormValue}
          onReset={onForgotFormSubmit}
          onSwitch={() => switchAuthForm(FormEnum.REGISTER)}
          showLabels={true}
          isLoading={isLoading}
        />
      )}
    </MobileAuthLayout>
  );
};
