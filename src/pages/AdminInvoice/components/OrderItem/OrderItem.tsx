import { IOrderItemProduct } from '@/utils/packages/orders/libs/types/order-item-response-dto';
import styles from '../../admin-invoice.module.scss';
import { CancelCrossIcon } from '@/assets/icons';

interface OrderItemProps {
  product: IOrderItemProduct;
  // eslint-disable-next-line no-unused-vars
  onDelete: (productId: string) => void;
}

export const OrderItem = ({ product, onDelete }: OrderItemProps) => {
  const handleDelete = () => {
    onDelete(product.shortProductResponseDto.id);
  };
  return (
    <li className={styles.adminInvoice__ordersItem}>
      <div className={styles.adminInvoice__ordersItemName}>
        <span></span>
        <span>№{product.shortProductResponseDto.id}</span>
      </div>

      <div className={styles.adminInvoice__ordersItemDetails}>
        <span className={styles.adminInvoice__ordersItemDetailsCount}>
          {product.quantity} piece
        </span>

        <span className={styles.adminInvoice__ordersItemDetailsPrice}>
          {product.price * product.quantity} ₴
        </span>

        {product.shortProductResponseDto.images?.[0] && (
          <img
            src={product.shortProductResponseDto.images[0].link}
            alt={product.shortProductResponseDto.name}
          />
        )}

        <button onClick={handleDelete}>
          <CancelCrossIcon />
        </button>
      </div>
    </li>
  );
};
