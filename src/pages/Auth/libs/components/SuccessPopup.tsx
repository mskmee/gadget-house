import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import { AppRoute } from '@/enums/Route';
import { inBasket } from '@/assets/constants';

import styles from './form.module.scss';

interface SuccessPopupProps {
  type: 'login' | 'register' | 'forgot';
  onClose: () => void;
}

const SuccessPopup: FC<SuccessPopupProps> = ({ type, onClose }) => {
  const navigate = useNavigate();
  let title = '';
  let message = '';

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
      message = 'Log in was successful';
      break;
    case 'register':
      title = 'Register success!';
      message = 'You have been successfully logged in';
      break;
    case 'forgot':
      title = 'Send instructions!';
      message = 'Password have been sent to your email';
      break;
  }

  return (
    <div className={styles.success}>
      <h3 className={cn(styles.success__title, 'visually-hidden')}>{title}</h3>
      <div className={styles.success__icon}>
        <img src={inBasket} alt="Success icon" />
      </div>
      <p className={styles.success__text}>{message}</p>
    </div>
  );
};

export default SuccessPopup;
