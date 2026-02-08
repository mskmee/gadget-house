import { FC, useState } from 'react';

import { useCreateNewAdminMutation } from '@/store/auth/api';
import SuccessPopup from '@/pages/Auth/libs/components/SuccessPopup';
import LoginPermissionForm from '@/pages/Auth/libs/components/LoginPermissionForm';
import { PopUp } from '@/components/components';
import { LoginPermissionFormDto } from '@/pages/Auth/libs/types/form-dto';
import { LOGIN_PERMISSION_FORM_INITIAL_VALUE } from '@/pages/Auth/libs/constants/login-permission-form-initial-value';

interface IAddNewAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddNewAdminModal: FC<IAddNewAdminModalProps> = ({ isOpen, onClose }) => {
  const [createNewAdmin, { isLoading, error }] = useCreateNewAdminMutation();
  const [successType, setSuccessType] = useState<'loginAdmin' | null>(null);
  const [createdEmail, setCreatedEmail] = useState<string>('');

  const handleSubmit = async (values: LoginPermissionFormDto) => {
    const result = await createNewAdmin({
      fullName: values.fullName,
      email: values.email,
      phoneNumber: values.phoneNumber,
      password: values.password,
    }).unwrap();

    if (result) {
      setCreatedEmail(values.email);
      setSuccessType('loginAdmin');
    }
  };

  const handleClose = () => {
    setSuccessType(null);
    setCreatedEmail('');
    onClose();
  };

  return successType === 'loginAdmin' ? (
    <SuccessPopup
      type={successType}
      onClose={handleClose}
      emailValue={createdEmail}
    />
  ) : (
    <PopUp isOpened={isOpen} onClose={handleClose} classname="authModal">
      <LoginPermissionForm
        initialValues={LOGIN_PERMISSION_FORM_INITIAL_VALUE}
        onLogin={handleSubmit}
        isLoading={isLoading}
        error={
          typeof error === 'string'
            ? error
            : error && 'data' in error && typeof error.data === 'string'
              ? error.data
              : error && 'message' in error && typeof error.message === 'string'
                ? error.message
                : null
        }
      />
    </PopUp>
  );
};

export { AddNewAdminModal };
