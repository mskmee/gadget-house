import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import { AppRoute } from '@/enums/Route';
import { RootState } from '@/store';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { SuccessType } from '../types/successType';
import { AuthForgotPasswordResponseDto } from '@/utils/packages/auth/libs/types/auth-forgotPassword-response-dto';
import { inBasket, searchInputClear } from '@/assets/constants';

import styles from './form.module.scss';

interface SuccessPopupProps {
  type: SuccessType;
  emailValue?: string;
  onClose: () => void;
}

const SuccessPopup: FC<SuccessPopupProps> = ({ type, onClose, emailValue }) => {
  const navigate = useNavigate();
  const { message } = useTypedSelector((state: RootState) => state.auth);
  let title = '';
  let notice: React.ReactNode = '';

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onClose();
      type === 'loginAdmin'
        ? navigate(AppRoute.ADMIN_PAGE)
        : navigate(AppRoute.ROOT);
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [navigate, onClose, type]);

  switch (type) {
    case 'login':
      title = 'Success log in!';
      notice = 'Log in was successful';
      break;
    case 'loginAdmin':
      title = 'Access Activated';
      notice = (
        <>
          You have successfully activated <span>{emailValue}</span> account.
        </>
      );
      break;
    case 'register':
      title = 'Register success!';
      notice = 'You have successfully registered';
      break;
    case 'forgot':
      title = 'Send instructions!';
      notice =
        typeof message === 'string'
          ? message
          : (message as AuthForgotPasswordResponseDto)?.message;
      break;
    case 'changePassword':
      title = 'Change password!';
      notice = 'Password has been changed successfully';
      break;
    default:
      break;
  }

  return type === 'loginAdmin' ? (
    <div className={styles.successNotice}>
      <img src={inBasket} alt="Success icon" />

      <div className={styles.successNotice__content}>
        <h3 className={styles.successNotice__contentTitle}>{title}</h3>
        <p className={styles.successNotice__contentNotice}>{notice}</p>
      </div>

      <button className={styles.successNotice__btn} onClick={onClose}>
        <img src={searchInputClear} alt="Close icon" />
      </button>
    </div>
  ) : (
    <div className={styles.success}>
      <h3 className={cn(styles.success__title, 'visually-hidden')}>{title}</h3>
      <div className={styles.success__icon}>
        <img src={inBasket} alt="Success icon" />
      </div>
      <p className={styles.success__text}>{notice}</p>
    </div>
  );
};

export default SuccessPopup;
