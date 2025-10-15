import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CheckboxProps, CheckboxChangeEvent } from 'antd';
import cn from 'classnames';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AppDispatch } from '@/store';
import { DEFAULT_SIZE } from '@/constants/pagination';

import styles from './styles/admin-page.module.scss';
import { AdminPageHeader } from './components/Header/AdminPageHeader';
import { AdminTable } from './components/Table/AdminTable';
import { AdminPagination } from './components/Pagination/AdminPagination';
import { getOneOrderById } from '@/store/orders/actions';
import { useGetAllOrdersQuery } from '@/store/orders/api';
import { OrderItem } from '@/types/OrderItem';
import { OrderItemResponseDto } from '@/utils/packages/orders/libs/types/order-item-response-dto';
import { setFilterOrders } from '@/store/orders/order_slice';
import { useTypedSelector } from '@/hooks/useTypedSelector';

const AdminPage = () => {
  const dispatch: AppDispatch = useDispatch();

  const { data: ordersResponse, isLoading } = useGetAllOrdersQuery();
  const { filteredOrders } = useTypedSelector((state) => state.order);

  const [currentPage, setCurrentPage] = useState(1);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const currentItems = filteredOrders?.slice(
    (currentPage - 1) * DEFAULT_SIZE,
    currentPage * DEFAULT_SIZE,
  );

  const isAllChecked =
    currentItems.length > 0 &&
    currentItems.every((item) => checkedItems.includes(item.id));

  const hasIndeterminate =
    checkedItems.length === currentItems.length && !isAllChecked;

  useEffect(() => {
    if (ordersResponse?.page) {
      dispatch(setFilterOrders({ orders: ordersResponse.page }));
      console.log(ordersResponse.page);
    }
  }, [ordersResponse, dispatch]);

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

  const handleSearch = useCallback(
    (filteredProducts: OrderItemResponseDto[]) => {
      // temporary doesn't work
      return filteredProducts;
    },
    [],
  );

  const handleOrderClick = (item: OrderItem) => {
    dispatch(getOneOrderById(item.id));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.admin}>
      <div className={cn(styles.admin__wrapper, 'wrapper')}>
        <AdminPageHeader
          productsData={filteredOrders}
          checkedItems={checkedItems}
          onSearch={handleSearch}
        />

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <AdminTable
            orders={filteredOrders}
            checkedItems={checkedItems}
            isAllChecked={isAllChecked}
            hasIndeterminate={hasIndeterminate}
            onCheckAll={handleCheckAll}
            onItemCheck={handleItemCheck}
            onOrderClick={handleOrderClick}
          />
        )}
      </div>

      <AdminPagination
        currentPage={currentPage}
        totalItems={filteredOrders?.length || 0}
        pageSize={DEFAULT_SIZE}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AdminPage;
