import { FC } from 'react';
import styles from './ProductItem.module.scss';
import { IShoppingCard } from '@/interfaces/interfaces';

interface IProductItemProps {
  product: IShoppingCard;
}

export const ProductItem: FC<IProductItemProps> = ({ product }) => {
  return (
    <div key={product.id} className={styles.card}>
      <div>
        <img src={product.img} alt={product.title} />
      </div>

      <div>
        <div className={styles.nameWrapper}>
          <span className={styles.name}>{product.title}</span>
          <span className={styles.details}>code:{product.code}</span>
        </div>
        <div className={styles.priceWrapper}>
          <span className={styles.details}>{product.quantity} piece</span>
          <span className={styles.price}>{product.price} ₴</span>
        </div>
      </div>
    </div>
  );
};
