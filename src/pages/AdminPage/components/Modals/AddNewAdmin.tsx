import { FC } from 'react';

import { useAuth } from '@/pages/Auth/libs/hooks/use-auth';
import SuccessPopup from '@/pages/Auth/libs/components/SuccessPopup';
import LoginPermissionForm from '@/pages/Auth/libs/components/LoginPermissionForm';
import { PopUp } from '@/components/components';

interface IAddNewAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddNewAdminModal: FC<IAddNewAdminModalProps> = ({ isOpen, onClose }) => {
  const {
    successType = 'loginAdmin',
    setSuccessType,
    loginPermissionFormValue,
    onLoginPermissionFormSubmit,
  } = useAuth();

  const handleClose = () => {
    setSuccessType(null);
    onClose();
  };

  return successType === 'loginAdmin' ? (
    <SuccessPopup
      type={successType}
      onClose={handleClose}
      emailValue={loginPermissionFormValue.email}
    />
  ) : (
    <PopUp isOpened={isOpen} onClose={handleClose} classname="authModal">
      <LoginPermissionForm
        initialValues={loginPermissionFormValue}
        onLogin={onLoginPermissionFormSubmit}
      />
    </PopUp>
  );
};

export { AddNewAdminModal };
