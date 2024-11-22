import styles from './Basket.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { LeftArrow } from '@/assets/constants';
import BasketItem from '@/components/BasketItem/BasketItem.tsx';
import { useTypedSelector } from '@/hooks/useTypedSelector.ts';
import { CustomBreadcrumbs } from '@/components/SingleProduct/CustomBreadcrumbs.tsx';

export const BasketPage = () => {
  const navigate = useNavigate();
  const { products, cardTotalAmount } = useTypedSelector((state) => state.shopping_card);
  const location = useLocation();
  const paths = location.pathname.split('/').filter((path) => path);

  console.log(paths)

  return (
    <div className={styles.container}>
      <CustomBreadcrumbs />
      <button className={styles.buttonBack} onClick={() => navigate(-1)}>
        <img src={LeftArrow} alt="Right Arrow" />
        Back
      </button>

      {products.length === 0 ?
        <p>Your basket is empty</p>
        :
      <section className={styles.content}>
        <ul className={styles.productList}>
          {products.map((product) => (
            <BasketItem product={product} key={product.id} />
          ))}
        </ul>
        <div className={styles.info}>
          <p>Sum <span>{cardTotalAmount} ₴</span></p>
          <p>Discount <span></span></p>
          <h3>In total <span>{cardTotalAmount} ₴</span></h3>
          <button>Place the order</button>
        </div>
      </section>
      }

    </div>
  );
};
