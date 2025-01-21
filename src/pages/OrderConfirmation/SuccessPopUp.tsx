import { FC } from 'react';
import { Link } from 'react-router-dom';

import { PopUp } from '@/components/components';
import { CheckMark } from '@/assets/constants';

import styles from './success-pop-up.module.scss';

interface ISuccessPopUpProps {
  isOpened: boolean;
  onClose: () => void;
  classname?: string;
}

const generateRandomNumber = (): number => Math.floor(Math.random() * 1000);

const SuccessPopUp: FC<ISuccessPopUpProps> = ({ isOpened, onClose }) => {
  return (
    <PopUp isOpened={isOpened} onClose={onClose}>
      <div className={styles.container}>
        <p className={styles.icon}>
          <img src={CheckMark} alt="CheckMark Icon" />
        </p>

        <h2 className={styles.title}>Thank you for your order</h2>

        <p className={styles.text}>
          Your order is #{generateRandomNumber()}. Delivery between 2 and 5
          working days. Our manager will contact you before dispatch.
        </p>

        <Link className={styles.link} to="/all-products">
          Back to Catalog
        </Link>
      </div>
    </PopUp>
  );
};

export { SuccessPopUp };
