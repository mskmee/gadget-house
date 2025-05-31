import { CheckboxProps, CheckboxChangeEvent } from 'antd';
import { AdminTableHeader } from './AdminTableHeader';
import { AdminTableRow } from './AdminTableRow';

import styles from '../../styles/admin-page.module.scss';

interface OrderItem {
  id: string;
  phoneNumber: string;
  status: string;
  totalPrice: number;
  date: string;
}

interface AdminTableProps {
  orders: OrderItem[];
  checkedItems: string[];
  isAllChecked: boolean;
  hasIndeterminate: boolean;
  onCheckAll: CheckboxProps['onChange'];
  // eslint-disable-next-line no-unused-vars
  onItemCheck: (id: string) => (e: CheckboxChangeEvent) => void;
  // eslint-disable-next-line no-unused-vars
  onOrderClick: (item: OrderItem) => void;
}

export const AdminTable = ({
  orders,
  checkedItems,
  isAllChecked,
  hasIndeterminate,
  onCheckAll,
  onItemCheck,
  onOrderClick,
}: AdminTableProps) => {
  return (
    <div className={styles.admin__table}>
      <table className={styles.admin__tableWrapper}>
        <AdminTableHeader
          isAllChecked={isAllChecked}
          hasIndeterminate={hasIndeterminate}
          onCheckAll={onCheckAll}
        />

        <tbody>
          {orders.map((item) => (
            <AdminTableRow
              key={item.id}
              item={item}
              isChecked={checkedItems.includes(item.id)}
              onChecked={onItemCheck(item.id)}
              onOrderClick={onOrderClick}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
