import { useCallback, useEffect } from 'react';
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
import { skipToken } from '@reduxjs/toolkit/query';
import { useDispatch } from 'react-redux';
import {
  setOrderDto,
  clearOrderDto,
  addCartItem,
  deleteCartItem,
} from '@/store/orders/orderDtoSlice';
import { CartItem } from '@/utils/packages/orders/libs/types/order-item';

const AdminInvoice = () => {
  const dispatch = useDispatch();
  const { id = '' } = useParams<{ id: string }>();
  const { data: order } = useGetOrderQuery(id ?? skipToken);
  const [patchOrder, { isLoading: isPatching }] = usePatchOrderMutation();

  useEffect(() => {
    if (order) {
      dispatch(
        setOrderDto({
          fullName: order.fullName,
          email: order.email,
          phoneNumber: order.phoneNumber,
          comment: order.comment,
          cartItems: order.orderItems.map((item) => ({
            productId: item.shortProductResponseDto.id,
            quantity: item.quantity,
          })),
          address: order.address,
          deliveryMethod: order.deliveryMethod,
          paymentMethod: order.paymentMethod,
        }),
      );
    }

    return () => {
      dispatch(clearOrderDto());
    };
  }, [order, dispatch]);

  const handleStatusClick = (status: string) => {
    patchOrder({ id: order?.id || '', status });
  };

  const handleProductAdd = useCallback((product: CartItem) => {
    dispatch(addCartItem(product));
  }, []);

  const handleProductDelete = useCallback((productId: string) => {
    dispatch(deleteCartItem({ productId }));
  }, []);

  const handleFieldChange = useCallback((field: string, value: string) => {
    handleFieldChange(field, value);
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
