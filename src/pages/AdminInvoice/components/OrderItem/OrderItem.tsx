
import styles from '../../admin-invoice.module.scss';

interface OrderItemProps {
  product: {
    id: string;
    quantity: number;
    totalPrice: number;
    images: string[];
    name: string;
  };
  // eslint-disable-next-line no-unused-vars
  onDelete: (productId: string) => void;
}

export const OrderItem = ({ product, onDelete }: OrderItemProps) => {
  const handleDelete = () => {
    onDelete(product.id);
  };
  return (
    <li className={styles.adminInvoice__ordersItem}>
      <div className={styles.adminInvoice__ordersItemName}>
        <span></span>
        <span>№{product.id}</span>
      </div>

      <div className={styles.adminInvoice__ordersItemDetails}>
        <span className={styles.adminInvoice__ordersItemDetailsCount}>
          {product.quantity} piece
        </span>

        <span className={styles.adminInvoice__ordersItemDetailsPrice}>
          {product.totalPrice} ₴
        </span>

        {product.images?.[0] && (
          <img src={product.images[0]} alt={product.name} />
        )}

        <button onClick={handleDelete}>x</button>
      </div>
    </li>
  );
};
