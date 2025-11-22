import { CheckboxProps } from 'antd';
import { AdminTableHeader } from './AdminTableHeader';
import { AdminTableRow } from './AdminTableRow';

import styles from '../../styles/admin-page.module.scss';
import { OrderItemResponseDto } from '@/utils/packages/orders/libs/types/order-item-response-dto';

interface AdminTableProps {
  orders: OrderItemResponseDto[];
  checkedItems: string[];
  isAllChecked: boolean;
  hasIndeterminate: boolean;
  onCheckAll: CheckboxProps['onChange'];
  isPatchingStatus: boolean;
  // eslint-disable-next-line no-unused-vars
  toggleSelect: (id: string) => void;
}

export const AdminTable = ({
  orders,
  checkedItems,
  isAllChecked,
  hasIndeterminate,
  onCheckAll,
  toggleSelect,
  isPatchingStatus,
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
          {orders.length > 0 ? (
            orders.map((item) => (
              <AdminTableRow
                isPatching={isPatchingStatus}
                key={item.id}
                item={item}
                isChecked={checkedItems.includes(item.id)}
                onChecked={() => toggleSelect(item.id)}
              />
            ))
          ) : (
            <tr>
              <td colSpan={5}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '48px 0',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '20px',
                    color: 'var(--text-color)',
                    opacity: 0.6,
                    textAlign: 'center',
                  }}
                >
                  Orders not found
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
