import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Popover } from 'antd';
import cn from 'classnames';

import { AppDispatch } from '@/store';
import { updateOrdersStatus } from '@/store/orders/order_slice';
import { CheckedOrderIcon } from '@/assets/icons/CheckedOrder';
import { patchMultipleOrders } from '@/store/orders/actions';
import styles from './change-status.module.scss';

interface IChangeStatusProps {
  // eslint-disable-next-line no-unused-vars
  checkedItems: string[];
}

const ChangeStatus: FC<IChangeStatusProps> = ({ checkedItems }) => {
  const dispatch: AppDispatch = useDispatch();
  const [isStatusMenuOpen, setStatusMenuOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const toggleStatusPopup = () => {
    if (checkedItems.length > 0) {
      setStatusMenuOpen((prev) => !prev);
    }
  };

  const handleApplyStatus = async () => {
    if (!selectedStatus) return;

    dispatch(
      updateOrdersStatus({ ids: checkedItems, newStatus: selectedStatus }),
    );

    await dispatch(
      patchMultipleOrders({ ids: checkedItems, status: selectedStatus }),
    );

    setStatusMenuOpen(false);
    setSelectedStatus(null);
  };

  const content = (
    <>
      <div className={styles.statusPopup}>
        <h3>Change Status to:</h3>

        <div className={styles.statusPopup__options}>
          {['Paid', 'Returned', 'Cancel', 'Order', 'Sent'].map((status) => (
            <button
              key={status}
              className={cn(
                styles.statusPopup__option,
                `button__status button__status_${status.toLowerCase().replace(' ', '_')}`,
              )}
              onClick={() => setSelectedStatus(status)}
            >
              {selectedStatus === status && <span>✓ </span>}
              {status}
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
        open={isStatusMenuOpen}
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
        <button
          onClick={toggleStatusPopup}
          disabled={checkedItems.length === 0}
        >
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
