import { FC } from 'react';

import { inBasket } from '@/assets/constants';

import styles from './form.module.scss';
import cn from 'classnames';

interface SuccessPopupProps {
  type: 'login' | 'register' | 'forgot';
  onClose: () => void;
}

const SuccessPopup: FC<SuccessPopupProps> = ({ type, onClose }) => {
  let title = '';
  let message = '';

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
      message = 'Instructions have been sent to your email';
      break;
  }

  return (
    <div className={styles.success}>
      <h3 className={cn(styles.success__title, 'visually-hidden')}>{title}</h3>
      <div className={styles.success__icon}>
        <img src={inBasket} alt="Success icon" />
      </div>
      <p className={styles.success__text}>{message}</p>
      <button className={styles.success__button} onClick={onClose}>
        Ок
      </button>
    </div>
  );
};

export default SuccessPopup;
