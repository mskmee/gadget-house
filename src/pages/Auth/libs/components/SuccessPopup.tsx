import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import { AppRoute } from '@/enums/Route';
import { RootState } from '@/store';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { AuthForgotPasswordResponseDto } from '@/utils/packages/auth/libs/types/auth-forgotPassword-response-dto';
import { inBasket } from '@/assets/constants';

import styles from './form.module.scss';

interface SuccessPopupProps {
  type: 'login' | 'register' | 'forgot' | 'changePassword' | 'loginAdmin';
  onClose: () => void;
}

const SuccessPopup: FC<SuccessPopupProps> = ({ type, onClose }) => {
  const navigate = useNavigate();
  const { message } = useTypedSelector((state: RootState) => state.auth);
  let title = '';
  let notice = '';

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onClose();
      navigate(AppRoute.ROOT);
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [navigate, onClose]);

  switch (type) {
    case 'login':
      title = 'Success log in!';
      notice = 'Log in was successful';
      break;
    case 'loginAdmin':
      title = 'Success log in!';
      notice = 'Log in was successful';
      break;
    case 'register':
      title = 'Register success!';
      notice = 'You have been successfully logged in';
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

  return (
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
