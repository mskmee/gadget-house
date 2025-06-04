import cn from 'classnames';

import styles from '../../admin-invoice.module.scss';
import { IOrderItemAddress } from '@/utils/packages/orders/libs/types/order-item-response-dto';
import { formatKeyToLabel } from '@/utils/helpers/formatKeyToLabel';

interface DeliveryDetailsProps {
  fullName?: string;
  address?: IOrderItemAddress;
  // eslint-disable-next-line no-unused-vars
  onFieldChange: (field: string, value: string) => void;
}

export const DeliveryDetails = ({
  fullName,
  address,
  onFieldChange,
}: DeliveryDetailsProps) => {
  return (
    <div
      className={cn(
        styles.adminInvoice__delivery,
        styles.adminInvoice__wrapper,
      )}
    >
      <h3>Delivery details</h3>

      <form>
        <label className={styles.adminInvoice__deliveryInput}>
          <span>Full name</span>
          <input
            type="text"
            value={fullName || ''}
            name="fullName"
            onChange={(e) => onFieldChange('fullName', e.target.value)}
          />
        </label>

        {address &&
          Object.entries(address).map(
            ([key, value]) =>
              value && (
                <label key={key} className={styles.adminInvoice__deliveryInput}>
                  <span>{formatKeyToLabel(key)}</span>
                  <input
                    type="text"
                    value={value}
                    name={key}
                    onChange={(e) => onFieldChange(key, e.target.value)}
                  />
                </label>
              ),
          )}
      </form>
    </div>
  );
};
