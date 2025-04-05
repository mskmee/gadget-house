import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Flex } from 'antd';
import cn from 'classnames';

import { AppRoute, OrderStatus } from '@/enums/enums';
import { AppDispatch, RootState } from '@/store';
import { getOrderById } from '@/store/orders/order_slice';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import { LeftArrow } from '@/assets/constants';

import styles from './admin-invoice.module.scss';

const AdminInvoice = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { order } = useTypedSelector((state: RootState) => state.order);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getOrderById(orderId));
  }, [dispatch, orderId]);

  const handleStatusClick = (status: string) => {
    setSelectedStatus(status);

    sendStatusToBackend(status);
  };

  const sendStatusToBackend = async (status: string) => {
    try {
      const response = await fetch('/api/update-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        throw new Error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className={styles.adminInvoice}>
      <div className={cn('container', styles.adminInvoice__container)}>
        <header className={styles.adminInvoice__header}>
          <button
            type="button"
            onClick={() => {
              if (window.history.length > 1) {
                return navigate(-1);
              }

              navigate(AppRoute.ROOT);
            }}
          >
            <img src={LeftArrow} alt="Left Arrow Icon" />
          </button>
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
              Object.entries(order?.address).map(
                ([key, value]) =>
                  value && (
                    <label
                      key={key}
                      className={styles.adminInvoice__deliveryInput}
                    >
                      <span>
                        {key
                          .replace(/([A-Z])/g, ' $1')
                          .trim()
                          .toLowerCase()}
                      </span>
                      <input type="text" value={value} name={key} />
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
                  onClick={() => handleStatusClick(status)}
                >
                  {selectedStatus === status && <span>✓ </span>}
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
