import { FC } from 'react';
import styles from './basketpopup.module.scss';
import { closeBasketPopupIcon } from '@/assets/constants';
import { BasketEmptyIcon } from '@/assets/icons/BasketEmptyIcon';

interface IEmptyBasketPopupProps {
  closeEmptyBasketPopup: () => void;
}

export const EmptyBasketPopup: FC<IEmptyBasketPopupProps> = ({
  closeEmptyBasketPopup,
}) => {
  return (
    <div className={styles.emptybasketPopup}>
      <button
        className={styles.emptybasketPopupClose}
        onClick={closeEmptyBasketPopup}
      >
        <img src={closeBasketPopupIcon} alt="close" />
      </button>
      <h2 className={styles.emptybasketPopupTitle}>Your basket is empty</h2>
      <h3 className={styles.emptybasketPopupSubtitle}>
        Add the items you want to buy to your basket
      </h3>

      <div className={styles.emptybasketPopupImage}>
        <BasketEmptyIcon />
      </div>
    </div>
  );
};
