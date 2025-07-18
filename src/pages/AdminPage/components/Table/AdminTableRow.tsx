import styles from '../../styles/admin-page.module.scss';
import { Link } from 'react-router-dom';
import { Checkbox, CheckboxChangeEvent } from 'antd';
import { convertPriceToReadable } from '@/utils/helpers/helpers';
import { OrderItem } from '@/types/OrderItem';
import { formatDateToDDMMYYYY } from '@/utils/helpers/format-date';



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
          className={`button__status button__status_${item.deliveryStatus.toLowerCase().replace(' ', '_')}`}
        >
          {item.deliveryStatus}
        </button>
      </td>
      <td>{convertPriceToReadable(item.total ?? 0, '₴', 'uk-UA')}</td>
      <td>{formatDateToDDMMYYYY(item.createdAt)}</td>
    </tr>
  );
};
