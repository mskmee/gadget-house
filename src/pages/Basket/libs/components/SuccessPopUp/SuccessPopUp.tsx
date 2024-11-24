import { FC } from 'react';
import styles from './SuccessPopUp.module.scss';
import { PopUp } from '@/components/components';

type SuccessPopUpProperties = {
  isOpened: boolean;
  onClose: () => void;
};

const generateRandomNumber = (): number => Math.floor(Math.random() * 1000);

const SuccessPopUp: FC<SuccessPopUpProperties> = ({ isOpened, onClose }) => {
  return (
    <PopUp isOpened={isOpened} onClose={onClose}>
      <div className={styles.container}>
        <h3 className={styles.title}>
          Your order #{generateRandomNumber()} is confirmed.
        </h3>
        <div className={styles.text}>
          Thanks for choosing us. We will contact you soon.
        </div>
      </div>
    </PopUp>
  );
};

export { SuccessPopUp };
