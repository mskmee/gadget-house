import { useCallback, useEffect } from 'react';
import cn from 'classnames';
import { useSelector } from 'react-redux';

import styles from './admin-invoice.module.scss';
import {
  AdminInvoiceHeader,
  DeliveryDetails,
  OrdersList,
  StatusSection,
} from './components';
import { useParams } from 'react-router-dom';
import { useGetOrderQuery, usePutOrderMutation } from '@/store/orders/api';
import { skipToken } from '@reduxjs/toolkit/query';
import { useDispatch } from 'react-redux';
import {
  setOrderDto,
  clearOrderDto,
  addCartItem,
  deleteCartItem,
  selectOrderDto,
  setFieldValue,
} from '@/store/orders/orderDtoSlice';
import {
  CartItem,
  OrderDto,
} from '@/utils/packages/orders/libs/types/order-item';
import { weakObjectsCompare } from '@/utils/weakObjectsCompare';

const AdminInvoice = () => {
  const dispatch = useDispatch();
  const { id = '' } = useParams<{ id: string }>();
  const { data: order } = useGetOrderQuery(id ?? skipToken);
  const [putOrder, { isLoading: isPutting }] = usePutOrderMutation();

  const orderDto = useSelector(selectOrderDto);

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
          deliveryStatus: order.deliveryStatus,
        }),
      );
    }

    return () => {
      dispatch(clearOrderDto());
    };
  }, [order, dispatch]);

  const handleConfirmationClick = () => {
    if (order && orderDto && !weakObjectsCompare(order, orderDto)) {
      putOrder({
        orderId: id,
        selectOrderDto: orderDto,
      });
    }
  };

  const handleProductAdd = useCallback(
    (product: CartItem) => {
      dispatch(addCartItem(product));
    },
    [dispatch],
  );

  const handleProductDelete = useCallback(
    (productId: string) => {
      dispatch(deleteCartItem({ productId }));
    },
    [dispatch],
  );

  const handleFieldChange = useCallback(
    (field: keyof OrderDto, value: any) => {
      dispatch(setFieldValue({ field, value }));
    },
    [dispatch],
  );

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
          fullName={orderDto?.fullName}
          address={orderDto?.address}
          comment={orderDto?.comment}
          delivery={order?.deliveryMethod}
          onFieldChange={handleFieldChange}
        />

        <StatusSection
          isDisabled={
            !order || !orderDto || weakObjectsCompare(order, orderDto)
          }
          isLoading={isPutting}
          onConfirm={handleConfirmationClick}
        />
      </div>
    </div>
  );
};

export default AdminInvoice;
