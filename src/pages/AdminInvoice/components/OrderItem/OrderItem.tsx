import { convertPriceToReadable } from '@/utils/helpers/product';
import styles from '../../admin-invoice.module.scss';
import { CancelCrossIcon } from '@/assets/icons';
import { Currency } from '@/enums/Currency';

interface OrderItemProps {
  id: string;
  code: string;
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
  code,
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
        <span>№{code}</span>
      </div>

      <div className={styles.adminInvoice__ordersItemDetails}>
        <span className={styles.adminInvoice__ordersItemDetailsCount}>
          {quantity} piece
        </span>

        <span className={styles.adminInvoice__ordersItemDetailsPrice}>
          {convertPriceToReadable(price * quantity, '₴' as Currency, 'uk-UA')}
        </span>

        {image && <img src={image} alt={name} />}

        <button onClick={handleDelete}>
          <CancelCrossIcon />
        </button>
      </div>
    </li>
  );
};
