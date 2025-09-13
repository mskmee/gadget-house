import MobileAuthLayout from '@/components/MobileAuthLayout/MobileAuthLayout';
import ChangePasswordForm from '../Auth/libs/components/ChangePasswordForm';

export const ChangePassword = () => {
  return (
    <MobileAuthLayout>
      <ChangePasswordForm showLabels={true} />
    </MobileAuthLayout>
  );
};
