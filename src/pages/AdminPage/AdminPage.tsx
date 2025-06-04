import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CheckboxProps, CheckboxChangeEvent } from 'antd';
import cn from 'classnames';

import { IProductCard } from '@/interfaces/interfaces';
import { AppDispatch, RootState } from '@/store';
import { setActiveOrder } from '@/store/orders/order_slice';
import { DEFAULT_SIZE } from '@/constants/pagination';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import styles from './styles/admin-page.module.scss';
import { AdminPageHeader } from './components/Header/AdminPageHeader';
import { AdminTable } from './components/Table/AdminTable';
import { AdminPagination } from './components/Pagination/AdminPagination';

interface OrderItem {
  id: string;
  phoneNumber: string;
  status: string;
  totalPrice: number;
  date: string;
}

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

  const currentItems =
    orders?.slice(
      (currentPage - 1) * DEFAULT_SIZE,
      currentPage * DEFAULT_SIZE,
    ) || [];

  const isAllChecked =
    currentItems.length > 0 &&
    currentItems.every((item) => checkedItems.includes(item.id));

  const hasIndeterminate = checkedItems.length > 0 && !isAllChecked;

  const handleItemCheck = (id: string) => (e: CheckboxChangeEvent) => {
    setCheckedItems((prev) => {
      if (e.target.checked) {
        return [...prev, id];
      } else {
        return prev.filter((itemId) => itemId !== id);
      }
    });
  };

  const handleCheckAll: CheckboxProps['onChange'] = (e) => {
    if (e.target.checked) {
      const allIds = currentItems.map((item) => item.id);
      setCheckedItems(allIds);
    } else {
      setCheckedItems([]);
    }
  };

  const handleSearch = useCallback((filteredProducts: IProductCard[]) => {
    setFilteredProducts(filteredProducts);
  }, []);

  const handleOrderClick = (item: OrderItem) => {
    dispatch(setActiveOrder(item));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.admin}>
      <div className={cn(styles.admin__container, 'container')}>
        <AdminPageHeader
          productsData={productsData?.page}
          checkedItems={checkedItems}
          onSearch={handleSearch}
        />

        <AdminTable
          orders={currentItems}
          checkedItems={checkedItems}
          isAllChecked={isAllChecked}
          hasIndeterminate={hasIndeterminate}
          onCheckAll={handleCheckAll}
          onItemCheck={handleItemCheck}
          onOrderClick={handleOrderClick}
        />
      </div>

      <AdminPagination
        currentPage={currentPage}
        totalItems={orders?.length || 0}
        pageSize={DEFAULT_SIZE}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AdminPage;
