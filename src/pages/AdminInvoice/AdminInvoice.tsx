import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Flex } from 'antd';
import cn from 'classnames';

import { OrderStatus } from '@/enums/enums';
import { AppDispatch, RootState } from '@/store';
import { getOrderById } from '@/store/orders/order_slice';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import { LeftArrow } from '@/assets/constants';

import styles from './admin-invoice.module.scss';

const AdminInvoice = () => {
  const { orderId } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { order } = useTypedSelector((state: RootState) => state.order);
  console.log('order: ', order?.address);

  useEffect(() => {
    dispatch(getOrderById(orderId));
  }, [dispatch, orderId]);

  return (
    <div className={styles.adminInvoice}>
      <div className={cn('container', styles.adminInvoice__container)}>
        <header className={styles.adminInvoice__header}>
          <img src={LeftArrow} alt="Left Arrow Icon" />
          <h2>Order {order?.id}</h2>
        </header>

        <div
          className={cn(
            styles.adminInvoice__orders,
            styles.adminInvoice__wrapper,
          )}
        >
          <div className={styles.adminInvoice__ordersTop}>
            <h3>Order list</h3>
            <div className={styles.adminInvoice__ordersSearch}>
              <input type="text" placeholder="Search" />
              <button className="button button-secondary">Add</button>
            </div>
          </div>

          <ul className={styles.adminInvoice__ordersList}>
            {order?.products.map((product) => (
              <li key={product.id} className={styles.adminInvoice__ordersItem}>
                <div className={styles.adminInvoice__ordersItemName}>
                  <span></span>
                  <span>№{product.id}</span>
                </div>

                <div className={styles.adminInvoice__ordersItemDetails}>
                  <span className={styles.adminInvoice__ordersItemDetailsCount}>
                    {product.quantity} piece
                  </span>

                  <span className={styles.adminInvoice__ordersItemDetailsPrice}>
                    {product.totalPrice} ₴
                  </span>

                  <img src={product.images[0]} alt={product.name} />

                  <button
                    onClick={() => {
                      console.log('delete');
                    }}
                  >
                    x
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className={styles.adminInvoice__ordersTotal}>
            <span className={styles.adminInvoice__ordersTotalText}>Sum</span>
            <span className={styles.adminInvoice__ordersTotalPrice}>
              {order?.totalPrice} ₴
            </span>
          </div>
        </div>

        <div
          className={cn(
            styles.adminInvoice__delivery,
            styles.adminInvoice__wrapper,
          )}
        >
          <h3>Delivery details</h3>

          <form action="">
            {order?.address &&
              Object.values(order?.address).map(
                (item) =>
                  item && (
                    <label key={item} className={styles.admin__filterRadio}>
                      <input
                        className={styles.admin__filterRadioInput}
                        type="text"
                        value={item}
                        name="status"
                      />
                    </label>
                  ),
              )}
          </form>
        </div>

        <div
          className={cn(
            styles.adminInvoice__wrapper,
            styles.adminInvoice__status,
          )}
        >
          <h3>Status</h3>

          <Flex gap={12} justify="space-between">
            <div className={styles.adminInvoice__statusButtons}>
              {Object.values(OrderStatus).map((status) => (
                <button
                  key={status}
                  type="button"
                  className={cn(
                    'button__status',
                    styles.admin__statusInput,
                    `button__status_${status.toLocaleLowerCase().replace(' ', '_')}`,
                  )}
                  onClick={() => {}}
                >
                  {status}
                </button>
              ))}
            </div>

            <div className={styles.adminInvoice__statusConfirm}>
              <button type="submit" className="button button-secondary">
                Confirm
              </button>
            </div>
          </Flex>
        </div>
      </div>
    </div>
  );
};

export default AdminInvoice;
