import React from 'react';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import AuthRequiredModal from './AuthRequiredModal';
import AuthModal from '../AuthModal';
import {
  closeAuthRequired,
  closeAuthModal,
  openAuthModal,
} from '@/store/auth/authPortalsSlice';
import { useMediaQuery } from 'react-responsive';
import { AppRoute } from '@/enums/enums';
import { useNavigate } from 'react-router-dom';
import { FormEnum } from '../libs/enums/form.enum';

const AuthPortals: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  const { isAuthRequiredModalOpen, isAuthModalOpen, authRequiredType } =
    useTypedSelector((state) => state.authPortals);

  const [modalForm, setModalForm] = React.useState<FormEnum>(FormEnum.LOGIN);
  const redirect = window.location.pathname;

  const handleLoginClick = () => {
    if (isMobile) {
      dispatch(closeAuthRequired());
      navigate(AppRoute.SIGN_IN, { state: { from: redirect } });
      return;
    }
    setModalForm(FormEnum.LOGIN);
    dispatch(closeAuthRequired());
    dispatch(openAuthModal());
  };

  const handleRegisterClick = () => {
    if (isMobile) {
      dispatch(closeAuthRequired());
      navigate(AppRoute.SIGN_UP, { state: { from: redirect } });
      return;
    }
    setModalForm(FormEnum.REGISTER);
    dispatch(closeAuthRequired());
    dispatch(openAuthModal());
  };

  return (
    <>
      {isAuthRequiredModalOpen && (
        <AuthRequiredModal
          isOpen={isAuthRequiredModalOpen}
          onClose={() => dispatch(closeAuthRequired())}
          onLoginClick={handleLoginClick}
          onRegisterClick={handleRegisterClick}
          type={authRequiredType}
        />
      )}
      {isAuthModalOpen && (
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => dispatch(closeAuthModal())}
          initialForm={modalForm}
        />
      )}
    </>
  );
};

export default AuthPortals;
