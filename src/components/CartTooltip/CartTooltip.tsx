import { useMemo } from 'react';
import { useAppSelector } from '@/hooks/hooks';
import ProductItem from './ProductItem/ProductItem';
import styles from './CartTooltip.module.scss';

export default function CardTooltip() {
  const cartItems = useAppSelector((state) => state.cardReducer.cartItems);
  const totalCardSum = useMemo(
    () => cartItems.reduce((acc, { price }) => acc + Number(price), 0),
    [cartItems],
  );

  return (
    <div className={styles.container}>
      <div className={styles.cards}>
        {cartItems.map(({ code, ...props }) => (
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
