import { Collapse } from '@/components/Collapse';
import styles from './UserOrders.module.scss';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { StatusIcon } from '@/components/StatusIcon';
import { convertPriceToReadable } from '@/utils/helpers/product';
import formatDeliveryInfo from '@/pages/OrderConfirmation/libs/utils/formatDeliveryInfo';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { formatOrderDate } from '@/utils/helpers/formatOrderDate';
import { generateProductUrl } from '@/utils/helpers/generateProductUrl';
import { useState } from 'react';

export const UserOrders = () => {
  const [openCollapses, setOpenCollapses] = useState<{
    [key: string | number]: boolean;
  }>({});

  const toggleCollapse = (orderId: string | number) => {
    setOpenCollapses((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const orders = useTypedSelector((state) => state?.auth?.user?.orders);
  const { locale, currency } = useTypedSelector((state) => state.shopping_card);

  return (
    <main className={styles.dashboardOrders}>
      <h2 className={styles.dashboardOrdersTitle}>My orders</h2>
      <div className="dashboardOrders__items">
        {orders?.map((order) => {
          const totalQuantity = order.orderItems.reduce(
            (acc, product) => acc + product.quantity,
            0,
          );

          const isOpen = openCollapses[order.id] || false;
          return (
            <Collapse
              isOpen={isOpen}
              onToggle={() => toggleCollapse(order.id)}
              key={order.id}
              title={
                <div className={styles.orderTitle}>
                  <StatusIcon status={isOpen} />
                  <div className={styles.orderInfoHeader}>
                    <div className={styles.orderNumber}>№{order.id}</div>
                    <p className={styles.productQuantity}>
                      {`${totalQuantity} ${totalQuantity > 1 ? 'pieces' : 'piece'}`}
                    </p>
                    <div className={styles.productPrice}>
                      {convertPriceToReadable(order.total, currency, locale)}
                    </div>
                  </div>
                  <div className={styles.orderProductPreview}>
                    <img
                      src={
                        order.orderItems[0]?.shortProductResponseDto.images[0]
                          .link || ''
                      }
                      className={styles.productImage}
                    />
                  </div>
                </div>
              }
            >
              <div className={styles.orderDetails}>
                <div className={styles.orderProducts}>
                  {order.orderItems.map((product, index) => (
                    <div key={index} className={styles.productItem}>
                      <img
                        src={product.shortProductResponseDto.images[0].link}
                        className={styles.productImage}
                      />
                      <div className={styles.productDetails}>
                        <Link
                          to={generateProductUrl(product)}
                          className={styles.productName}
                        >
                          {product.shortProductResponseDto.name}
                        </Link>
                        <p className={styles.productQuantity}>
                          {`${product.quantity} ${product.quantity > 1 ? 'pieces' : 'piece'}`}
                        </p>
                        <p className={styles.productPrice}>
                          {convertPriceToReadable(
                            product.shortProductResponseDto.price,
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
                    <p>{formatOrderDate(order.createdAt)}</p>
                    <label>Delivery address</label>
                    <p>{formatDeliveryInfo(order.address)}</p>
                    <label>Payment method</label>
                    <p>{order.deliveryMethod}</p>
                  </div>

                  <Link
                    className={classNames(
                      'button',
                      'button-secondary',
                      styles.orderAgainButton,
                    )}
                    to="/basket"
                  >
                    Order again
                  </Link>
                </div>
              </div>
            </Collapse>
          );
        })}
      </div>
    </main>
  );
};
