import type { CardItem } from '@/types/slices.types';
import styles from './ProductItem.module.scss';

export default function ProductItem({
  code,
  href,
  name,
  price,
  quantity,
}: CardItem) {
  return (
    <div key={code} className={styles.card}>
      <img src={href} alt={name} width="100" height="112" />
      <div>
        <div className={styles.nameWrapper}>
          <span className={styles.name}>{name}</span>
          <span className={styles.details}>code:{code}</span>
        </div>
        <div className={styles.priceWrapper}>
          <span className={styles.details}>{quantity} piece</span>
          <span className={styles.price}>{price} ₴</span>
        </div>
      </div>
    </div>
  );
}
