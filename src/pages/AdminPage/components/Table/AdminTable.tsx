import { CheckboxProps, CheckboxChangeEvent } from 'antd';
import { AdminTableHeader } from './AdminTableHeader';
import { AdminTableRow } from './AdminTableRow';
import { OrderItem } from '@/types/OrderItem';

import styles from '../../styles/admin-page.module.scss';
import { OrderItemResponseDto } from '@/utils/packages/orders/libs/types/order-item-response-dto';

interface AdminTableProps {
  orders: OrderItemResponseDto[];
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
