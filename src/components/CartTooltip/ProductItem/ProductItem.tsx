import { FC } from 'react';
import styles from './ProductItem.module.scss';
import { IShoppingCard } from '@/interfaces/interfaces';
import {
  convertPriceToReadable,
  convertPriceToNumber,
} from '@/utils/helpers/helpers';
import { useTypedSelector } from '@/hooks/useTypedSelector';

interface IProductItemProps {
  product: IShoppingCard;
}

export const ProductItem: FC<IProductItemProps> = ({ product }) => {
  const { locale, currency } = useTypedSelector((state) => state.shopping_card);
  return (
    <div key={product.id} className={styles.card}>
      <div>
        <img src={product.img} alt={product.title} />
      </div>

      <div className={styles.cardDetails}>
        <div className={styles.nameWrapper}>
          <span className={styles.name}>{product.title}</span>
          <span className={styles.details}>code:{product.code}</span>
        </div>
        <div className={styles.priceWrapper}>
          <span className={styles.details}>{product.quantity} piece</span>
          <span className={styles.price}>
            {convertPriceToReadable(
              convertPriceToNumber(product.price) * product.quantity,
              currency,
              locale,
            )}
          </span>
        </div>
      </div>
    </div>
  );
};
