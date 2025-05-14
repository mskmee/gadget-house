import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Flex } from 'antd';
import cn from 'classnames';

import { AppRoute, OrderStatus } from '@/enums/enums';
import { IProductCard } from '@/interfaces/interfaces';
import { AppDispatch, RootState } from '@/store';
import { patchOrder } from '@/store/orders/actions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { AdminSearch } from '../AdminPage/libs/components/components';

import { LeftArrow } from '@/assets/constants';

import styles from './admin-invoice.module.scss';

const AdminInvoice = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { activeOrder } = useTypedSelector((state: RootState) => state.order);
  const { productsData } = useTypedSelector(
    (state: RootState) => state.products,
  );
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<IProductCard[]>([]);

  const handleProductSearch = useCallback(
    (query: string) => {
      const normalized = query.trim().toLowerCase();

      const filtered = productsData?.page.filter(
        (product) =>
          product.name?.toLowerCase().includes(normalized) ||
          product.code?.toLowerCase().includes(normalized),
      );

      setFilteredProducts(filtered || []);
    },
    [productsData],
  );

  const handleStatusClick = (status: string) => {
    setSelectedStatus(status);

    dispatch(patchOrder({ id: activeOrder?.id || '', status }));
  };

  const handleAddProduct = () => {
    if (filteredProducts.length === 0) {
      console.log('No products found');
      return;
    }

    const productToAdd = filteredProducts[0];

    console.log('Add product:', productToAdd);
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
          <h2>Order {activeOrder?.id}</h2>
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
              <AdminSearch
                placeholder="Add the product"
                onSearch={handleProductSearch}
              />

              <button
                className={cn(
                  styles.adminInvoice__ordersAdd,
                  'button button-secondary',
                )}
                onClick={handleAddProduct}
              >
                Add
              </button>
            </div>
          </div>

          <ul className={styles.adminInvoice__ordersList}>
            {activeOrder?.products.map((product) => (
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
              {activeOrder?.totalPrice} ₴
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
            <label className={styles.adminInvoice__deliveryInput}>
              <span>Full name</span>
              <input
                type="text"
                value={activeOrder?.fullName}
                name="fullName"
                onChange={() => {}}
              />
            </label>

            {activeOrder?.address &&
              Object.entries(activeOrder?.address).map(
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
                      <input
                        type="text"
                        value={value}
                        name={key}
                        onChange={() => {}}
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
