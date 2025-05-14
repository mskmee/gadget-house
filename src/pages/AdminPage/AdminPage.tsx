import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Pagination, Checkbox, CheckboxProps, CheckboxChangeEvent } from 'antd';
import cn from 'classnames';

import { IProductCard } from '@/interfaces/interfaces';
import { AppDispatch, RootState } from '@/store';
import { setActiveOrder } from '@/store/orders/order_slice';
import { DEFAULT_SIZE } from '@/constants/pagination';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { AddNewUser } from '@/assets/constants';
import {
  Filters,
  AdminSearch,
  AddNewAdminModal,
  ChangeStatus,
} from './libs/components/components';

import styles from './admin-page.module.scss';

const AdminPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const orders = useTypedSelector(
    (state: RootState) => state.order.filteredOrders,
  );
  const { productsData } = useTypedSelector(
    (state: RootState) => state.products,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [, setFilteredProducts] = useState<IProductCard[]>([]);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  const onChecked = (id: string) => (e: CheckboxChangeEvent) => {
    setCheckedItems((prev) => {
      if (e.target.checked) {
        return [...prev, id];
      } else {
        return prev.filter((itemId) => itemId !== id);
      }
    });
  };

  const currentItems =
    orders?.slice(
      (currentPage - 1) * DEFAULT_SIZE,
      currentPage * DEFAULT_SIZE,
    ) || [];

  const isAllChecked =
    currentItems.length > 0 &&
    currentItems.every((item) => checkedItems.includes(item.id));

  const onCheckAll: CheckboxProps['onChange'] = (e) => {
    if (e.target.checked) {
      const allIds = currentItems.map((item) => item.id);
      setCheckedItems(allIds);
    } else {
      setCheckedItems([]);
    }
  };

  const handleSearch = useCallback(
    (query: string) => {
      const normalized = query.trim().toLowerCase();

      const filteredProducts = productsData?.page.filter(
        (product) =>
          product.name?.toLowerCase().includes(normalized) ||
          product.code?.toLowerCase().includes(normalized),
      );

      setFilteredProducts(filteredProducts || []);
    },
    [productsData],
  );

  return (
    <div className={styles.admin}>
      <div className={cn(styles.admin__container, 'container')}>
        <header className={styles.admin__header}>
          <h2 className={styles.admin__title}>Invoice</h2>

          <div className={styles.admin__search}>
            <AdminSearch placeholder="Searching..." onSearch={handleSearch} />
          </div>

          <div className={styles.admin__buttons}>
            <button
              className={styles.admin__buttonsAdd}
              onClick={() => setAuthModalOpen((prev) => !prev)}
            >
              <img src={AddNewUser} alt="Add user icon" />
            </button>

            <ChangeStatus checkedItems={checkedItems} />

            <Filters />
          </div>
        </header>

        <div className={styles.admin__table}>
          <table className={styles.admin__tableWrapper}>
            <thead>
              <tr>
                <th>
                  <Checkbox
                    className={styles.admin__tableWrapperCheckbox}
                    checked={isAllChecked}
                    indeterminate={checkedItems.length > 0 && !isAllChecked}
                    onChange={onCheckAll}
                  />{' '}
                  Invoice
                </th>
                <th>Customers</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {orders &&
                orders
                  .slice(
                    (currentPage - 1) * DEFAULT_SIZE,
                    currentPage * DEFAULT_SIZE,
                  )
                  .map((item) => (
                    <tr key={item.id}>
                      <td>
                        <Checkbox
                          onChange={onChecked(item.id)}
                          checked={checkedItems.includes(item.id)}
                        />
                        <Link
                          to={`/admin/${item.id}`}
                          onClick={() => dispatch(setActiveOrder(item))}
                        >
                          {item.id}
                        </Link>
                      </td>

                      <td>{item.phoneNumber}</td>

                      <td>
                        <button
                          className={`button__status button__status_${item.status.toLowerCase().replace(' ', '_')}`}
                        >
                          {item.status}
                        </button>
                      </td>

                      <td>{item.totalPrice} ₴</td>

                      <td>{item.date}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="container">
        <Pagination
          showSizeChanger={false}
          showTitle={false}
          current={currentPage}
          total={orders?.length}
          pageSize={DEFAULT_SIZE}
          onChange={(page) => setCurrentPage(page)}
          className={styles.admin__pagination}
        />
      </div>

      <AddNewAdminModal
        isOpen={isAuthModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </div>
  );
};

export default AdminPage;
