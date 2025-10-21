import { useState } from 'react';
import cn from 'classnames';

import { OrderItem } from '../OrderItem/OrderItem';

import styles from '../../admin-invoice.module.scss';
import { AdminSearch } from '@/pages/AdminPage/components/Search/AdminSearch';
import { convertPriceToReadable } from '@/utils/helpers/helpers';
import { IOrderItemProduct } from '@/utils/packages/orders/libs/types/order-item-response-dto';
import { CartItem } from '@/utils/packages/orders/libs/types/order-item';

interface OrdersListProps {
  totalPrice?: number;
  productsData: IOrderItemProduct[];
  // eslint-disable-next-line no-unused-vars
  onProductAdd: (product: CartItem) => void;
  // eslint-disable-next-line no-unused-vars
  onProductDelete: (productId: string) => void;
}

export const OrdersList = ({
  totalPrice,
  productsData,
  onProductAdd,
  onProductDelete,
}: OrdersListProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleProductSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleAddProduct = () => {
    if (!searchQuery.trim()) {
      return;
    }

    const cartItem: CartItem = {
      productId: searchQuery,
      quantity: 1,
    };

    onProductAdd(cartItem);
    setSearchQuery('');
  };

  return (
    <div
      className={cn(styles.adminInvoice__orders, styles.adminInvoice__wrapper)}
    >
      <div className={styles.adminInvoice__ordersTop}>
        <h3>Order list</h3>

        <div className={styles.adminInvoice__ordersSearch}>
          <AdminSearch
            placeholder="Add the product"
            onSearch={handleProductSearch}
          />

          <button
            className={cn(
              styles.adminInvoice__ordersAdd,
              'button button-secondary',
            )}
            onClick={handleAddProduct}
          >
            Add
          </button>
        </div>
      </div>

      <ul className={styles.adminInvoice__ordersList}>
        {productsData &&
          productsData.map((product) => (
            <OrderItem
              key={product.shortProductResponseDto.id}
              product={product}
              onDelete={onProductDelete}
            />
          ))}
      </ul>

      <div className={styles.adminInvoice__ordersTotal}>
        <span className={styles.adminInvoice__ordersTotalText}>Sum</span>
        <span className={styles.adminInvoice__ordersTotalPrice}>
          {convertPriceToReadable(totalPrice ?? 0, '₴', 'uk-UA')}
        </span>
      </div>
    </div>
  );
};
