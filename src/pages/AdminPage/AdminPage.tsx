import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CheckboxProps, CheckboxChangeEvent } from 'antd';
import cn from 'classnames';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AppDispatch } from '@/store';

import styles from './styles/admin-page.module.scss';
import { AdminPageHeader } from './components/Header/AdminPageHeader';
import { AdminTable } from './components/Table/AdminTable';
import { AdminPagination } from './components/Pagination/AdminPagination';
import { getOneOrderById } from '@/store/orders/actions';
import { OrderFilterParams, useGetAllOrdersQuery } from '@/store/orders/api';
import { OrderItem } from '@/types/OrderItem';
import { OrderItemResponseDto } from '@/utils/packages/orders/libs/types/order-item-response-dto';

const AdminPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const [appliedFilters, setAppliedFilters] = useState<OrderFilterParams>({});

  const [currentPageState, setCurrentPageState] = useState(0);
  const { data: ordersResponse, isLoading } = useGetAllOrdersQuery({
    page: currentPageState,
    ...appliedFilters,
  });

  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const handleItemCheck = (id: string) => (e: CheckboxChangeEvent) => {
    setCheckedItems((prev) =>
      e.target.checked ? [...prev, id] : prev.filter((itemId) => itemId !== id),
    );
  };

  const handleCheckAll: CheckboxProps['onChange'] = useCallback(
    (e: any) => {
      if (!ordersResponse?.page) return;
      setCheckedItems(
        e.target.checked ? ordersResponse.page.map((item) => item.id) : [],
      );
    },
    [ordersResponse?.page],
  );

  const handleApplyFilters = (filters: OrderFilterParams) => {
    setAppliedFilters(filters);
  };

  const handleSearch = useCallback(
    (filteredProducts: OrderItemResponseDto[]) => {
      // temporary doesn't work
      return filteredProducts;
    },
    [],
  );

  const handleOrderClick = useCallback(
    (item: OrderItem) => {
      dispatch(getOneOrderById(item.id));
    },
    [dispatch],
  );

  const handlePageChange = useCallback((page: number) => {
    setCurrentPageState(page - 1);
  }, []);

  if (!ordersResponse || isLoading) {
    return <LoadingSpinner />;
  }

  const {
    page: orders,
    currentPage,
    totalElements,
    totalPages,
  } = ordersResponse;
  const isAllChecked =
    orders.length > 0 && orders.every((item) => checkedItems.includes(item.id));
  const hasIndeterminate = checkedItems.length > 0 && !isAllChecked;
  const pageSize = Math.ceil(totalElements / totalPages);

  return (
    <div className={styles.admin}>
      <div className={cn(styles.admin__wrapper, 'wrapper')}>
        <AdminPageHeader
          productsData={orders}
          checkedItems={checkedItems}
          onSearch={handleSearch}
          handleApplyFilter={handleApplyFilters}
        />

        <AdminTable
          orders={orders}
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
        totalItems={totalElements}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AdminPage;
