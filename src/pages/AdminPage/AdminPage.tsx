import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pagination, InputRef, Checkbox, CheckboxProps } from 'antd';
import cn from 'classnames';

import { OrderStatus } from '@/enums/enums';
import { Search } from '@/components/Header/Search/Search';
import { Filters } from './libs/components/Filters';

import styles from './admin-page.module.scss';

const AdminPage = () => {
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
              {[...Array(10)].map((_, idx) => (
                <tr key={idx}>
                  <td>
                    <Checkbox onChange={onChecked}></Checkbox>
                    <Link to={`/admin/4814684-${idx + 1}`}>
                      4814684-{idx + 1}
                    </Link>
                  </td>
                  <td>(057) 333 33 33</td>
                  <td>
                    <span
                      className={`button__status button__status_${Object.values(OrderStatus)[idx % Object.values(OrderStatus).length].toLowerCase().replace(' ', '_')}`}
                    >
                      {
                        Object.values(OrderStatus)[
                          idx % Object.values(OrderStatus).length
                        ]
                      }
                    </span>
                  </td>
                  <td>${(Math.random() * 10000).toFixed(2)}</td>
                  <td>14/09/2025</td>
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
          total={40}
          pageSize={10}
          onChange={(page) => setCurrentPage(page)}
          className={styles.admin__pagination}
        />
      </div>
    </div>
  );
};

export default AdminPage;
