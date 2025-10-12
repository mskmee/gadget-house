import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import { useState } from 'react';
import { AppDispatch } from '@/store';

import styles from './admin-invoice.module.scss';
import {
  AdminInvoiceHeader,
  DeliveryDetails,
  OrdersList,
  StatusSection,
} from './components';
import { useParams } from 'react-router-dom';
import { useGetOrderByIdQuery } from '@/store/orders/api';
import { patchOrder } from '@/store/orders/actions';
import { IOrderItemProduct } from '@/utils/packages/orders/libs/types/order-item-response-dto';

const AdminInvoice = () => {
  const dispatch: AppDispatch = useDispatch();
  const { id = '' } = useParams<{ id: string }>();
  const { data: order } = useGetOrderByIdQuery(id);

  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const handleStatusClick = (status: string) => {
    setSelectedStatus(status);
    dispatch(patchOrder({ id: order?.id || '', status }));
  };

  const handleProductAdd = useCallback((product: IOrderItemProduct) => {
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

  console.log(`Admin invoice ${JSON.stringify(order?.products)}.`);

  return (
    <div className={styles.adminInvoice}>
      <div className={cn('container', styles.adminInvoice__container)}>
        <AdminInvoiceHeader orderId={order?.id} createdAt={order?.createdAt} />

        <OrdersList
          products={order?.products || []}
          totalPrice={order?.total}
          productsData={order?.products}
          onProductAdd={handleProductAdd}
          onProductDelete={handleProductDelete}
        />

        <DeliveryDetails
          fullName={order?.fullName}
          address={order?.address}
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
