import cn from 'classnames';

import styles from '../../admin-invoice.module.scss';
import { IOrderItemAddress } from '@/utils/packages/orders/libs/types/order-item-response-dto';
import { formatKeyToLabel } from '@/utils/helpers/formatKeyToLabel';

interface DeliveryDetailsProps {
  fullName?: string;
  address?: IOrderItemAddress;
  comment?: string;
  delivery?: string;
  // eslint-disable-next-line no-unused-vars
  onFieldChange: (field: string, value: string) => void;
}

export const DeliveryDetails = ({
  fullName,
  address,
  comment,
  delivery,
  onFieldChange,
}: DeliveryDetailsProps) => {
  return (
    <section
      className={cn(
        styles.adminInvoice__delivery,
        styles.adminInvoice__wrapper,
        styles.adminInvoice__container,
      )}
    >
      <div className={styles.adminInvoice__deliveryHeader}>
        <h3 className={styles.adminInvoice__deliveryTitle}>
          Delivery details{' '}
          <span
            className={styles.adminInvoice__deliveryMethod}
          >{`(by ${delivery?.toLowerCase()})`}</span>
        </h3>
      </div>

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

      <div className={styles.adminInvoice__comment}>
        <h4 className={styles.adminInvoice__commentTitle}>Comment</h4>
        <p className={styles.adminInvoice__commentText}>{comment}</p>
      </div>
    </section>
  );
};
