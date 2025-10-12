import { useCallback, useState } from 'react';
import cn from 'classnames';

import { OrderItem } from '../OrderItem/OrderItem';

import styles from '../../admin-invoice.module.scss';
import { AdminSearch } from '@/pages/AdminPage/components/Search/AdminSearch';
import { convertPriceToReadable } from '@/utils/helpers/helpers';
import { IOrderItemProduct } from '@/utils/packages/orders/libs/types/order-item-response-dto';

interface OrdersListProps {
  products: Array<{
    id: string;
    quantity: number;
    totalPrice: number;
    images: string[];
    name: string;
  }>;
  totalPrice?: number;
  productsData?: IOrderItemProduct[];
  // eslint-disable-next-line no-unused-vars
  onProductAdd: (product: IOrderItemProduct) => void;
  // eslint-disable-next-line no-unused-vars
  onProductDelete: (productId: string) => void;
}

export const OrdersList = ({
  products,
  totalPrice,
  productsData,
  onProductAdd,
  onProductDelete,
}: OrdersListProps) => {
  const [filteredProducts, setFilteredProducts] = useState<IOrderItemProduct[]>(
    [],
  );

  const handleProductSearch = useCallback(
    (query: string) => {
      const normalized = query.trim().toLowerCase();

      const filtered = productsData?.filter(
        (product) =>
          product.name?.toLowerCase().includes(normalized) ||
          product.code?.toLowerCase().includes(normalized),
      );

      setFilteredProducts(filtered || []);
    },
    [productsData],
  );

  const handleAddProduct = () => {
    if (filteredProducts.length === 0) {
      console.log('No products found');
      return;
    }

    const productToAdd = filteredProducts[0];
    onProductAdd(productToAdd);
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
        {products.map((product) => (
          <OrderItem
            key={product.id}
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
