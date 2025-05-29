import styles from '../../styles/admin-page.module.scss';
import { Link } from 'react-router-dom';
import { Checkbox, CheckboxChangeEvent } from 'antd';

interface OrderItem {
  id: string;
  phoneNumber: string;
  status: string;
  totalPrice: number;
  date: string;
}

interface AdminTableRowProps {
  item: OrderItem;
  isChecked: boolean;
  // eslint-disable-next-line no-unused-vars
  onChecked: (e: CheckboxChangeEvent) => void;
  // eslint-disable-next-line no-unused-vars
  onOrderClick: (item: OrderItem) => void;
}

export const AdminTableRow = ({
  item,
  isChecked,
  onChecked,
  onOrderClick,
}: AdminTableRowProps) => {
  return (
    <tr>
      <td>
        <Checkbox
          onChange={onChecked}
          checked={isChecked}
          className={styles.admin__tableWrapperCheckbox}
        />
        <Link
          to={`/admin/${item.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onOrderClick(item);
          }}
        >
          {item.id}
        </Link>
      </td>
      <td>{item.phoneNumber}</td>
      <td>
        <button
          className={`button__status button__status_${item.status.toLowerCase().replace(' ', '_')}`}
        >
          {item.status}
        </button>
      </td>
      <td>{item.totalPrice} ₴</td>
      <td>{item.date}</td>
    </tr>
  );
};
