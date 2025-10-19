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
import {
  OrderFilterParams,
  useGetAllOrdersQuery,
  usePatchOrderMutation,
} from '@/store/orders/api';
import { OrderItem } from '@/types/OrderItem';
import { DEFAULT_SIZE } from '@/constants/pagination';
import { searchOrder } from '@/utils/helpers/search-order';

const AdminPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const [appliedFilters, setAppliedFilters] = useState<OrderFilterParams>({});
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(new Set());
  const [search, setSearch] = useState<string>('');
  const [patchOrder, { isLoading: isPatching }] = usePatchOrderMutation();

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

  const handleSearch = useCallback((search: string) => {
    setSearch(search);
  }, []);

  const handleOrderClick = useCallback(
    (item: OrderItem) => {
      dispatch(getOneOrderById(item.id));
    },
    [dispatch],
  );

  const handlePageChange = useCallback((page: number) => {
    setPage(() => page);
  }, []);

  if (!ordersResponse || isLoading) {
    return <LoadingSpinner />;
  }

  const { page: orders, totalElements } = ordersResponse;

  return (
    <div className={styles.admin}>
      <div className={cn(styles.admin__wrapper, 'wrapper')}>
        <AdminPageHeader
          checkedItems={Array.from(selected) as string[]}
          onSearch={handleSearch}
          handleApplyFilter={handleApplyFilters}
          patchOrder={patchOrder}
        />

        <AdminTable
          orders={orders.filter((order) => searchOrder(order, search))}
          checkedItems={Array.from(selected) as string[]}
          isPatchingStatus={isPatching}
          isAllChecked={selected.size === orders.length}
          hasIndeterminate={
            selected.size > 0 && selected.size === orders.length
          }
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
