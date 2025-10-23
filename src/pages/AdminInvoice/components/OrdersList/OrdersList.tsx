import cn from 'classnames';
import { OrderItem } from '../OrderItem/OrderItem';
import { AdminSearchWithSuggestions } from '@/pages/AdminPage/components/AdminSearchWIthSuggestion/SearchWithSuggestion';
import styles from '../../admin-invoice.module.scss';
import { convertPriceToReadable } from '@/utils/helpers/helpers';
import { IOrderItemProduct } from '@/utils/packages/orders/libs/types/order-item-response-dto';
import { CartItem } from '@/utils/packages/orders/libs/types/order-item';

interface Suggestion {
  title: string;
  category: string;
  productId: string;
  price: number;
  image?: string;
}

interface OrdersListProps {
  totalPrice?: number;
  productsData: IOrderItemProduct[];
  suggestions: Suggestion[];
  // eslint-disable-next-line no-unused-vars
  onSearchChange: (query: string) => void;
  // eslint-disable-next-line no-unused-vars
  onProductAdd: (product: CartItem) => void;
  // eslint-disable-next-line no-unused-vars
  onProductDelete: (productId: string) => void;
}

export const OrdersList = ({
  totalPrice,
  productsData,
  suggestions,
  onSearchChange,
  onProductAdd,
  onProductDelete,
}: OrdersListProps) => {
  const handleAddProduct = (productId: string) => {
    if (!productId) return;

    const cartItem: CartItem = {
      productId,
      quantity: 1,
    };

    onProductAdd(cartItem);
  };

  return (
    <div
      className={cn(styles.adminInvoice__orders, styles.adminInvoice__wrapper)}
    >
      <div className={styles.adminInvoice__ordersTop}>
        <h3>Order list</h3>

        <div className={styles.adminInvoice__ordersSearch}>
          <AdminSearchWithSuggestions
            placeholder="Add the product"
            suggestions={suggestions}
            onSearchChange={onSearchChange}
            onProductSelect={handleAddProduct}
          />
        </div>
      </div>

      <ul className={styles.adminInvoice__ordersList}>
        {productsData.map((product) => (
          <OrderItem
            key={product.shortProductResponseDto.id}
            id={product.shortProductResponseDto.id}
            name={product.shortProductResponseDto.name}
            image={product.shortProductResponseDto.images[0].link}
            quantity={product.quantity}
            price={product.price}
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
