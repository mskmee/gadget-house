import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { CheckMark } from '@/assets/constants';

import styles from './order-success.module.scss';
import { AppRoute } from '@/enums/Route';

const OrderSuccess: FC = () => {
  const { clearCart } = useActions();
  const { orderId } = useTypedSelector((state) => state.shopping_card);

  useEffect(() => {
    if (orderId) {
      clearCart();
    }
  }, [orderId, clearCart]);

  return (
    <div className={styles.orderSuccess}>
      <div className={cn('container', styles.orderSuccess__container)}>
        {orderId ? (
          <>
            <p className={styles.orderSuccess__icon}>
              <img src={CheckMark} alt="CheckMark Icon" />
            </p>

            <h2 className={styles.orderSuccess__title}>
              Thank you for your order
            </h2>

            <p className={styles.orderSuccess__text}>
              Your order is #{orderId}. Delivery between 2 and 5 working days.
              Our manager will contact you before dispatch.
            </p>

            <Link
              className={cn('button button-primary', styles.orderSuccess__link)}
              to={AppRoute.ALL_PRODUCTS}
            >
              Back to Catalog
            </Link>
          </>
        ) : (
          <>
            <h2 className={styles.orderSuccess__title}>Invalid Order</h2>
            <Link
              className={cn('button button-primary', styles.orderSuccess__link)}
              to={AppRoute.ROOT}
            >
              Go to Homepage
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderSuccess;
