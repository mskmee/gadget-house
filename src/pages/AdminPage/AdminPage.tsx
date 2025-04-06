import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Pagination, Checkbox, CheckboxProps } from 'antd';
import cn from 'classnames';

import { IProductCard } from '@/interfaces/interfaces';
import { AppDispatch, RootState } from '@/store';
import { setActiveOrder } from '@/store/orders/order_slice';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import Filters from './libs/components/Filters';
import AdminSearch from './libs/components/AdminSearch';

import styles from './admin-page.module.scss';

const AdminPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { orders } = useTypedSelector((state: RootState) => state.order);
  const { productsData } = useTypedSelector(
    (state: RootState) => state.products,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [, setSelectedFilters] = useState({});
  const [, setFilteredProducts] = useState<IProductCard[]>([]);

  const handleFilterChange = (key: string, values: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [key]: values.length ? values : [],
    }));
  };

  const onChecked: CheckboxProps['onChange'] = (e) => {
    console.log(`checked = ${e.target.checked}`);
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
              {orders &&
                orders?.page.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <Checkbox onChange={onChecked}></Checkbox>
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
          total={orders?.page.length}
          pageSize={10}
          onChange={(page) => setCurrentPage(page)}
          className={styles.admin__pagination}
        />
      </div>
    </div>
  );
};

export default AdminPage;
