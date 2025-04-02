import { useLocation } from 'react-router-dom';
import { Flex } from 'antd';
import cn from 'classnames';

import { OrderStatus } from '@/enums/enums';

import styles from './admin-invoice.module.scss';

const AdminInvoice = () => {
  const { pathname } = useLocation();
  const orderId = pathname.split('/')[2];

  return (
    <div className={styles.adminInvoice}>
      <div className={cn('container', styles.adminInvoice__container)}>
        <header className={styles.adminInvoice__header}>
          <span></span>
          <h2>Order {orderId}</h2>
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
            <li className={styles.adminInvoice__ordersItem}>
              <div className={styles.adminInvoice__ordersItemName}>
                <span>Product</span>
                <span>№984583</span>
              </div>

              <div className={styles.adminInvoice__ordersItemDetails}>
                <span className={styles.adminInvoice__ordersItemDetailsCount}>
                  1 piece
                </span>
                <span className={styles.adminInvoice__ordersItemDetailsPrice}>
                  729 ₴
                </span>
                <img src="" alt="" />
                <button>x</button>
              </div>
            </li>
          </ul>

          <div className={styles.adminInvoice__ordersTotal}>
            <span className={styles.adminInvoice__ordersTotalText}>Sum</span>
            <span className={styles.adminInvoice__ordersTotalPrice}>
              6728 ₴
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

          <form action=""></form>
        </div>

        <div
          className={cn(
            styles.adminInvoice__wrapper,
            styles.adminInvoice__status,
          )}
        >
          <h3>Status</h3>

          <Flex gap={12} wrap>
            {Object.values(OrderStatus).map((status) => (
              <input
                key={status}
                type="checkbox"
                value={status}
                className={cn(
                  'button__status',
                  styles.admin__statusInput,
                  `button__status_${status.toLocaleLowerCase().replace(' ', '_')}`,
                )}
              />
            ))}

            <button
              type="submit"
              className={cn(
                'button button-secondary',
                styles.adminInvoice__statusConfirm,
              )}
            >
              Confirm
            </button>
          </Flex>
        </div>
      </div>
    </div>
  );
};

export default AdminInvoice;
