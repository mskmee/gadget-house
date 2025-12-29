import { Flex } from 'antd';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import { OrderStatus } from '@/enums/enums';
import LoadingSpinner from '@/components/LoadingSpinner';
import { setStatus, selectOrderDto } from '@/store/orders/orderDtoSlice';
import { formatTitle } from '@/utils/helpers/formatTitle';

import styles from '../../admin-invoice.module.scss';

interface StatusSectionProps {
  isLoading: boolean;
  isDisabled: boolean;
  onConfirm: () => void;
}

export const StatusSection = ({
  isLoading,
  isDisabled,
  onConfirm,
}: StatusSectionProps) => {
  const dispatch = useDispatch();
  const orderDto = useSelector(selectOrderDto);
  const currentStatus = orderDto?.deliveryStatus;

  return (
    <div
      className={cn(styles.adminInvoice__wrapper, styles.adminInvoice__status)}
    >
      <h3 className={styles.adminInvoice__header}>Status</h3>

      <Flex gap={12} justify="space-between">
        <div className={styles.adminInvoice__statusButtons}>
          {Object.values(OrderStatus).map((status) => {
            return (
              <button
                key={status}
                type="button"
                disabled={isLoading}
                className={cn(
                  'button__status',
                  styles.admin__statusInput,
                  `button__status_${status.toLowerCase().replace(/\s+/g, '_')}`,
                )}
                onClick={() => dispatch(setStatus({ status }))}
              >
                {status.toUpperCase() === currentStatus?.toUpperCase() && (
                  <span>✓ </span>
                )}
                {status.split(' ').map(formatTitle).join(' ')}
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
              disabled={isDisabled}
              className="button button-secondary"
              onClick={onConfirm}
            >
              Confirm
            </button>
          )}
        </div>
      </Flex>
    </div>
  );
};
