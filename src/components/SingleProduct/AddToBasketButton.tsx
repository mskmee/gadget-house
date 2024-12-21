import { BasketIcon } from '@/assets/icons/BasketIcon';
import styles from './Product.module.scss';

export const AddToBasketButton = () => {
  return (
    <button className={styles.AddToBasketButton}>
      <BasketIcon />
      <span>Add to basket</span>
    </button>
  );
};
