import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';

import { IProductCard } from '@/interfaces/interfaces';
import { AppDispatch, RootState } from '@/store';
import { patchOrder } from '@/store/orders/actions';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import styles from './admin-invoice.module.scss';
import {
  AdminInvoiceHeader,
  DeliveryDetails,
  OrdersList,
  StatusSection,
} from './components';

const AdminInvoice = () => {
  const dispatch: AppDispatch = useDispatch();
  const { activeOrder } = useTypedSelector((state: RootState) => state.order);
  const { productsData } = useTypedSelector(
    (state: RootState) => state.products,
  );
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const handleStatusClick = (status: string) => {
    setSelectedStatus(status);
    dispatch(patchOrder({ id: activeOrder?.id || '', status }));
  };

  const handleProductAdd = useCallback((product: IProductCard) => {
    console.log('Add product:', product);
  }, []);

  const handleProductDelete = useCallback((productId: string) => {
    console.log('Delete product:', productId);
  }, []);

  const handleFieldChange = useCallback((field: string, value: string) => {
    console.log('Field change:', field, value);
  }, []);

  const handleStatusConfirm = useCallback(() => {
    console.log('Confirm status');
  }, []);

  return (
    <div className={styles.adminInvoice}>
      <div className={cn('container', styles.adminInvoice__container)}>
        <AdminInvoiceHeader
          orderId={activeOrder?.id}
          createdAt={activeOrder?.date}
        />

        <OrdersList
          products={activeOrder?.products || []}
          totalPrice={activeOrder?.totalPrice}
          productsData={productsData?.page}
          onProductAdd={handleProductAdd}
          onProductDelete={handleProductDelete}
        />

        <DeliveryDetails
          fullName={activeOrder?.fullName}
          address={activeOrder?.address}
          onFieldChange={handleFieldChange}
        />

        <StatusSection
          selectedStatus={selectedStatus}
          onStatusClick={handleStatusClick}
          onConfirm={handleStatusConfirm}
        />
      </div>
    </div>
  );
};

export default AdminInvoice;
