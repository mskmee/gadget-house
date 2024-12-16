import { FC } from 'react';
import styles from './card.module.scss';
import { IBrandCard } from '@/interfaces/interfaces';

interface IBrandCardProps {
  product: IBrandCard;
  width: number;
}

export const BrandCard: FC<IBrandCardProps> = ({ product, width }) => {
  return (
    <div className={styles.cardBrandConatiner} key={product.id}>
      <img
        style={{ width: `${width}px` }}
        src={product.img}
        className={styles.brandImg}
        alt="brand-images"
      />
    </div>
  );
};
