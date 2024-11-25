import { useEffect } from 'react';
import styles from './CartTooltip.module.scss';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { ProductItem } from './ProductItem/ProductItem';
import { useActions } from '@/hooks/useActions';
import { Link } from 'react-router-dom';

export const CardTooltip = () => {
  const cardItems = useTypedSelector((state) => state.shopping_card);
  const { getTotal } = useActions();

  useEffect(() => {
    getTotal();
  }, [cardItems.products]);

  const formattedPrice = new Intl.NumberFormat('ru-RU').format(
    cardItems.cardTotalAmount,
  );
  return (
    <div className={styles.container}>
      <div className={styles.cards}>
        {cardItems.products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
      <div className={styles.total}>
        <span className={styles.price}>{formattedPrice} ₴</span>
        <Link to="/basket">Go to basket</Link>
      </div>
    </div>
  );
};
