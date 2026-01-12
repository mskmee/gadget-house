import styles from '../../styles/admin-page.module.scss';
import { Link } from 'react-router-dom';
import { Checkbox, CheckboxChangeEvent } from 'antd';
import { convertPriceToReadable } from '@/utils/helpers/helpers';
import { OrderItem } from '@/types/OrderItem';
import { formatDateToDDMMYYYY } from '@/utils/helpers/format-date';
import { formatPhoneDisplay } from '@/utils/helpers/formatPhoneNumber';
import { useLocale } from '@/context/localeContext';
import LoadingSpinner from '@/components/LoadingSpinner';
import { formatTitle } from '@/utils/helpers/formatTitle';

interface AdminTableRowProps {
  item: OrderItem;
  isChecked: boolean;
  // eslint-disable-next-line no-unused-vars
  onChecked: (e: CheckboxChangeEvent) => void;
  // eslint-disable-next-line no-unused-vars
  isPatching: boolean;
}

export const AdminTableRow = ({
  item,
  isChecked,
  onChecked,
  isPatching,
}: AdminTableRowProps) => {
  const locale = useLocale();

  const statusClass = item.deliveryStatus.toLowerCase().replace(/\s+/g, '_');
  const displayStatus = item.deliveryStatus
    .replace('_', ' ')
    .split(' ')
    .map(formatTitle)
    .join(' ');

  return (
    <tr>
      <td>
        <div>
          <Checkbox
            onChange={onChecked}
            checked={isChecked}
            className={styles.admin__tableWrapperCheckbox}
          />
          <Link to={`/admin/${item.id}`}>{item.id}</Link>
        </div>
      </td>
      <td>{formatPhoneDisplay(item.phoneNumber)}</td>
      <td>
        {isChecked && isPatching ? (
          <div style={{ height: '44px' }}>
            <LoadingSpinner />
          </div>
        ) : (
          <button className={`button__status button__status_${statusClass}`}>
            {displayStatus}
          </button>
        )}
      </td>
      <td>{convertPriceToReadable(item.total ?? 0, '₴', locale)}</td>
      <td>{formatDateToDDMMYYYY(item.createdAt)}</td>
    </tr>
  );
};
