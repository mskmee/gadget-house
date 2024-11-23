import styles from './Basket.module.scss';
import { useNavigate } from 'react-router-dom';
import { LeftArrow } from '@/assets/constants';
import BasketItem from '@/components/BasketItem/BasketItem.tsx';
import { useTypedSelector } from '@/hooks/useTypedSelector.ts';
import { CustomBreadcrumbs } from '@/components/SingleProduct/CustomBreadcrumbs.tsx';
import { convertPriceToReadable } from '@/utils/helpers/product';

export const BasketPage = () => {
  const navigate = useNavigate();
  const { products, cardTotalAmount, currency, locale } = useTypedSelector(
    (state) => state.shopping_card,
  );

  return (
    <div className={styles.container}>
      <CustomBreadcrumbs />
      <button className={styles.buttonBack} onClick={() => navigate(-1)}>
        <img src={LeftArrow} alt="Right Arrow" />
        Back
      </button>

      {products.length === 0 ? (
        <p>Your basket is empty</p>
      ) : (
        <section className={styles.content}>
          <ul className={styles.productList}>
            {products.map((product) => (
              <BasketItem product={product} key={product.id} />
            ))}
          </ul>
          <div className={styles.info}>
            <p>
              Sum{' '}
              <span>
                {convertPriceToReadable(cardTotalAmount, currency, locale)}
              </span>
            </p>
            <p>
              Discount <span></span>
            </p>
            <h3>
              In total{' '}
              <span>
                {convertPriceToReadable(cardTotalAmount, currency, locale)}
              </span>
            </h3>
            <button>Place the order</button>
          </div>
        </section>
      )}
    </div>
  );
};
