import { useCallback } from 'react';
import cn from 'classnames';

import styles from './admin-invoice.module.scss';
import {
  AdminInvoiceHeader,
  DeliveryDetails,
  OrdersList,
  StatusSection,
} from './components';
import { useParams } from 'react-router-dom';
import { useGetOrderQuery, usePatchOrderMutation } from '@/store/orders/api';
import { IOrderItemProduct } from '@/utils/packages/orders/libs/types/order-item-response-dto';
import { skipToken } from '@reduxjs/toolkit/query';

const AdminInvoice = () => {
  const { id = '' } = useParams<{ id: string }>();
  const { data: order } = useGetOrderQuery(id ?? skipToken);
  const [patchOrder, { isLoading: isPatching }] = usePatchOrderMutation();

  const handleStatusClick = (status: string) => {
    patchOrder({ id: order?.id || '', status });
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

  return (
    <div className={styles.adminInvoice}>
      <div className={cn('container', styles.adminInvoice__container)}>
        <AdminInvoiceHeader orderId={order?.id} createdAt={order?.createdAt} />

        <OrdersList
          totalPrice={order?.total}
          productsData={order?.orderItems || []}
          onProductAdd={handleProductAdd}
          onProductDelete={handleProductDelete}
        />

        <DeliveryDetails
          fullName={order?.fullName}
          address={order?.address}
          comment={order?.comment}
          delivery={order?.deliveryMethod}
          onFieldChange={handleFieldChange}
        />

        <StatusSection
          initialStatus={order?.deliveryStatus}
          isLoading={isPatching}
          onConfirm={handleStatusClick}
        />
      </div>
    </div>
  );
};

export default AdminInvoice;
