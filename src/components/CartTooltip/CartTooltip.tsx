import styles from './CartTooltip.module.scss';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { ProductItem } from './ProductItem/ProductItem';
import { convertPriceToReadable } from '@/utils/helpers/helpers';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '@/enums/Route';

export const CardTooltip = () => {
  const {
    products: cardItems,
    cardTotalAmount,
    currency,
    locale,
  } = useTypedSelector((state) => state.shopping_card);
  const navigate = useNavigate();

  const handleButtonClick = () => navigate(AppRoute.BASKET_PAGE);

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
        <button onClick={handleButtonClick}>Go to basket</button>
      </div>
    </div>
  );
};
