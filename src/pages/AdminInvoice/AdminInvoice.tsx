import { useCallback, useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';

import styles from './admin-invoice.module.scss';
import {
  AdminInvoiceHeader,
  DeliveryDetails,
  OrdersList,
  StatusSection,
} from './components';
import { useGetOrderQuery, usePutOrderMutation } from '@/store/orders/api';
import { useSearchProductsQuery } from '@/store/products/api';
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
import {
  IOrderItemAddress,
  IOrderItemProduct,
} from '@/utils/packages/orders/libs/types/order-item-response-dto';
import { toast } from 'react-toastify';
interface Suggestion {
  title: string;
  category: string;
  productId: string;
  price: number;
  image?: string;
}

const AdminInvoice = () => {
  const dispatch = useDispatch();
  const { id = '' } = useParams<{ id: string }>();
  const { data: order } = useGetOrderQuery(id ?? skipToken);
  const [putOrder, { isLoading: isPutting }] = usePutOrderMutation();

  const [searchQuery, setSearchQuery] = useState('');
  const [addedProductsCache, setAddedProductsCache] = useState<Suggestion[]>(
    [],
  );
  const { data: searchResults } = useSearchProductsQuery(
    searchQuery.trim()
      ? { query: searchQuery, pageable: { size: 8 } }
      : skipToken,
  );

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
      setAddedProductsCache([]);
    };
  }, [order, dispatch]);

  const suggestions = useMemo<Suggestion[]>(() => {
    if (!searchResults?.page) return [];

    return searchResults.page.map((product) => ({
      title: product.name,
      category: `Code: ${product.code}`,
      productId: product.id.toString(),
      price: product.price,
      image: product.images?.[0]?.link,
    }));
  }, [searchResults]);

  const displayData = useMemo(() => {
    if (!orderDto?.cartItems) return { products: [], total: 0 };

    const products = orderDto.cartItems
      .map((cartItem) => {
        const originalProduct =
          order?.orderItems.find(
            (item) =>
              String(item.shortProductResponseDto.id) ===
              String(cartItem.productId),
          ) ||
          suggestions.find((s) => s.productId === cartItem.productId) ||
          addedProductsCache.find((s) => s.productId === cartItem.productId);

        if (!originalProduct) return null;

        if ('shortProductResponseDto' in originalProduct) {
          return {
            ...originalProduct,
            quantity: cartItem.quantity,
          };
        }

        return {
          shortProductResponseDto: {
            id: originalProduct.productId,
            name: originalProduct.title,
            href: '',
            price: originalProduct.price,
            images: originalProduct.image
              ? [{ link: originalProduct.image, order: 0 }]
              : [],
            code: originalProduct.category.replace('Code: ', ''),
            categoryId: 0,
            available: true,
            rating: 0,
          },
          price: originalProduct.price,
          quantity: cartItem.quantity,
        };
      })
      .filter(Boolean) as IOrderItemProduct[];

    const total = products.reduce(
      (sum, p) => sum + p.shortProductResponseDto.price * p.quantity,
      0,
    );

    return { products, total };
  }, [orderDto?.cartItems, order?.orderItems, suggestions, addedProductsCache]);

  const hasChanges = useMemo(() => {
    if (!order || !orderDto) return false;

    if (
      order.fullName !== orderDto.fullName ||
      order.email !== orderDto.email ||
      order.phoneNumber !== orderDto.phoneNumber ||
      order.comment !== orderDto.comment ||
      order.deliveryMethod !== orderDto.deliveryMethod ||
      order.paymentMethod !== orderDto.paymentMethod ||
      order.deliveryStatus !== orderDto.deliveryStatus
    ) {
      return true;
    }

    const addressKeys = Object.keys(order.address || {}) as Array<
      keyof IOrderItemAddress
    >;
    if (
      addressKeys.some((key: keyof IOrderItemAddress) => {
        const left = (order.address as Record<string, any>)?.[key as string];
        const right = (orderDto.address as Record<string, any>)?.[
          key as string
        ];
        return left !== right;
      })
    ) {
      return true;
    }

    if (order.orderItems.length !== orderDto.cartItems.length) {
      return true;
    }

    const orderItemsMap = new Map(
      order.orderItems.map((item) => [
        item.shortProductResponseDto.id,
        item.quantity,
      ]),
    );

    const hasCartChanges = orderDto.cartItems.some((cartItem) => {
      const originalQuantity = orderItemsMap.get(cartItem.productId);
      return originalQuantity !== cartItem.quantity;
    });

    return hasCartChanges;
  }, [order, orderDto]);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleProductAdd = useCallback(
    (product: CartItem) => {
      const productDetails = suggestions.find(
        (s) => s.productId === product.productId,
      );

      if (productDetails) {
        setAddedProductsCache((prev) => {
          if (prev.some((p) => p.productId === productDetails.productId)) {
            return prev;
          }
          return [...prev, productDetails];
        });
      }

      dispatch(addCartItem(product));
      setSearchQuery('');
    },
    [dispatch, suggestions],
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

  const handleConfirmationClick = async () => {
    if (order && orderDto && hasChanges) {
      try {
        await putOrder({
          orderId: id,
          selectOrderDto: orderDto,
        }).unwrap();
        toast.success('The order has been updated!', {
          autoClose: 4000,
          theme: 'light',
        });
      } catch (error: any) {
        console.error('Update error:', error);

        const message =
          error?.data?.message || 'Failed to update order. Please try again.';
        toast.error(`Update failed: ${message}`, {
          autoClose: 5000,
          theme: 'dark',
        });
      }
    }
  };

  return (
    <div className={styles.adminInvoice}>
      <div className={cn('container', styles.adminInvoice__container)}>
        <AdminInvoiceHeader orderId={order?.id} createdAt={order?.createdAt} />

        <OrdersList
          totalPrice={displayData.total}
          productsData={displayData.products}
          suggestions={suggestions}
          onSearchChange={handleSearchChange}
          onProductAdd={handleProductAdd}
          onProductDelete={handleProductDelete}
        />

        <DeliveryDetails
          fullName={orderDto?.fullName}
          phoneNumber={orderDto?.phoneNumber}
          address={orderDto?.address}
          comment={orderDto?.comment}
          delivery={order?.deliveryMethod}
          onFieldChange={handleFieldChange}
        />

        <StatusSection
          isDisabled={!hasChanges}
          isLoading={isPutting}
          onConfirm={handleConfirmationClick}
        />
      </div>
    </div>
  );
};

export default AdminInvoice;
