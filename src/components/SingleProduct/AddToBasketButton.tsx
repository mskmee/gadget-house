import { BasketIcon } from '@/assets/icons/BasketIcon';
import styles from './Product.module.scss';

export const AddToBasketButton = () => {
  return (
    <button className={styles.AddToBasketButton}>
      <div>
        <BasketIcon />
        <span>Add to basket</span>
      </div>
    </button>
  );
};
