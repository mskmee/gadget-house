import { FC, useState } from 'react';
import { Popover } from 'antd';
import cn from 'classnames';

import { CheckedOrderIcon } from '@/assets/icons/CheckedOrder';
import styles from './change-status.module.scss';
import { OrderStatus } from '@/enums/order-status';
import { usePatchOrderMutation } from '@/store/orders/api';
import { formatTitle } from '@/utils/helpers/formatTitle';

interface IChangeStatusProps {
  // eslint-disable-next-line no-unused-vars
  checkedItems: string[];
  // eslint-disable-next-line no-unused-vars
  patchOrder: ReturnType<typeof usePatchOrderMutation>[0];
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  onStatusChanged: () => void;
}

const ChangeStatus: FC<IChangeStatusProps> = ({
  checkedItems,
  patchOrder,
  isOpen,
  onToggle,
  onClose,
  onStatusChanged,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const handleApplyStatus = async () => {
    if (!selectedStatus) return;

    await Promise.allSettled(
      checkedItems.map(async (id) => {
        try {
          await patchOrder({ id, status: selectedStatus }).unwrap();
        } catch (error) {
          console.error(`Failed to update order ${id}:`, error);
        }
      }),
    );

    onClose();
    setSelectedStatus(null);
    onStatusChanged();
  };

  const content = (
    <>
      <div className={styles.statusPopup}>
        <h3>Change Status to:</h3>

        <div className={styles.statusPopup__options}>
          {Object.values(OrderStatus).map((status) => (
            <button
              key={status}
              className={cn(
                styles.statusPopup__option,
                `button__status button__status_${status.toLowerCase().replace(' ', '_')}`,
              )}
              onClick={() => setSelectedStatus(status)}
            >
              {selectedStatus === status && <span>✓ </span>}
              {status.split(' ').map(formatTitle).join(' ')}
            </button>
          ))}
        </div>
      </div>

      <button
        className={cn('button button-secondary', styles.statusPopup__btnApply)}
        disabled={!selectedStatus}
        onClick={handleApplyStatus}
      >
        Apply
      </button>
    </>
  );

  return (
    <div className={styles.admin__changeStatus}>
      <Popover
        title=""
        trigger="click"
        open={isOpen}
        onOpenChange={(newOpen) => {
          if (!newOpen) {
            onClose();
          }
        }}
        placement="bottomRight"
        content={content}
        overlayInnerStyle={{
          width: '406px',
          padding: '32px',
          marginTop: '15px',
          backdropFilter: 'blur(10px)',
          boxShadow:
            '0 4px 4px -4px rgba(12, 12, 13, 0.05), 0 16px 32px -4px rgba(12, 12, 13, 0.1)',
          backgroundColor: 'rgba(234, 228, 238, 0.8)',
        }}
      >
        <button onClick={onToggle} disabled={checkedItems.length === 0}>
          <CheckedOrderIcon
            stroke={
              checkedItems.length > 0
                ? 'var(--text-color)'
                : 'var(--secondary-text-color)'
            }
          />
        </button>
      </Popover>
    </div>
  );
};

export { ChangeStatus };
