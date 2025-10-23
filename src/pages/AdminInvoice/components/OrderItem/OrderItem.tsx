import styles from '../../admin-invoice.module.scss';
import { CancelCrossIcon } from '@/assets/icons';

interface OrderItemProps {
  id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
  // eslint-disable-next-line no-unused-vars
  onDelete: (productId: string) => void;
}

export const OrderItem = ({
  id,
  name,
  image,
  quantity,
  price,
  onDelete,
}: OrderItemProps) => {
  const handleDelete = () => onDelete(id);

  return (
    <li className={styles.adminInvoice__ordersItem}>
      <div className={styles.adminInvoice__ordersItemName}>
        <span></span>
        <span>No{id}</span>
      </div>

      <div className={styles.adminInvoice__ordersItemDetails}>
        <span className={styles.adminInvoice__ordersItemDetailsCount}>
          {quantity} piece
        </span>

        <span className={styles.adminInvoice__ordersItemDetailsPrice}>
          {price * quantity} ₴
        </span>

        {image && <img src={image} alt={name} />}

        <button onClick={handleDelete}>
          <CancelCrossIcon />
        </button>
      </div>
    </li>
  );
};
