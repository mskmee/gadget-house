import { FC } from 'react';
import cn from 'classnames';
import { PopUp } from '@/components/components';
import styles from '@/pages/Auth/libs/components/form.module.scss';

interface IAuthRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
  onRegisterClick: () => void;
  type: 'review' | 'favorite';
}
type ModalContent = {
  title: string;
  text?: string;
};
const modalContent: Record<'review' | 'favorite', ModalContent> = {
  review: { title: 'Only registered users can leave reviews' },
  favorite: {
    title: 'Save Your Favorites',
    text: 'To keep track of your favorite, please create an account or log in.',
  },
};

const AuthRequiredModal: FC<IAuthRequiredModalProps> = ({
  isOpen,
  onClose,
  onLoginClick,
  onRegisterClick,
  type,
}) => {
  const content = modalContent[type];

  return (
    <PopUp isOpened={isOpen} onClose={onClose} classname="authRequiredModal">
      <div className={styles.form}>
        <h3 className={styles.form__title2}>{content.title}</h3>
        {content.text && <p className={styles.form__text}>{content.text}</p>}
        <div className={styles.form__buttons}>
          <button
            className={cn('button', 'button-secondary', styles.form__btn)}
            type="button"
            onClick={onLoginClick}
          >
            Log In
          </button>
          <button
            className={cn('button', 'button-primary', styles.form__btn)}
            type="button"
            onClick={onRegisterClick}
          >
            Create an Account
          </button>
        </div>
      </div>
    </PopUp>
  );
};

export default AuthRequiredModal;
