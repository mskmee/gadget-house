import { useMemo } from 'react';
import styles from './CartTooltip.module.scss';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { ProductItem } from './ProductItem/ProductItem';

export const CardTooltip = () => {
  const cardItems = useTypedSelector((state) => state.shopping_card.products);

  const totalCardSum = useMemo(
    () =>
      cardItems.reduce(
        (acc, { price }) => acc + Number(price.replace(/\s/g, '')),
        0,
      ),
    [cardItems],
  );
  const formattedPrice = new Intl.NumberFormat('ru-RU').format(totalCardSum);

  return (
    <div className={styles.container}>
      <div className={styles.cards}>
        {cardItems.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
      <div className={styles.total}>
        <span className={styles.price}>{formattedPrice} ₴</span>
        <button>Go to basket</button>
      </div>
    </div>
  );
};
