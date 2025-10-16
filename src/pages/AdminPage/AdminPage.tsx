import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
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
import { DEFAULT_SIZE } from '@/constants/pagination';

const AdminPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const [appliedFilters, setAppliedFilters] = useState<OrderFilterParams>({});
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(new Set());

  const { data: ordersResponse, isLoading } = useGetAllOrdersQuery({
    page: page - 1,
    ...appliedFilters,
  });

  const toggleSelect = useCallback((id: string) => {
    setSelected((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const toggleAll = useCallback(() => {
    if (!ordersResponse) return;

    const { page: orders } = ordersResponse;

    if (orders.length === selected.size) {
      setSelected(() => new Set());
    } else {
      setSelected(() => new Set(orders.map((item) => item.id)));
    }
  }, [ordersResponse, selected]);

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

  const handlePageChange = useCallback(
    (page: number) => {
      setPage(() => page);
    },
    [page],
  );

  if (!ordersResponse || isLoading) {
    return <LoadingSpinner />;
  }

  const { page: orders, totalElements, totalPages } = ordersResponse;

  console.log(`totalElements: ${totalElements}; totalPages: ${totalPages}`);

  return (
    <div className={styles.admin}>
      <div className={cn(styles.admin__wrapper, 'wrapper')}>
        <AdminPageHeader
          productsData={orders}
          checkedItems={Array.from(selected) as string[]}
          onSearch={handleSearch}
          handleApplyFilter={handleApplyFilters}
        />

        <AdminTable
          orders={orders}
          checkedItems={Array.from(selected) as string[]}
          isAllChecked={selected.size === orders.length}
          hasIndeterminate={selected.size > 0}
          onCheckAll={toggleAll}
          toggleSelect={toggleSelect}
          onOrderClick={handleOrderClick}
        />
      </div>

      <AdminPagination
        currentPage={page}
        totalItems={totalElements}
        pageSize={DEFAULT_SIZE}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AdminPage;
