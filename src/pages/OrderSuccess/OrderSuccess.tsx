import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { useOrderConfirmation } from '../OrderConfirmation/libs/hooks/use-order-confirmation';
import { CheckMark } from '@/assets/constants';

import styles from './order-success.module.scss';

const OrderSuccess: FC = () => {
  const { onSuccessClose, orderId, onCompleteOrder } = useOrderConfirmation();
  console.log('orderId: ', orderId);

  useEffect(() => {
    if (!orderId) {
      onCompleteOrder();
    }
  }, [orderId, onCompleteOrder]);

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
              to="/all-products"
              onClick={onSuccessClose}
            >
              Back to Catalog
            </Link>
          </>
        ) : (
          <>
            <h2 className={styles.orderSuccess__title}>Invalid Order</h2>
            <Link
              className={cn('button button-primary', styles.orderSuccess__link)}
              to="/"
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
