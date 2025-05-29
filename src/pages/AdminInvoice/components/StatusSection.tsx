import { Flex } from 'antd';
import cn from 'classnames';

import { OrderStatus } from '@/enums/enums';

import styles from '../admin-invoice.module.scss';

interface StatusSectionProps {
  selectedStatus: string | null;
  // eslint-disable-next-line no-unused-vars
  onStatusClick: (status: string) => void;
  onConfirm: () => void;
}

export const StatusSection = ({
  selectedStatus,
  onStatusClick,
  onConfirm,
}: StatusSectionProps) => {
  return (
    <div
      className={cn(styles.adminInvoice__wrapper, styles.adminInvoice__status)}
    >
      <h3>Status</h3>

      <Flex gap={12} justify="space-between">
        <div className={styles.adminInvoice__statusButtons}>
          {Object.values(OrderStatus).map((status) => (
            <button
              key={status}
              type="button"
              className={cn(
                'button__status',
                styles.admin__statusInput,
                `button__status_${status.toLocaleLowerCase().replace(' ', '_')}`,
              )}
              onClick={() => onStatusClick(status)}
            >
              {selectedStatus === status && <span>✓ </span>}
              {status}
            </button>
          ))}
        </div>

        <div className={styles.adminInvoice__statusConfirm}>
          <button
            type="button"
            className="button button-secondary"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </Flex>
    </div>
  );
};
