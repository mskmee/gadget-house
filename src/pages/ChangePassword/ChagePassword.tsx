import MobileAuthLayout from '@/components/MobileAuthLayout/MobileAuthLayout';
import ChangePasswordForm from '../Auth/libs/components/ChangePasswordForm';
import SuccessPopup from '../Auth/libs/components/SuccessPopup';
import { PopUp } from '@/components/components';
import { FormEnum } from '../Auth/libs/enums/form.enum';
import AuthModal from '../Auth/AuthModal';
import { useChangePasswordPage } from '../Auth/libs/hooks/hooks';

export const ChangePassword = () => {
  const {
    isModalOpen,
    onModalClose,
    isMobile,
    successType,
    handleSuccessCloseMobile,
    changePasswordFormValue,
    onChangePasswordFormSubmit,
    isLoading,
    authError,
  } = useChangePasswordPage();

  if (!isMobile)
    return (
      <AuthModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        initialForm={FormEnum.CHANGE_PASSWORD}
      />
    );

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
        <ChangePasswordForm
          showLabels={true}
          initialValues={changePasswordFormValue}
          onSubmit={onChangePasswordFormSubmit}
          isLoading={isLoading}
          serverError={authError}
        />
      )}
    </MobileAuthLayout>
  );
};
