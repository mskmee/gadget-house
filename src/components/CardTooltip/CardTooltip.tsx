import { useMemo } from 'react';
import { useAppSelector } from '@/hooks/reduxCustomHooks';
import ProductItem from './ProductItem/ProductItem';
import styles from './CardTooltip.module.scss';

export default function CardTooltip() {
  const products = useAppSelector((state) => state.cardReducer) ?? [];
  // TODO need to remove this code after connect to DB
  const totalCardSum = useMemo(
    () => products.reduce((acc, { price }) => acc + Number(price), 0),
    [products],
  );

  return (
    <div className={styles.container}>
      <div className={styles.cards}>
        {products?.map(({ code, ...props }) => (
          <ProductItem code={code} {...props} key={code} />
        ))}
      </div>
      <div className={styles.total}>
        <span className={styles.price}>{totalCardSum} ₴</span>
        <button>Go to basket</button>
      </div>
    </div>
  );
}
