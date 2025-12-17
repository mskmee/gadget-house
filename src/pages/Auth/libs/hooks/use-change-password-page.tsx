import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './use-auth';
import { FormEnum } from '../enums/form.enum';

const useChangePasswordPage = () => {
  const isMobile = useMediaQuery({ query: '(max-width:767px)' });
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const {
    changePasswordFormValue,
    onChangePasswordFormSubmit,
    setCurrentForm,
    isLoading,
    authError,
    successType,
    setSuccessType,
    handleSuccessCloseMobile,
  } = useAuth();

  useEffect(() => {
    if (!isMobile) {
      setCurrentForm(FormEnum.CHANGE_PASSWORD);
      setModalOpen(true);
    }
  }, [isMobile, setCurrentForm]);

  const onModalClose = () => {
    setModalOpen(false);
    setSuccessType(null);
    navigate('/');
  };

  return {
    isModalOpen,
    onModalClose,
    isMobile,
    successType,
    handleSuccessCloseMobile,
    changePasswordFormValue,
    onChangePasswordFormSubmit,
    isLoading,
    authError,
  };
};

export { useChangePasswordPage };
