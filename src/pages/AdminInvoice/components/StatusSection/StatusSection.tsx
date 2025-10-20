import { Flex } from 'antd';
import cn from 'classnames';
import { useState } from 'react';

import { OrderStatus } from '@/enums/enums';
import LoadingSpinner from '@/components/LoadingSpinner';

import styles from '../../admin-invoice.module.scss';

interface StatusSectionProps {
  initialStatus: string | undefined;
  isLoading: boolean;
  // eslint-disable-next-line no-unused-vars
  onConfirm: (status: string) => void;
}

export const StatusSection = ({
  initialStatus,
  isLoading,
  onConfirm,
}: StatusSectionProps) => {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | null>(
    (initialStatus as OrderStatus) || null,
  );

  const handleConfirm = () => {
    if (selectedStatus && selectedStatus !== initialStatus) {
      onConfirm(selectedStatus);
    }
  };

  const isChanged = selectedStatus !== initialStatus;
  const canConfirm = selectedStatus && isChanged;

  return (
    <div
      className={cn(styles.adminInvoice__wrapper, styles.adminInvoice__status)}
    >
      <h3>Status</h3>

      <Flex gap={12} justify="space-between">
        <div className={styles.adminInvoice__statusButtons}>
          {Object.values(OrderStatus).map((status) => {
            const isActive =
              selectedStatus?.toLowerCase() === status.toLowerCase();
            const isCurrent =
              initialStatus?.toLowerCase() === status.toLowerCase();

            return (
              <button
                key={status}
                type="button"
                disabled={isLoading}
                className={cn(
                  'button__status',
                  styles.admin__statusInput,
                  `button__status_${status.toLowerCase().replace(/\s+/g, '_')}`,
                  {
                    [styles.admin__statusInput_active]: isActive,
                    [styles.admin__statusInput_current]:
                      isCurrent && !isChanged,
                  },
                )}
                onClick={() => setSelectedStatus(status)}
              >
                {isActive && <span>✓ </span>}
                {status}
              </button>
            );
          })}
        </div>

        <div className={styles.adminInvoice__statusConfirm}>
          {isLoading ? (
            <LoadingSpinner style={{ width: '260px', height: '59px' }} />
          ) : (
            <button
              type="button"
              disabled={!canConfirm}
              className="button button-secondary"
              onClick={handleConfirm}
            >
              Confirm
            </button>
          )}
        </div>
      </Flex>
    </div>
  );
};
