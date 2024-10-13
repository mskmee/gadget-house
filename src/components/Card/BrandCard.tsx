import { FC } from 'react';
import styles from './card.module.scss';
import { IBrandCard } from '@/interfaces/interfaces';

interface IBrandCardProps {
  product: IBrandCard;
}

export const BrandCard: FC<IBrandCardProps> = ({ product }) => {
  return (
    <div className={styles.cardBrandConatiner} key={product.id}>
      <img src={product.img} className={styles.brandImg} alt="brand-images" />
    </div>
  );
};
