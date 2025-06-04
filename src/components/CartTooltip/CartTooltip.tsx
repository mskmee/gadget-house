import styles from './CartTooltip.module.scss';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { ProductItem } from './ProductItem/ProductItem';
import { Link } from 'react-router-dom';
import { convertPriceToReadable } from '@/utils/helpers/product';
import { AppRoute } from '@/enums/Route';

export const CardTooltip = () => {
  const {
    products: cardItems,
    cardTotalAmount,
    currency,
    locale,
  } = useTypedSelector((state) => state.shopping_card);

  return (
    <div className={styles.container}>
      <div className={styles.cards}>
        {cardItems.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
      <div className={styles.total}>
        <span className={styles.price}>
          {convertPriceToReadable(cardTotalAmount, currency, locale)}
        </span>
        <Link to={AppRoute.BASKET_PAGE}>Go to basket</Link>
      </div>
    </div>
  );
};
