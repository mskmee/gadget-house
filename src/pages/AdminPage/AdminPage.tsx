import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Pagination, InputRef, Checkbox, CheckboxProps } from 'antd';
import cn from 'classnames';

import { AppDispatch, RootState } from '@/store';
import { setOrder } from '@/store/orders/order_slice';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { Filters } from './libs/components/Filters';
import { Search } from '@/components/Header/Search/Search';

import styles from './admin-page.module.scss';
import { orderList } from '@/mock/order-list';

const list = orderList(18);

const AdminPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { orders } = useTypedSelector((state: RootState) => state.order);
  const [currentPage, setCurrentPage] = useState(1);
  const searchFieldRef = useRef<InputRef>(null);
  const [isOverlayActive, setIsOverlayActive] = useState(false);
  const [, setSelectedFilters] = useState({});

  const handleFilterChange = (key: string, values: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [key]: values.length ? values : [],
    }));
  };

  useEffect(() => {
    dispatch(setOrder(list));
    dispatch;
  }, [dispatch]);

  const onChecked: CheckboxProps['onChange'] = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <div className={styles.admin}>
      <div className={cn(styles.admin__container, 'container')}>
        <header className={styles.admin__header}>
          <h2 className={styles.admin__title}>Invoice</h2>

          <div className={styles.admin__search}>
            <Search
              searchFieldRef={searchFieldRef}
              isOverlayActive={isOverlayActive}
              setIsOverlayActive={setIsOverlayActive}
            />
          </div>

          <Filters onSelectedFilters={handleFilterChange} />
        </header>

        <div className={styles.admin__table}>
          <table className={styles.admin__tableWrapper}>
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Customers</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((item) => (
                <tr key={item.id}>
                  <td>
                    <Checkbox onChange={onChecked}></Checkbox>
                    <Link to={`/admin/${item.id}`}>{item.id}</Link>
                  </td>
                  <td>{item.contact}</td>
                  <td>
                    <button
                      className={`button__status button__status_${item.status.toLowerCase().replace(' ', '_')}`}
                    >
                      {item.status}
                    </button>
                  </td>
                  <td>${item.totalPrice}</td>
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
          total={list.length}
          pageSize={10}
          onChange={(page) => setCurrentPage(page)}
          className={styles.admin__pagination}
        />
      </div>
    </div>
  );
};

export default AdminPage;
