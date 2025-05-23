import { Collapse } from '@/components/Collapse';
import styles from './UserOrders.module.scss';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { StatusIcon } from '@/components/StatusIcon';
import { convertPriceToReadable } from '@/utils/helpers/product';
import formatDeliveryInfo from '@/pages/OrderConfirmation/libs/utils/formatDeliveryInfo';
import { useActions } from '@/hooks/useActions';
import classNames from 'classnames';
import { IOrderItemProduct } from '@/utils/packages/orders/libs/types/order-item-response-dto';
import { Link } from 'react-router-dom';

export const UserOrders = () => {
  const orders = useTypedSelector((state) => state.order.orders);
  const { locale, currency } = useTypedSelector((state) => state.shopping_card);
  const { addToStore } = useActions();
  const handleOrderAgain = (orderProducts: IOrderItemProduct[]) => {
    orderProducts.forEach((product) => {
      addToStore({
        ...product,
        id: parseInt(product.id),
        images: product.images.map((image) => ({
          link: image,
          order: 0,
        })),
        rating: 0,
        price: product.totalPrice.toString(),
        anotherColors: [],
        isLiked: false,
        available: true,
      });
    });
  };

  return (
    <main className={styles.dashboardOrders}>
      <h2 className={styles.dashboardOrdersTitle}>My orders</h2>
      <div className='dashboardOrders__items'>
        {orders?.page?.map((order) => (
          <Collapse
            key={order.id}
            title={
              <div className={styles.orderTitle}>
                <StatusIcon status={order.status} />
                <div className={styles.orderInfoHeader}>
                  <div className={styles.orderNumber}>№{order.id}</div>
                  <p className={styles.productQuantity}>
                    {order.products.reduce(
                      (acc, product) => acc + product.quantity,
                      0,
                    )}{' '}
                    pieces
                  </p>
                  <div>
                    {convertPriceToReadable(order.totalPrice, currency, locale)}
                  </div>
                </div>
                <div className={styles.orderProductPreview}>
                  <img
                    src={order.products[0]?.images[0] || ''}
                    alt={order.products[0]?.name || 'Product'}
                    className={styles.productImage}
                  />
                </div>
              </div>
            }
          >
            <div className={styles.orderDetails}>
              <div className={styles.orderProducts}>
                {order.products.map((product, index) => (
                  <div key={index} className={styles.productItem}>
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className={styles.productImage}
                    />
                    <div className={styles.productDetails}>
                      <Link to="#" className={styles.productName}>{product.name}</Link>
                      <p className={styles.productQuantity}>
                        {product.quantity} pieces
                      </p>
                      <p className={styles.productPrice}>
                        {convertPriceToReadable(
                          product.totalPrice,
                          currency,
                          locale,
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.orderInfo}>
                <div className={styles.orderInfo__left}>
                  <label>Order delivery date and time</label>
                  <p>{order.date}</p>
                  <label>Delivery address</label>
                  <p>{formatDeliveryInfo(order.address)}</p>
                  <label>Payment method:</label>
                  <p>{order.paymentMethod}</p>
                </div>

                <button
                  className={classNames(
                    'button',
                    'button-secondary',
                    styles.orderAgainButton,
                  )}
                  onClick={() => handleOrderAgain(order.products)}
                >
                  Order Again
                </button>
              </div>
            </div>
          </Collapse>
        ))}
      </div>
    </main>
  );
};
